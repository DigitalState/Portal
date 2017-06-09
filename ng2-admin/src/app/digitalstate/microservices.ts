
export const MICROSERVICES = {
    'authentication': {
        label: 'Authentication',
        entrypoint: {
            url: 'http://localhost:8010/app_dev.php/',
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
                    default: '',
                    //     validation: {
                    //         'required': {message: 'required'},
                    //     }
                    // },
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
            url: 'http://localhost:8054/',
        },
        entities: {
            'identities': {
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
};
