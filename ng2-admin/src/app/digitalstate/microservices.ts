import { DsEnvironmentConfig } from '../shared/providers/environment.provider';

export class MicroservicesDefinition {

    constructor(protected dsEnv: DsEnvironmentConfig) {

    }

    getAll() {
        let scheme = this.dsEnv.msUrlScheme;
        let host = this.dsEnv.msHost;
        let pathPrefix = 'app_dev.php';

        // host = 'localhost';

        return {
            'authentication': {
                label: 'Authentication',
                entrypoint: {
                    url: `${scheme}://api.authentication.ds/${pathPrefix}/`, // Formerly `:8010`
                    host: 'api.authentication.ds',
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
                    url: `${scheme}://api.cms.ds/${pathPrefix}/`, // Formerly `:8056`
                    host: 'api.cms.ds',
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
                    url: `${scheme}://api.services.ds/${pathPrefix}/`, // Formerly `:8051`
                    host: 'api.services.ds',
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
                    url: `${scheme}://api.cases.ds/${pathPrefix}/`, // Formerly `:8050`
                    host: 'api.cases.ds',
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
                    url: `${scheme}://api.assets.ds/${pathPrefix}/`, // Formerly `:8053`
                    host: 'api.assets.ds',
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
                    url: `${scheme}://api.topics.ds/${pathPrefix}/`, // Formerly `:8016`
                    host: 'api.topics.ds',
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
                    url: `${scheme}://api.tasks.ds/${pathPrefix}/`, // Formerly `:8060`
                    host: 'api.tasks.ds',
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
                    url: `${scheme}://api.records.ds/${pathPrefix}/`, // Formerly `:8052`
                    host: 'api.records.ds',
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
                    url: `${scheme}://api.interactions.ds/${pathPrefix}/`, // Formerly `:8017`
                    host: 'api.interactions.ds',
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
                    url: `${scheme}://api.identities.ds/${pathPrefix}/`, // Formerly `:8054`
                    host: 'api.identities.ds',
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
