
export const MICROSERVICES = {
    'authentication': {
        label: 'Authentication',
        entrypoint: {
            url: 'http://localhost:8010/app_dev.php/',
        },
        paths: {
            registration: 'registration',
            login: 'tokens/staff',
        },
    },
    'services': {
        label: 'Services',
        entrypoint: {
            url: 'http://localhost:8051/app_dev.php/',
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
                    'data': {
                        label: 'Data',
                        type: 'json',
                        default: {
                            'bpm': 'camunda',
                            'process_definition_key': ''
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
            url: 'http://localhost:8050/app_dev.php/',
        },
        entities: {
            'cases': {
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
                        default: '9be0af28-ef41-49b7-86d9-72a2d9beb051',
                    },
                },
            },
        },
    },
    'assets': {
        label: 'Assets',
        entrypoint: {
            url: 'http://localhost:8053/',
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
            url: 'http://localhost:8016/',
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
            url: 'http://localhost:8019/',
        },
        entities: {
            'tasks': {
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
    'records': {
        label: 'Records',
        entrypoint: {
            url: 'http://localhost:8052/',
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
            url: 'http://localhost:8017/',
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
    'individuals': {
        label: 'Individuals',
        entrypoint: {
            url: 'http://localhost:8013/',
        },
        entities: {
            'individuals': {
                properties: {
                    'username': {
                        label: 'Username',
                        type: 'string',
                        default: '',
                        validation: {
                            'required': {message: 'username is required.'},
                        },
                    },
                },
            },
        },
    },
    'identities': {
        label: 'Identities',
        entrypoint: {
            url: 'http://localhost:8054/app_dev.php/',
        },
        entities: {
            'individuals': {
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
