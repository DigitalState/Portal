/**
 * Formio IFrame entry script.
 */

(function($, _) {
  var commChannel = 'ds.formio';
  var targetWindow = window.parent;
  var formioForm = null;

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
   * - form: object
   *   - schema: object
   * - translations: object
   * - language: string   // current UI language
   *
   * @param data
   */
  var handleMessageFormData = function(messageData) {
    console.log('IFrame: received form schema', messageData);

    Formio.createForm(document.getElementById('formio'), { // Form object
      components: messageData.form.schema
    }, { // Form options
      i18n: messageData.translations
    }).then(function(form) { // on form ready
      formioForm = form;

      setTimeout(function() {
        formioForm.language = messageData.language;
      });

      form.on('submit', function(submission) {
        console.log('IFrame: submitting form', submission);
        sendMessage('formSubmit', submission);

        // Prevent Submit button from hanging in a loading and/or disabled state
        // in case the form submission fails in the backend
        form.emit('submitDone');
      });

      form.on('error', (errors) => {
        console.log('IFrame: we have errors!', errors);
        sendMessage('formError', errors);

        // Scroll to top of the iFrame where the error messages are shown
        window.scrollTo(0, 0);

        // Prevent Submit button from hanging in a disabled state
        form.emit('submitDone');
      })
    }).catch(function(e) {
      console.log('IFrame: caught formio error in promise', e);
    });
  };

  var handleMessageSwitchLanguage = function(messageData) {
    formioForm.language = messageData;
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

  /**
   * Load form using parameters passed in the URL
   */
  $(document).ready(() => {
    window.addEventListener('message', windowMessageHandler, false);

    $('button#send').on('click', () => {
      sendMessage('formSubmit', {
        'formData': 'blabla'
      });
    });

    sendMessage('ready');
  });
})(jQuery, _);