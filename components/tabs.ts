// requires jQuery 1.11
// requires Lodash for dynamic tab template

// Adapted from https://github.com/mpiotrowicz/a11y-sandbox/blob/master/source/javascripts/prototypes/responsive-tabs.js

import template from 'lodash/template';
import forEach from 'lodash/forEach';

/**
 * Tabs HTML component
 *
 * Usage:
 * let tabs = new Tabs($('#tabs-container'));
 */
export default class Tabs {

    protected templates = {
        tplTabNav: template(
            `<ul class="inline-list tabs-navigation" role="tablist">` +
            `<% forEach(tabs, function(tab) { %>` +
            `  <li role="presentation" class="tab-menu-item">` +
            `    <a href="#<%=tab.tabId%>" id="TabController-<%=tab.tabId%>" class="txt-btn tabs-navigation__button" role="tab" aria-selected="false" aria-controls="<%=tab.tabId%>" tabindex=-1 aria-expanded="false">` +
            `      <%=tab.tabTitle%>` +
            `    </a>` +
            `  </li>` +
            `<% }); %>` +
            `</ul>`, {
                'imports': {
                    'forEach': forEach
                }
            }
        )
    };

    protected currentTab;
    protected tabNav;
    protected tabData;

    protected $tabNav;
    protected $tabNavItems;
    protected $tab_panels;
    protected $accordion;

    /**
     * Sets up the Tabs
     *
     * @param $container - parent of the items that will be tabbed together
     * @param $options - any overrides to the classes set below
     */
    constructor(protected $container, protected options?, protected callbacks?: { [name: string]: Function }) {

        let defaults = {
            default_tab: 0,                          // index of tab to open on page load
            tab_class_panel: ".tabs-container__panel", // wrapper for each tab/accordion title and content
            tab_class_title: ".tabs-container__title", // title element for each tab/accordion
            tab_nav_id: "TabNav"                      // ID to provide the constructed tab navigation
        };

        this.$container = $container.addClass("tabs-init");
        this.options = $.extend({}, defaults, options);
        this.currentTab = null;
        this.init();

    }

    /**
     * Creates a data object for all tabs within the widget
     * Saves each tab ID and title, to be used to create desktop tab nav if needed
     * Attaches Aria roles as it fetches tab data
     */
    protected fetchTabData() {
        // stores data for all tabs in the widget
        this.tabData = [];

        let i = 0;
        let $tab_panels = this.$tab_panels;
        let len = $tab_panels.length;
        let $currentPanel;
        let $panelTitle;
        let currentPanelData;

        // for each of the tabs, save its title and ID from the HTML
        for (i; i < len; i++) {
            $currentPanel = $($tab_panels[i]);
            $panelTitle = $currentPanel.prev(this.options.tab_class_title);
            currentPanelData = {
                tabId: $tab_panels[i].id,
                tabTitle: $panelTitle.text()
            };

            this.tabData.push(currentPanelData);

            // update ARIA attrs for the panel and accordion title
            $currentPanel.attr({
                "role": "tabpanel",
                "aria-hidden": "true"
            });

            $panelTitle
                .attr({
                    "tabindex": "-1",
                    "role": "tab",
                    "aria-controls": currentPanelData.tabId,
                    "aria-selected": "false",
                    "aria-expanded": "false"
                });
        }
    };

    /**
     * Builds HTML for the desktop tab navigation
     */
    protected createTabNav() {
        this.tabNav = true;

        // Avoid duplication of tabs due to the `prependTo` call below
        this.$container.find('.inline-list').remove();

        this.$tabNav = $(this.templates.tplTabNav({
            "tabs": this.tabData
        })).prependTo(this.$container);

        this.$tabNavItems = this.$tabNav.find("a");

        // add class to indicate that there's a navigation
        this.$container.addClass("tabs-nav-init");
    };

    /**
     * Binds the navigation events
     */
    protected bindNavEvents() {
        let app = this;

        this.$tabNav.on("click", "a", function (e) {
            e.preventDefault();

            let $target = $(e.currentTarget);
            let $tabPanel = $(this.getAttribute('href'));

            if (!app.isCurrentTab($tabPanel)) {
                app.closeTab();
                app.openTab($tabPanel);
            }
        });

        this.$tabNav.on("keydown", "a", function (e) {
            let currentIndex = app.handleKeyPress(e);
            if (currentIndex !== null) {
                app.closeTab();
                let panelId = app.tabData[currentIndex].tabId;
                app.openTab($(document.getElementById(panelId)));
                app.currentTab.$navItem.focus(); // focus only here so doesn't steal focus on page load
            }
        });
    };

    protected unbindNavEvents() {
        if (this.$tabNav) {
            this.$tabNav.off("keydown");
            this.$tabNav.off("click");
        }
    }

    /**
     * helper to identify if the clicked tab is what's currently open
     * @param $tab_panel - jQuery collection of the tab to be evaluated
     */
    protected isCurrentTab($tab_panel) {
        return this.currentTab.$tab_panel.get(0) == $tab_panel.get(0);
    };

    /**
     * Key handler for tabs
     * @param e - event
     */
    protected handleKeyPress(e) {
        let keyCodes,
            currentIndex = this.currentTab.position;
        keyCodes = {
            DOWN: 40,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        };

        switch (e.keyCode) {
            case keyCodes.LEFT:
            case keyCodes.UP:
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = this.tabData.length - 1;
                }
                //console.log(currentIndex);
                break;
            case keyCodes.END:
                currentIndex = this.tabData.length - 1;
                break;
            case keyCodes.HOME:
                currentIndex = 0;
                break;
            case keyCodes.SPACE:
            case keyCodes.ENTER:
                currentIndex = this.handleEnter(currentIndex);
                break;
            case keyCodes.RIGHT:
            case keyCodes.DOWN:
                currentIndex++;
                if (currentIndex >= this.tabData.length) {
                    currentIndex = 0;
                }
                break;
            default:
                currentIndex = null;
        }
        return currentIndex;
    };

    protected handleEnter(currentIndex) {
        // enter will either select a new panel or do nothing if it's focused on an active panel
        // so we have to deal with the currently focused element rather than the selected tab
        let currentTabByFocusIndex = document.getElementById(document.activeElement.getAttribute("aria-controls"));

        if (currentTabByFocusIndex !== this.currentTab.$tab_panel.get(0)) {
            currentIndex = this.$tab_panels.index(currentTabByFocusIndex);
        }
        return currentIndex;
    };

    /**
     * Opens the tab
     * @param $tab_panel - jQuery collection of the tab that's being opened
     */
    protected openTab($tab_panel) {
        let options = this.options;
        this.currentTab = {
            $tab_panel: $tab_panel.attr({
                "aria-hidden": "false",
                "tabindex"   : "0"
            }),
            $title: $tab_panel.prev(options.tab_class_title).attr({
                "aria-selected": true,
                "aria-expanded": true,
                "tabindex": "0"
            }),
            position: this.$tab_panels.index($tab_panel)
        };

        if (this.tabNav) {
            this.updateTabNav();
        }

        if (this.callbacks['onTabChange']) {
            this.callbacks['onTabChange'].call(null, this.currentTab.position);
        }
    };

    /**
     * Open a tab given its zero-based index.
     * @param tabIndex
     */
    public openTabByIndex(tabIndex: number) {
        let $tabPanel = this.$tab_panels.eq(tabIndex);

        if (!this.isCurrentTab($tabPanel)) {
            this.closeTab();
            this.openTab($tabPanel);
        }
    }

    /**
     * closes a tab if there's one open and a new one has been activated
     * Only one tab/accordion can be open at any given time
     */
    protected closeTab() {
        let currentTab = this.currentTab;

        currentTab.$tab_panel
            .attr({
                "aria-hidden": "true"
            })
            .removeAttr("tabindex");

        // update accordion title values as well so everything is in synch
        currentTab.$title.attr({
            "tabindex": "-1",
            "aria-selected": "false",
            "aria-expanded" : "false"
        });

        if (this.tabNav) {
            currentTab.$navItem.attr({
                "tabindex": "-1",
                "aria-selected": "false",
                "aria-expanded" : "false"
            });
        }

        this.currentTab = null;
    };

    /**
     * Updates the dynamically created tab nav in desktop once a new tab has been opened
     * @param $tab - jQuery element for the tab that was just opened
     */
    protected updateTabNav() {
        let currentTab = this.currentTab;

        currentTab.$navItem = this.$tabNavItems.eq(currentTab.position);
        currentTab.$navItem.attr({
            "tabindex": "0",
            "aria-selected": "true",
            "aria-expanded": "true"
        });
    };

    /**
     * Binds any events specific to Accordion functionality (tablet and mobile only)
     * ARIA initially didn't work here because:
     * there's no tablist role on any container
     * the tab panels are controlled by the nav and not the headers
     */
    protected bindAccordionEvents() {
        let app = this;

        this.$accordion
            .on("keydown", this.options.tab_class_title, function (e) {
                let currentIndex = app.handleKeyPress(e);

                if (currentIndex !== null) {
                    app.handleAccordion(app.$tab_panels.eq(currentIndex));
                }
            })
            //https://bugs.webkit.org/show_bug.cgi?id=133613
            .find(".tabs-container__title")
            .on("click", function (e) {
                e.preventDefault();
                app.handleAccordion($(e.currentTarget).next(app.options.tab_class_panel));
            });
    };

    protected unbindAccordionEvents() {
        if (this.$accordion) {
            this.$accordion.off("keydown").find(".tabs-container__title").off("click");
        }
    }

    protected handleAccordion($tab_panel) {
        if (!this.isCurrentTab($tab_panel)) {
            this.openAccordion($tab_panel);
        }
    };

    /**
     * Helper to open an accordion.
     * Just calls openTab() and adds animation to scroll viewer to active accordion panel
     * @param $tab_panel - jQuery element of the tabpnael being opened
     */
    protected openAccordion($tab_panel) {
        this.closeTab();
        this.openTab($tab_panel);
        // this.currentTab.$title.focus();

        $("html, body").animate({
            scrollTop: $tab_panel.offset().top - 25
        }, 200);
    };


    /**
     * Init function - calls necessary set up and opens the first relevent tab
     */
    protected init() {
        let $startingTab;
        // save all the elements that will become tabs
        this.$tab_panels = this.$container.find(this.options.tab_class_panel);

        this.fetchTabData();

        this.$accordion = this.$container.find(".accordion-wrapper").attr("role","tablist");
        this.bindAccordionEvents();

        // if there's more than 0 tab, then a tab navigation is created on desktop
        if (this.$tab_panels.length > 0) {
            this.createTabNav();
            this.bindNavEvents();
        }

        $startingTab = this.$tab_panels.eq(this.options.default_tab);
        if (this.$tab_panels.filter(".tabs-container__default").length) {
            $startingTab = this.$tab_panels.filter(".tabs-container__default");
        }
        this.openTab($startingTab);
    };

    destroy() {
        this.unbindNavEvents();
        this.unbindAccordionEvents();

        // Destroy callbacks (if any)
        if (this.callbacks) {
            forEach(this.callbacks, (callback, callbackName) => {
                this.callbacks[callbackName] = undefined;
            });
        }
    }
}
// $(function () {
//     window['Tabs'] = Tabs;
//     // new window.Tabs($("#TabContainer"));
// });
