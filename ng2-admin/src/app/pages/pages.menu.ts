import {  } from '../auth/auth-guard.service';
import {AuthGuardService} from '../shared/modules/auth/auth-guard.service';

export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'general.menu.myAccount',
      //       icon: 'ion-person',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: true,
      //       order: 0,
      //       class: 'my-account hidden-xs-up'
      //     }
      //   },
      //   children: [
      //     {
      //       path: ['profile'],
      //       data: {
      //         menu: {
      //           title: 'general.menu.profile',
      //           class: 'profile'
      //         }
      //       }
      //     },
      //     {
      //       path: ['logout'],
      //       data: {
      //         menu: {
      //           title: 'login.signOut',
      //         }
      //       }
      //     },
      //   ]
      // },
      {
        path: '',
        data: {
          menu: {
            title: 'general.menu.dashboard',
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
                title: 'general.menu.lifeEvents',
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.secureDocuments',
                url: '#'
              }
            }
          },
        ]
      },

      {
        path: 'cases',
        data: {
          menu: {
            title: 'general.menu.cases',
            icon: 'ion-ios-list-outline',
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0,
          }
        },
      },

      {
        path: 'tasks',
        data: {
          menu: {
            title: 'general.menu.tasks',
            icon: 'ion-clipboard',
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0,
          }
        },
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
            title: 'general.menu.messages',
            icon: 'ion-email',
            url: '#'
          }
        },
      },

      {
        path: ['profile'],
        data: {
          menu: {
            title: 'general.menu.profile',
            icon: 'ion-person',
          }
        },
      },

      {
        path: ['profile'],
        data: {
          menu: {
            title: 'general.menu.settings',
            icon: 'ion-settings',
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: true,
            order: 0
          }
        },
      },

      {
        path: ['logout'],
        data: {
          menu: {
            title: 'login.signOut',
            icon: 'ion-log-out',
          }
        }
      },

      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Reminders',
      //       icon: 'ion-android-alarm-clock',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'My Identities',
      //       icon: 'ion-ios-people',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Calendar',
      //       icon: 'ion-ios-calendar-outline',
      //       url: '#'
      //     }
      //   },
      // },

      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Records',
      //       icon: 'ion-ios-briefcase-outline',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Assets',
      //       icon: 'ion-card',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Interactions',
      //       icon: 'ion-android-textsms',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'News',
      //       icon: 'ion-ios-paper-outline',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Events',
      //       icon: 'ion-android-calendar',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'APIs',
      //       icon: 'ion-ios-cloud-outline',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Open Data',
      //       icon: 'ion-ios-analytics-outline',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Settings',
      //       icon: 'ion-settings',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: true,
      //       order: 0
      //     }
      //   },
      //   children: [
      //     {
      //       path: '',
      //       data: {
      //         menu: {
      //           title: 'Account',
      //           url: '#'
      //         }
      //       }
      //     },
      //     {
      //       path: '',
      //       data: {
      //         menu: {
      //           title: 'Privacy Settings',
      //           url: '#'
      //         }
      //       }
      //     },
      //   ]
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Support',
      //       icon: 'ion-help-buoy',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Contact',
      //       icon: 'ion-ios-chatboxes-outline',
      //       url: '#'
      //     }
      //   },
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Admin',
      //       icon: 'ion-hammer',
      //       pathMatch: 'prefix', // use it if item children not displayed in menu
      //       selected: false,
      //       expanded: true,
      //       order: 0
      //     }
      //   },
      //   children: [
      //     {
      //       path: '',
      //       data: {
      //         menu: {
      //           title: 'Systems',
      //           url: '#'
      //         }
      //       }
      //     },
      //     {
      //       path: '',
      //       data: {
      //         menu: {
      //           title: 'Demo',
      //           url: '#'
      //         }
      //       }
      //     },
      //   ]
      // },



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
    ]
  }
];
