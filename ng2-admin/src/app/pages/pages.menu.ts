import {  } from '../auth/auth-guard.service';
import {AuthGuardService} from '../shared/modules/auth/auth-guard.service';

export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: '',
        data: {
          menu: {
            title: 'My Account',
            icon: 'ion-person',
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: true,
            order: 0,
            class: 'my-account hidden-xs-up'
          }
        },
        children: [
          {
            path: ['profile'],
            data: {
              menu: {
                title: 'Profile',
                class: 'profile'
              }
            }
          },
          {
            path: ['logout'],
            data: {
              menu: {
                title: 'Sign out',
              }
            }
          },
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-ios-speedometer',
            path: ['dashboard'],
          }
        },
      },

      {
        path: 'services',
        data: {
          menu: {
            title: 'general.menu.services',
            icon: 'ion-ios-keypad',
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: true,
            order: 0
          }
        },
        children: [
          {
            path: ['services/list'],
            data: {
              menu: {
                title: 'general.menu.directory'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Life Events',
                url: '#'
              }
            }
          },
        ]
      },

      {
        path: '',
        data: {
          menu: {
            title: 'Notifications',
            icon: 'ion-android-notifications-none',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Reminders',
            icon: 'ion-android-alarm-clock',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'My Identities',
            icon: 'ion-ios-people',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Calendar',
            icon: 'ion-ios-calendar-outline',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Tasks',
            icon: 'ion-ios-list-outline',
            url: '#'
          }
        },
      },
      {
        path: ['cases'],
        data: {
          menu: {
            title: 'Cases',
            icon: 'ion-ios-list-outline',
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Records',
            icon: 'ion-ios-briefcase-outline',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Assets',
            icon: 'ion-card',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Interactions',
            icon: 'ion-android-textsms',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'News',
            icon: 'ion-ios-paper-outline',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Events',
            icon: 'ion-android-calendar',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'APIs',
            icon: 'ion-ios-cloud-outline',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Open Data',
            icon: 'ion-ios-analytics-outline',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Settings',
            icon: 'ion-settings',
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: true,
            order: 0
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'Account',
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Privacy Settings',
                url: '#'
              }
            }
          },
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Support',
            icon: 'ion-help-buoy',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Contact',
            icon: 'ion-ios-chatboxes-outline',
            url: '#'
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Admin',
            icon: 'ion-hammer',
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: true,
            order: 0
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'Systems',
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Demo',
                url: '#'
              }
            }
          },
        ]
      },

      // {
      //   path: 'cases',
      //   data: {
      //     menu: {
      //       title: 'general.menu.cases',
      //       icon: 'ion-folder',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },
      // {
      //   path: 'assets',
      //   data: {
      //     menu: {
      //       title: 'general.menu.assets',
      //       icon: 'ion-images',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },
      // {
      //   path: 'topics',
      //   data: {
      //     menu: {
      //       title: 'general.menu.topics',
      //       icon: 'ion-pound',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },
      // {
      //   path: 'tasks',
      //   data: {
      //     menu: {
      //       title: 'general.menu.tasks',
      //       icon: 'ion-clipboard',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },
      // {
      //   path: 'records',
      //   data: {
      //     menu: {
      //       title: 'general.menu.records',
      //       icon: 'ion-filing',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },
      // {
      //   path: 'interactions',
      //   data: {
      //     menu: {
      //       title: 'general.menu.interactions',
      //       icon: 'ion-chatbox',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   },
      //   children: [
      //     {
      //       path: ['interactions', 'communications', 'list'],
      //       data: {
      //         menu: {
      //           title: 'general.menu.communications',
      //         }
      //       }
      //     },
      //     {
      //       path: ['interactions', 'interactions', 'list'],
      //       data: {
      //         menu: {
      //           title: 'general.menu.interactions',
      //         }
      //       }
      //     },
      //   ]
      // },
      // {
      //   path: 'individuals',
      //   data: {
      //     menu: {
      //       title: 'general.menu.individuals',
      //       icon: 'ion-person',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },
      // {
      //   path: 'identities',
      //   data: {
      //     menu: {
      //       title: 'general.menu.identities',
      //       icon: 'ion-card',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },


      // {
      //   path: 'dashboard',
      //   data: {
      //     menu: {
      //       title: 'general.menu.dashboard',
      //       icon: 'ion-android-home',
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },
      // {
      //   path: 'editors',
      //   data: {
      //     menu: {
      //       title: 'general.menu.editors',
      //       icon: 'ion-edit',
      //       selected: false,
      //       expanded: false,
      //       order: 100,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'ckeditor',
      //       data: {
      //         menu: {
      //           title: 'general.menu.ck_editor',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'components',
      //   data: {
      //     menu: {
      //       title: 'general.menu.components',
      //       icon: 'ion-gear-a',
      //       selected: false,
      //       expanded: false,
      //       order: 250,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'treeview',
      //       data: {
      //         menu: {
      //           title: 'general.menu.tree_view',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'charts',
      //   data: {
      //     menu: {
      //       title: 'general.menu.charts',
      //       icon: 'ion-stats-bars',
      //       selected: false,
      //       expanded: false,
      //       order: 200,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'chartist-js',
      //       data: {
      //         menu: {
      //           title: 'general.menu.chartist_js',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'ui',
      //   data: {
      //     menu: {
      //       title: 'general.menu.ui_features',
      //       icon: 'ion-android-laptop',
      //       selected: false,
      //       expanded: false,
      //       order: 300,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'typography',
      //       data: {
      //         menu: {
      //           title: 'general.menu.typography',
      //         }
      //       }
      //     },
      //     {
      //       path: 'buttons',
      //       data: {
      //         menu: {
      //           title: 'general.menu.buttons',
      //         }
      //       }
      //     },
      //     {
      //       path: 'icons',
      //       data: {
      //         menu: {
      //           title: 'general.menu.icons',
      //         }
      //       }
      //     },
      //     {
      //       path: 'modals',
      //       data: {
      //         menu: {
      //           title: 'general.menu.modals',
      //         }
      //       }
      //     },
      //     {
      //       path: 'grid',
      //       data: {
      //         menu: {
      //           title: 'general.menu.grid',
      //         }
      //       }
      //     },
      //   ]
      // },
      // {
      //   path: 'forms',
      //   data: {
      //     menu: {
      //       title: 'general.menu.form_elements',
      //       icon: 'ion-compose',
      //       selected: false,
      //       expanded: false,
      //       order: 400,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'inputs',
      //       data: {
      //         menu: {
      //           title: 'general.menu.form_inputs',
      //         }
      //       }
      //     },
      //     {
      //       path: 'layouts',
      //       data: {
      //         menu: {
      //           title: 'general.menu.form_layouts',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'tables',
      //   data: {
      //     menu: {
      //       title: 'general.menu.tables',
      //       icon: 'ion-grid',
      //       selected: false,
      //       expanded: false,
      //       order: 500,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'basictables',
      //       data: {
      //         menu: {
      //           title: 'general.menu.basic_tables',
      //         }
      //       }
      //     },
      //     {
      //       path: 'smarttables',
      //       data: {
      //         menu: {
      //           title: 'general.menu.smart_tables',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'maps',
      //   data: {
      //     menu: {
      //       title: 'general.menu.maps',
      //       icon: 'ion-ios-location-outline',
      //       selected: false,
      //       expanded: false,
      //       order: 600,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'googlemaps',
      //       data: {
      //         menu: {
      //           title: 'general.menu.google_maps',
      //         }
      //       }
      //     },
      //     {
      //       path: 'leafletmaps',
      //       data: {
      //         menu: {
      //           title: 'general.menu.leaflet_maps',
      //         }
      //       }
      //     },
      //     {
      //       path: 'bubblemaps',
      //       data: {
      //         menu: {
      //           title: 'general.menu.bubble_maps',
      //         }
      //       }
      //     },
      //     {
      //       path: 'linemaps',
      //       data: {
      //         menu: {
      //           title: 'general.menu.line_maps',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'general.menu.pages',
      //       icon: 'ion-document',
      //       selected: false,
      //       expanded: false,
      //       order: 650,
      //     }
      //   },
      //   children: [
      //     {
      //       path: ['/login'],
      //       data: {
      //         menu: {
      //           title: 'general.menu.login'
      //         }
      //       }
      //     },
      //     {
      //       path: ['/register'],
      //       data: {
      //         menu: {
      //           title: 'general.menu.register'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'general.menu.menu_level_1',
      //       icon: 'ion-ios-more',
      //       selected: false,
      //       expanded: false,
      //       order: 700,
      //     }
      //   },
      //   children: [
      //     {
      //       path: '',
      //       data: {
      //         menu: {
      //           title: 'general.menu.menu_level_1_1',
      //           url: '#'
      //         }
      //       }
      //     },
      //     {
      //       path: '',
      //       data: {
      //         menu: {
      //           title: 'general.menu.menu_level_1_2',
      //           url: '#'
      //         }
      //       },
      //       children: [
      //         {
      //           path: '',
      //           data: {
      //             menu: {
      //               title: 'general.menu.menu_level_1_2_1',
      //               url: '#'
      //             }
      //           }
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'general.menu.external_link',
      //       url: 'http://akveo.com',
      //       icon: 'ion-android-exit',
      //       order: 800,
      //       target: '_blank'
      //     }
      //   }
      // }
    ]
  }
];
