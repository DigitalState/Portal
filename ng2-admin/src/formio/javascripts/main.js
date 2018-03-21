/**
 * Formio IFrame entry script.
 */

(function($, _) {
  var commChannel = 'ds.formio';
  var targetWindow = window.parent;
  var formioForms = [];
  var $formsContainer = null;

  var sendMessage = function(type, payload) {
    targetWindow.postMessage({
      channel: commChannel,
      tag: $.QueryString.windowId,
      type: type,
      payload: payload
    }, '*');
  };

  // // // Message Handlers // // // // // // // // // // // // // // // // // //

  /**
   * Build the Formio form using the following properties provided in `data`:
   * - forms: Array[{
   *     - display: string            // Form type (`wizard` vs `form`)
   *     - primary: boolean           // True if editable form, False if read-only
   *     - schema: object             // Form components
   *     - type: String               // Internal form classification ("formio", etc..)
   *   }]
   * - translations: object           // i18n translation object
   * - language: string               // current UI language
   *
   * @param data
   */
  var handleMessageFormData = function(messageData) {
    // @Todo Mock data being used here
    // messageData = FORMIO_MOCK.simple.messageData;   // ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅ ⬅

    console.log('IFrame: received messageData', messageData);

    // Cleanup form schema before passing it to the Formio renderer
    cleanupSchemas(messageData);

    // Change the rendering order of the forms by sorting their schema entries
    sortSchemas(messageData);

    // Create the HTML layout of the form(s)
    buildFormsLayout(messageData);

    // Create Formio instances for each form schema
    createForms(messageData);
  };

  /**
   * Language switching message handler
   * @param lang
   */
  var handleMessageSwitchLanguage = function(lang) {
    formioForms.forEach(function(form) {
      form.language = lang;
    });
  };

  /**
   * Window messaging triage.
   * First, filter-out messages that are addressed to this window using proper channel and tag.
   */
  var windowMessageHandler = function(messageEvent) {
    console.log('IFrame: received window message', messageEvent.data);

    if (messageEvent && messageEvent.data &&
        messageEvent.data.channel === commChannel &&
        messageEvent.data.tag === $.QueryString.windowId) {

      switch (messageEvent.data.type) {
        case 'ready':
          handleMessageReady(messageEvent.data.payload);
          break;

        case 'formData':
          handleMessageFormData(messageEvent.data.payload);
          break;

        case 'switchLanguage':
          handleMessageSwitchLanguage(messageEvent.data.payload);
          break;

        default:
          console.log('IFrame: unknown message received', messageEvent.data);
      }
    }

    // Uncomment below to cleanup event listener (if needed)
    // window.removeEventListener('message', windowMessageHandler);
  };

  // // // Form processing // // // // // // // // // // // // // // // // // //

  /**
   * Cleanup form schema before passing it to the Formio renderer
   * @param messageData
   */
  var sortSchemas = function(messageData) {
    // Use default `asc` sorting on the `primary` boolean property so the primary form appears at the bottom
    messageData.forms = _.orderBy(messageData.forms, ['primary']);
  };

  /**
   * Cleanup form schema before passing it to the Formio renderer
   * @param messageData
   */
  var cleanupSchemas = function(messageData) {
    // Cycle through array of forms, that is `messageData.form`
    _.forEach(messageData.forms, function(form) {
      FormioUtils.eachComponent(form.schema, function(component) {

        // Remove submit button from read-only forms
        if (form.primary === false && component.type === 'button' && component.action === 'submit') {
          // @Todo There is no utility in Formio to remove a component within the recursive `FormioUtils.eachComponent` loop. So I am resorting to neutralizing the submit button.
          component.hidden = true;
          component.type = 'htmlelement';
          component.tag = 'span';
        }

        // Set `input` property in Buttons to `false` so it does not show up in the form Submission
        if (component.type === 'button') {
          component.input = false;
        }
      });
    });
  };

  /**
   * Render Formio forms
   * @param messageData
   */
  function createForms(messageData) {
    // Cycle through array of forms, that is `messageData.form`
    _.forEach(messageData.forms, function(form, formIndex) {
      // Query the layout for the wrapper of the current form
      var formWrapperElement = getFormWrapperElement(formIndex);

      Formio.createForm(formWrapperElement, { // Form object
        display: form.display,
        components: form.schema,
      }, { // Form options
        readOnly: form.primary === false,
        i18n: messageData.translations,
        breadcrumbSettings: {
          clickable: false
        },
      }).then(function(formioForm) { // on form ready
        formioForms.push(formioForm);

        // Fill form with submission data (if any)
        if (form.data) {
          // Note: `form.data` object must have the a property called `data` according to Formio's docs
          // @see https://github.com/formio/formio.js/wiki/Form-Renderer#setting-the-submission
          formioForm.submission = {'data': form.data};
        }

        setTimeout(function () {
          formioForm.language = messageData.language;
        });

        formioForm.on('render', function () {
          console.log('Form rendered: ' + form.id);
          setupPostRenderLayout();

          if (formioForm.wizard) {
            updatePagerStyles(formioForm);
          }
        });

        // Event handlers that apply only to `primary` form
        if (form.primary) {
          formioForm.on('submit', function (submission) {
            console.log('IFrame: submitting form', submission);
            sendMessage('formSubmit', submission);

            // Prevent Submit button from hanging in a loading and/or disabled state
            // in case the form submission fails in the backend
            formioForm.emit('submitDone');
          });

          formioForm.on('error', (errors) => {
            console.log('IFrame: we have errors!', errors);
            sendMessage('formError', errors);

            // Scroll to top of the iFrame where the error messages are shown
            window.scrollTo(0, 0);

            // Prevent Submit button from hanging in a disabled state
            formioForm.emit('submitDone');
          });
        }

      }).catch(function(e) {
        console.log('IFrame: caught formio error in promise', e);
      });
    });
  }

  /**
   * Returns the HTML element that wraps a form given its index.
   * @param formIndex {int} Zero-based index of the required form element
   * @return HTMLElement
   */
  var getFormWrapperElement = function(formIndex) {
    var formWrapperId = 'form-' + formIndex;
    return $formsContainer.find('#' + formWrapperId).get(0);
  };

  /**
   * Build the entire layout of all provided forms
   * @param messageData {object} Message payload which contains and array of form schemas in the `forms` property
   */
  var buildFormsLayout = function(messageData) {
    var primaryFormsHtml = '';
    var secondaryFormsHtml = '';
    var $html = $('<div class="row"></div>');

    _.forEach(messageData.forms, function (form, formIndex) {
      var formHtml = buildFormHtml(form, formIndex);

      if (form.primary === true) {
        primaryFormsHtml += formHtml;
      }
      else if (form.primary === false) {
        secondaryFormsHtml += formHtml;
      }
      else {
        console.error('Unable to determine form classification (whether primary or not): ', form.primary);
      }
    });

    if (primaryFormsHtml.length > 0) {
      var $primaryFormsHtml = $('<div>' + primaryFormsHtml + '</div>')
        .addClass('primary-forms-col')
        .addClass((secondaryFormsHtml.length > 0) ? 'col-md-7' : 'col-md-12');
      $html.append($primaryFormsHtml);
    }

    if (secondaryFormsHtml.length > 0) {
      var $secondaryFormsHtml = $('<div>' + secondaryFormsHtml + '</div>')
        .addClass('secondary-forms-col')
        .addClass((primaryFormsHtml.length > 0) ? 'col-md-5' : 'col-md-12');
      $html.append($secondaryFormsHtml);
    }

    $formsContainer.append($html);
  };

  /**
   * Build the HTML markup of a Formio form wrapper. The actual form will later be injected within `.formio-wrapper` div
   * in the markup.
   *
   * @param form The form schema.
   * @param formIndex Form index in the form schemas array.
   * @return {string} HTML markup of the element
   */
  var buildFormHtml = function(form, formIndex) {
    var formWrapperId = 'form-' + formIndex;
    var html = '';

    if (form.primary === true) {
      html += '<div id="' + form.id + '" class="form-primary">';
      html += '  <div id="' + formWrapperId + '" class="form-wrapper"></div>';
      html += '</div>';
    }
    else {
      html += '<div id="' + form.id + '" class="form-secondary">';
      html += '  <a class="collapse-trigger" role="button" data-toggle="collapse" href="#' + formWrapperId + '-collpase" aria-expanded="true" aria-controls="' + formWrapperId + '-collpase">';
      html += '    <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>';
      html += '        <span class="header">Form</span>';
      html += '  </a>';
      html += '  <div id="' + formWrapperId + '-collpase" aria-expanded="true" class="collapse in">';
      html += '    <div id="' + formWrapperId + '" class="form-wrapper"></div>';
      html += '    <div class="form-data-wrapper">';
      html += '      <a class="collapse-trigger" role="button" data-toggle="collapse" href="#' + formWrapperId + '-data-collpase" aria-expanded="false" aria-controls="' + formWrapperId + '-data-collpase">';
      html += '        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
      html += '        <span class="header">Raw Form Data</span>';
      html += '      </a>';
      html += '      <div id="' + formWrapperId + '-data-collpase" aria-expanded="false" class="collapse">';
      html += '        <pre class="form-data">' + JSON.stringify(form.data, null, 2) + '</pre>';
      html += '      </div>';
      html += '    </div>';
      html += '  </div>';
      html += '</div>';
    }

    return html;
  };

  /**
   * This function called when the Formio form is rendered. It can be used to dynamically perform layout updates.
   */
  var setupPostRenderLayout = function() {
    $('#formio-forms-container .collapse').on('shown.bs.collapse', function (event) {
      event.stopPropagation();
      $(this).prev().find(".glyphicon").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });

    //The reverse of the above on hidden event:

    $('#formio-forms-container .collapse').on('hidden.bs.collapse', function (event) {
      event.stopPropagation();
      $(this).prev().find(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });
  };

  // // // Wizard Pager // // // // // // // // // // // // // // // // // //

  /**
   * For Wizard forms, this is where
   * @param form {Object} The Formio form instance.
   */
  var updatePagerStyles = function(formioForm) {
    var $form = $(formioForm.element);
    var hasNextPage = formioForm.pages.length > (formioForm.page + 1);
    var hasPreviousPage = formioForm.page > 0;

    $form.removeClass('has-next-page');
    $form.removeClass('has-previous-page');

    if (hasNextPage) {
      $form.addClass('has-next-page');
    }

    if (hasPreviousPage) {
      $form.addClass('has-previous-page');
    }
  };

  // // // Init // // // // // // // // // // // // // // // // // //

  /**
   * Load form using parameters passed in the URL
   */
  $(document).ready(() => {
    window.addEventListener('message', windowMessageHandler, false);

    $('button#send').on('click', () => {
      sendMessage('formSubmit', {
        'formData': ''
      });
    });

    $formsContainer = $('#formio-forms-container');
    sendMessage('ready');
  });

})(jQuery, _);