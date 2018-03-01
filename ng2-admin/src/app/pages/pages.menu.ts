
export class PagesMenu {

    constructor() {

    }

    /**
     * @param discovery {Object} Microservices Discovery data
     * @return Array<any>
     */
    getMenu(discovery: any): Array<any> {
        return [
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
                    //       expanded: false,
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
                                url: '#/pages/dashboard',
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
                                expanded: false,
                                order: 0
                            }
                        },
                        children: [
                            {
                                path: ['services/list'],
                                data: {
                                    menu: {
                                        url: '#/pages/services/list',
                                        title: 'general.menu.directory'
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.lifeEvents',
                                    }
                                }
                            },
                            {
                                path: '',
                                data: {
                                    menu: {
                                        url: '#',
                                        title: 'general.menu.secureDocuments',
                                    }
                                }
                            },
                        ]
                    },

                    {
                        path: 'cases',
                        data: {
                            menu: {
                                url: '#/pages/cases/list',
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
                                url: '#/pages/tasks/list',
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
                                url: '#',
                                title: 'Notifications',
                                icon: 'ion-android-notifications-none',
                            }
                        },
                    },

                    {
                        path: '',
                        data: {
                            menu: {
                                url: '#',
                                title: 'general.menu.messages',
                                icon: 'ion-email',
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
                                url: '#/pages/profile',
                                title: 'general.menu.settings',
                                icon: 'ion-settings',
                                pathMatch: 'prefix', // use it if item children not displayed in menu
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        },
                    },

                    {
                        path: ['logout'],
                        data: {
                            menu: {
                                url: '#/pages/logout',
                                title: 'login.signOut',
                                icon: 'ion-log-out',
                            }
                        }
                    },

                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'Reminders',
                    //       icon: 'ion-android-alarm-clock',
                    //     }
                    //   },
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'My Identities',
                    //       icon: 'ion-ios-people',
                    //     }
                    //   },
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'Calendar',
                    //       icon: 'ion-ios-calendar-outline',
                    //     }
                    //   },
                    // },

                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'Records',
                    //       icon: 'ion-ios-briefcase-outline',
                    //     }
                    //   },
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'Assets',
                    //       icon: 'ion-card',
                    //     }
                    //   },
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'Interactions',
                    //       icon: 'ion-android-textsms',
                    //     }
                    //   },
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'News',
                    //       icon: 'ion-ios-paper-outline',
                    //     }
                    //   },
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'Events',
                    //       icon: 'ion-android-calendar',
                    //     }
                    //   },
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'APIs',
                    //       icon: 'ion-ios-cloud-outline',
                    //     }
                    //   },
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'Open Data',
                    //       icon: 'ion-ios-analytics-outline',
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
                    //       expanded: false,
                    //       order: 0
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: '',
                    //       data: {
                    //         menu: {
                    //           url: '#',
                    //           title: 'Account',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: '',
                    //       data: {
                    //         menu: {
                    //           url: '#',
                    //           title: 'Privacy Settings',
                    //         }
                    //       }
                    //     },
                    //   ]
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'Support',
                    //       icon: 'ion-help-buoy',
                    //     }
                    //   },
                    // },
                    // {
                    //   path: '',
                    //   data: {
                    //     menu: {
                    //       url: '#',
                    //       title: 'Contact',
                    //       icon: 'ion-ios-chatboxes-outline',
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
                    //       expanded: false,
                    //       order: 0
                    //     }
                    //   },
                    //   children: [
                    //     {
                    //       path: '',
                    //       data: {
                    //         menu: {
                    //           url: '#',
                    //           title: 'Systems',
                    //         }
                    //       }
                    //     },
                    //     {
                    //       path: '',
                    //       data: {
                    //         menu: {
                    //           url: '#',
                    //           title: 'Demo',
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
    }
}
