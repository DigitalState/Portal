import { DsEnvironmentConfig } from '../shared/providers/environment.provider';

export class MicroservicesDefinition {

    constructor(protected dsEnv: DsEnvironmentConfig) {

    }

    getAll() {
        const scheme = this.dsEnv.msUrlScheme;
        const dsDiscoveryEnv = this.dsEnv.dsDiscoveryEnv;
        const pathPrefix = 'app_dev.php';

        return {
            'authentication': {
                label: 'Authentication',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['authentication'] ? dsDiscoveryEnv['authentication'].host : '') + '/' + pathPrefix + '/', // Formerly `:8010`
                },
                paths: {
                    registration: 'registrations',
                    individual: 'tokens/individual',
                    anonymous: 'tokens/anonymous',
                    orgnaization: 'tokens/organization',
                },
            },
            'cms': {
                label: 'CMS',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['cms'] ? dsDiscoveryEnv['cms'].host : '') + '/' + pathPrefix + '/', // Formerly `:8056`
                },
                paths: {
                    content: 'content',
                    datas: 'datas',
                },
                translationSlugs: [ 'translation', 'portal-translation' ], // Order matters; latter overrides former
            },
            'services': {
                label: 'Services',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['services'] ? dsDiscoveryEnv['services'].host : '') + '/' + pathPrefix + '/', // Formerly `:8051`
                },
                entities: {
                    'services': {
                        properties: {
                            'title': {
                                label: 'Title',
                                type: 'string',
                                default: '',
                                translated: true,
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                    'minlength': {
                                        message: 'minlength',
                                        params: { chars: 4 }
                                    },
                                    // 'maxlength': { message: 'Title cannot be more than 24 characters long.'},
                                    // 'someCustomValidationDirective': { message: 'Someone named "Bob" cannot be a hero.'},
                                },
                            },
                            'presentation': {
                                label: 'Presentation',
                                type: 'string',
                                default: '',
                                translated: true,
                                validation: {
                                    'required': { message: 'required'},
                                },
                            },
                            'description': {
                                label: 'Description',
                                type: 'string',
                                default: '',
                                translated: true,
                                validation: {
                                    'required': { message: 'required'},
                                },
                            },
                            'enabled': {
                                label: 'Enabled',
                                type: 'boolean',
                                default: true,
                                validation: {
                                    'required': { message: 'required'},
                                },
                            },
                            'data': {
                                label: 'Data',
                                type: 'json',
                                default: {},
                                translated: true,
                                validation: {
                                    'json': { message: 'json' },
                                    'required': { message: 'required'},
                                },
                            },
                        },
                    },
                    'scenarios': {
                        properties: {
                            'title': {
                                label: 'Title',
                                type: 'string',
                                default: '',
                                translated: true,
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                    'minlength': {
                                        message: 'minlength',
                                        params: { chars: 4 }
                                    },
                                    // 'maxlength': { message: 'Title cannot be more than 24 characters long.'},
                                    // 'someCustomValidationDirective': { message: 'Someone named "Bob" cannot be a hero.'},
                                },
                            },
                            'presentation': {
                                label: 'Presentation',
                                type: 'string',
                                default: '',
                                translated: true,
                                validation: {
                                    'required': { message: 'required'},
                                },
                            },
                            'description': {
                                label: 'Description',
                                type: 'string',
                                default: '',
                                translated: true,
                                validation: {
                                    'required': { message: 'required'},
                                },
                            },
                            'type': {
                                label: 'Description',
                                type: 'string',
                                default: 'bpm',
                            },
                            'config': {
                                label: 'Config',
                                type: 'json',
                                default: {},
                                validation: {
                                    'json': { message: 'json' },
                                },
                            },
                            'data': {
                                label: 'Data',
                                type: 'json',
                                default: {},
                                translated: true,
                                validation: {
                                    'json': { message: 'json' },
                                },
                            },
                            'enabled': {
                                label: 'Enabled',
                                type: 'boolean',
                                default: true,
                                validation: {
                                    'required': { message: 'required'},
                                },
                            },
                            // 'form': {
                            //     label: 'Form',
                            //     type: 'string',
                            // default: '',
                            //     validation: {
                            //         'required': {message: 'required'},
                            //     }
                            // },
                        },
                    },
                    'submissions': {
                        properties: {
                            'uuid': {
                                label: 'Updated At',
                                type: 'date',
                            },
                            'updatedAt': {
                                label: 'Updated At',
                                type: 'date',
                            },
                        },
                    },
                },
            },
            'cases': {
                label: 'Cases',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['cases'] ? dsDiscoveryEnv['cases'].host : '') + '/' + pathPrefix + '/', // Formerly `:8050`
                },
                entities: {
                    'cases': {
                        properties: {
                            'uuid': {
                                label: 'UUID',
                                type: 'string',
                            },
                            'title': {
                                label: 'Title',
                                type: 'string',
                                default: '',
                                translated: true,
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                    'minlength': {
                                        message: 'minlength',
                                        params: { chars: 4 }
                                    },
                                },
                            },
                            'customId': {
                                label: 'Custom ID',
                                type: 'string',
                            },
                            'state': {
                                label: 'State',
                                type: 'string',
                                default: 'opened',
                                field: {
                                    type: 'select',
                                    options: {
                                        'opened': 'Opened',
                                        'closed': 'Closed',
                                    },
                                },
                            },
                            'identity': {
                                label: 'Identity',
                                type: 'string',
                                default: 'Individual',
                            },
                            'identityUuid': {
                                label: 'Identity UUID',
                                type: 'string',
                                default: 'd0daa7e4-07d1-47e6-93f2-0629adaa3b49',
                            },
                            'owner': {
                                label: 'Owner',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                                default: 'BusinessUnit',
                            },
                            'ownerUuid': {
                                label: 'Owner UUID',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                                default: '8454c987-cbc5-4a24-ba1a-d420283caabd',
                            },
                            'statuses': {
                                label: 'Status',
                                type: 'string',
                                default: []
                            },
                            'data': {
                                label: 'Data',
                                type: 'json',
                                default: {},
                                translated: true,
                                validation: {
                                    // 'required': { message: 'required' },
                                    'json': { message: 'json' },
                                },
                            },
                        },
                    },
                },
            },
            'assets': {
                label: 'Assets',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['assets'] ? dsDiscoveryEnv['assets'].host : '') + '/' + pathPrefix + '/', // Formerly `:8053`
                },
                entities: {
                    'assets': {
                        properties: {
                            'title': {
                                label: 'Title',
                                type: 'string',
                                default: '',
                                validation: {
                                    'required': {message: 'Title is required.'},
                                },
                            },
                        },
                    },
                },
            },
            'topics': {
                label: 'Topics',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['topics'] ? dsDiscoveryEnv['topics'].host : '') + '/' + pathPrefix + '/', // Formerly `:8016`
                },
                entities: {
                    'topics': {
                        properties: {
                            'title': {
                                label: 'Title',
                                type: 'string',
                                default: '',
                                validation: {
                                    'required': {message: 'Title is required.'},
                                },
                            },
                        },
                    },
                },
            },
            'tasks': {
                label: 'Tasks',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['tasks'] ? dsDiscoveryEnv['tasks'].host : '') + '/' + pathPrefix + '/', // Formerly `:8060`
                },
                entities: {
                    'tasks': {
                        properties: {
                            'uuid': {
                                label: 'UUID',
                                type: 'string',
                            },
                            'title': {
                                label: 'Title',
                                type: 'string',
                            },
                            'description': {
                                label: 'Description',
                                type: 'string',
                            },
                            'form': {
                                label: 'Form',
                                type: 'string',
                            },
                            'identity': {
                                label: 'Identity',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                                default: 'Individual',
                            },
                            'identityUuid': {
                                label: 'Identity UUID',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                            },
                            'owner': {
                                label: 'Owner',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                                default: 'BusinessUnit',
                            },
                            'ownerUuid': {
                                label: 'Owner UUID',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                                default: '8454c987-cbc5-4a24-ba1a-d420283caabd',
                            },
                            'createdAt': {
                                label: 'Created At',
                                type: 'date',
                            },
                            'dueAt': {
                                label: 'Due At',
                                type: 'date',
                            },
                            'followUpAt': {
                                label: 'Follow-up At',
                                type: 'date',
                            },
                            'priority': {
                                label: 'Priority',
                                type: 'number',
                            },
                        },
                    },
                    'submissions': {
                        properties: {
                            'uuid': {
                                label: 'UUID',
                                type: 'string',
                            },
                            'updatedAt': {
                                label: 'Updated At',
                                type: 'date',
                            },
                            'createdAt': {
                                label: 'Updated At',
                                type: 'date',
                            },
                        },
                    },
                },
            },
            'records': {
                label: 'Records',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['records'] ? dsDiscoveryEnv['records'].host : '') + '/' + pathPrefix + '/', // Formerly `:8052`
                },
                entities: {
                    'records': {
                        properties: {
                            'title': {
                                label: 'Title',
                                type: 'string',
                                default: '',
                                validation: {
                                    'required': {message: 'Title is required.'},
                                },
                            },
                        },
                    },
                },
            },
            'interactions': {
                label: 'Interactions',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['interactions'] ? dsDiscoveryEnv['interactions'].host : '') + '/' + pathPrefix + '/', // Formerly `:8017`
                },
                entities: {
                    'communications': {
                        properties: {
                            'title': {
                                label: 'Title',
                                type: 'string',
                                default: '',
                                validation: {
                                    'required': {message: 'Title is required.'},
                                },
                            },
                        },
                    },
                    'interactions': {
                        properties: {
                            'title': {
                                label: 'Title',
                                type: 'string',
                                default: '',
                                validation: {
                                    'required': {message: 'Title is required.'},
                                },
                            },
                            'channel': {
                                label: 'Channel',
                                type: 'string',
                                default: '',
                                field: {
                                    type: 'select',
                                    options: {
                                        'sms': 'SMS',
                                        'email': 'Email',
                                        'in_person': 'In-Person',
                                        'inbox': 'Inbox',
                                    },
                                },
                                validation: {
                                    'required': {message: 'Inbox is required.'},
                                },
                            },
                        },
                    },
                },
            },
            // 'individuals': {
            //     label: 'Individuals',
            //     entrypoint: {
            //         url: `${scheme}://${host}:8013/`,
            //     },
            //     entities: {
            //         'individuals': {
            //             properties: {
            //                 'username': {
            //                     label: 'Username',
            //                     type: 'string',
            //                     default: '',
            //                     validation: {
            //                         'required': {message: 'username is required.'},
            //                     },
            //                 },
            //             },
            //         },
            //     },
            // },
            'identities': {
                label: 'Identities',
                entrypoint: {
                    url: scheme + '://' + (dsDiscoveryEnv['identities'] ? dsDiscoveryEnv['identities'].host : '') + '/' + pathPrefix + '/', // Formerly `:8054`
                },
                entities: {
                    'individuals': {
                        properties: {
                            'uuid': {
                                label: 'UUID',
                                type: 'string',
                            },
                            'owner': {
                                label: 'Owner',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                                default: 'BusinessUnit',
                            },
                            'ownerUuid': {
                                label: 'Owner UUID',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                                default: '8454c987-cbc5-4a24-ba1a-d420283caabd',
                            },
                            'createdAt': {
                                label: 'Created At',
                                type: 'date',
                            },
                            'updatedAt': {
                                label: 'Updated At',
                                type: 'date',
                            },
                        },
                    },
                    'organizations': {
                        properties: {
                            'uuid': {
                                label: 'UUID',
                                type: 'string',
                            },
                            'owner': {
                                label: 'Owner',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                                default: 'BusinessUnit',
                            },
                            'ownerUuid': {
                                label: 'Owner UUID',
                                type: 'string',
                                validation: {
                                    'required': {message: 'required'}, // translation key prefixed by 'ds.microservices.entity.validation'
                                },
                                default: '8454c987-cbc5-4a24-ba1a-d420283caabd',
                            },
                            'createdAt': {
                                label: 'Created At',
                                type: 'date',
                            },
                            'updatedAt': {
                                label: 'Updated At',
                                type: 'date',
                            },
                        },
                    },
                    'staff-personas': {
                        properties: {
                            'title': {
                                label: 'Title',
                                type: 'string',
                                default: '',
                                translated: true,
                                validation: {
                                    'required': {message: 'Title is required.'},
                                },
                            },
                            'data': {
                                label: 'Data',
                                type: 'json',
                                default: {},
                            },
                        },
                    },
                },
            },
        };
    }
}
