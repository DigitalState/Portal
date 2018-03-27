/**
 * Global holder of Formio mock data.
 */
var FORMIO_MOCK = {};

FORMIO_MOCK.basic = {
  messageData: {
    language: 'en',
    translations: null,
    forms: [
      {
        "id": "subFormTest",
        "primary": true,
        "method": "POST",
        "action": "/scenarios/e049f2b4-b249-48c2-850c-64d4c4b39527/submissions",
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Description",
            "key": "description",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": []
          },
          {
            "input": true,
            "tableView": true,
            "label": "Approved",
            "key": "approved",
            "values": [
              {
                "value": "yes",
                "label": "yes",
                "shortcut": ""
              },
              {
                "value": "no",
                "label": "no",
                "shortcut": ""
              }
            ],
            "inline": false,
            "protected": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": true
            },
            "type": "selectboxes",
            "hideLabel": false,
            "labelPosition": "top",
            "optionsLabelPosition": "right",
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            }
          },
          {
            "properties": {},
            "conditional": {
              "eq": "",
              "when": null,
              "show": ""
            },
            "tags": [],
            "labelPosition": "top",
            "hideLabel": false,
            "project": "",
            "type": "form",
            "persistent": true,
            "unique": false,
            "protected": false,
            "label": "mySubForm",
            "path": "",
            "form": {
              "_id": "5aa6b4a29b2ab1003d686e21",
              "machineName": "payTaxes",
              "modified": "2018-03-14T16:53:19.934Z",
              "display": "form",
              "title": "Pay Taxes",
              "name": "payTaxes",
              "path": "pay-taxes",
              "created": "2018-03-12T17:10:58.168Z",
              "components": [
                {
                  "input": true,
                  "tableView": true,
                  "inputType": "text",
                  "inputMask": "",
                  "label": "Tax ID",
                  "key": "taxId",
                  "placeholder": "",
                  "prefix": "",
                  "suffix": "",
                  "multiple": false,
                  "defaultValue": "",
                  "protected": false,
                  "unique": false,
                  "persistent": true,
                  "hidden": false,
                  "clearOnHide": true,
                  "validate": {
                    "required": false,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": "",
                    "customPrivate": false
                  },
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  },
                  "type": "textfield",
                  "hideLabel": false,
                  "labelPosition": "top",
                  "tags": [],
                  "properties": {},
                  "lockKey": true
                },
                {
                  "clearOnHide": false,
                  "input": false,
                  "tableView": false,
                  "key": "columns",
                  "columns": [
                    {
                      "components": [
                        {
                          "input": true,
                          "tableView": true,
                          "label": "Taxation year",
                          "key": "taxationYear",
                          "placeholder": "",
                          "data": {
                            "values": [
                              {
                                "value": "2017",
                                "label": "2017"
                              },
                              {
                                "value": "2016",
                                "label": "2016"
                              },
                              {
                                "value": "2015",
                                "label": "2015"
                              }
                            ],
                            "json": "",
                            "url": "",
                            "resource": "",
                            "custom": ""
                          },
                          "dataSrc": "values",
                          "valueProperty": "",
                          "defaultValue": "",
                          "refreshOn": "",
                          "filter": "",
                          "authenticate": false,
                          "template": "<span>{{ item.label }}</span>",
                          "multiple": false,
                          "protected": false,
                          "unique": false,
                          "persistent": true,
                          "hidden": false,
                          "clearOnHide": true,
                          "validate": {
                            "required": false
                          },
                          "type": "select",
                          "hideLabel": false,
                          "labelPosition": "top",
                          "tags": [],
                          "conditional": {
                            "show": "",
                            "when": null,
                            "eq": ""
                          },
                          "properties": {},
                          "lockKey": true
                        },
                        {
                          "input": true,
                          "tableView": true,
                          "inputType": "number",
                          "label": "Paid amount",
                          "key": "paidamount",
                          "placeholder": "",
                          "prefix": "",
                          "suffix": "",
                          "defaultValue": "",
                          "protected": false,
                          "persistent": true,
                          "hidden": false,
                          "clearOnHide": true,
                          "validate": {
                            "required": false,
                            "min": "",
                            "max": "",
                            "step": "any",
                            "integer": "",
                            "multiple": "",
                            "custom": ""
                          },
                          "type": "number",
                          "labelPosition": "top",
                          "tags": [],
                          "conditional": {
                            "show": "",
                            "when": null,
                            "eq": ""
                          },
                          "properties": {},
                          "hideLabel": false
                        }
                      ],
                      "width": 6,
                      "offset": 0,
                      "push": 0,
                      "pull": 0
                    },
                    {
                      "components": [
                        {
                          "clearOnHide": false,
                          "key": "columnsWell",
                          "input": false,
                          "components": [
                            {
                              "key": "columnsWellHtml",
                              "input": false,
                              "tag": "p",
                              "attrs": [
                                {
                                  "value": "",
                                  "attr": ""
                                }
                              ],
                              "className": "small",
                              "content": "Caeleste terras deus ad ambitae effervescere. Zonae dominari formas nullo erant sidera praeter amphitrite. Tumescere quinta valles facientes quisque numero.",
                              "type": "htmlelement",
                              "hideLabel": false,
                              "tags": [],
                              "conditional": {
                                "show": "",
                                "when": null,
                                "eq": ""
                              },
                              "properties": {}
                            }
                          ],
                          "tableView": false,
                          "type": "well",
                          "hideLabel": false,
                          "tags": [],
                          "conditional": {
                            "show": "",
                            "when": null,
                            "eq": ""
                          },
                          "properties": {}
                        },
                        {
                          "input": true,
                          "inputType": "checkbox",
                          "tableView": true,
                          "label": "Exempted for this taxation year.",
                          "datagridLabel": true,
                          "key": "exemptedForThisTaxationYear",
                          "defaultValue": false,
                          "protected": false,
                          "persistent": true,
                          "hidden": false,
                          "name": "",
                          "value": "",
                          "clearOnHide": true,
                          "validate": {
                            "required": false
                          },
                          "type": "checkbox",
                          "labelPosition": "right",
                          "hideLabel": false,
                          "tags": [],
                          "conditional": {
                            "show": "",
                            "when": null,
                            "eq": ""
                          },
                          "properties": {},
                          "lockKey": true
                        }
                      ],
                      "width": 6,
                      "offset": 0,
                      "push": 0,
                      "pull": 0
                    }
                  ],
                  "type": "columns",
                  "hideLabel": false,
                  "tags": [],
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  },
                  "properties": {}
                },
                {
                  "input": true,
                  "label": "Submit",
                  "tableView": false,
                  "key": "submit",
                  "size": "md",
                  "leftIcon": "",
                  "rightIcon": "",
                  "block": false,
                  "action": "submit",
                  "disableOnInvalid": false,
                  "theme": "primary",
                  "type": "button",
                  "hideLabel": false
                }
              ],
              "owner": "5aa07191ae3478003d02ccb1",
              "submissionAccess": [
                {
                  "type": "create_all",
                  "roles": []
                },
                {
                  "type": "read_all",
                  "roles": []
                },
                {
                  "type": "update_all",
                  "roles": []
                },
                {
                  "type": "delete_all",
                  "roles": []
                },
                {
                  "type": "create_own",
                  "roles": [
                    "5aa07190ae3478003d02cca4"
                  ]
                },
                {
                  "type": "read_own",
                  "roles": []
                },
                {
                  "type": "update_own",
                  "roles": []
                },
                {
                  "type": "delete_own",
                  "roles": []
                }
              ],
              "access": [
                {
                  "type": "read_all",
                  "roles": [
                    "5aa07190ae3478003d02cca2",
                    "5aa07190ae3478003d02cca3",
                    "5aa07190ae3478003d02cca4"
                  ]
                }
              ],
              "tags": [
                "common"
              ],
              "type": "form"
            },
            "reference": true,
            "src": "",
            "key": "mySubForm",
            "tableView": true,
            "input": true,
            "clearOnHide": true
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ]
      }
    ]
  }
};


FORMIO_MOCK.twoColumns = {
  messageData: {
    language: 'en',
    translations: {
      "en": {
        "City": "City",
        "Country": "Country",
        "Tax ID": "Tax ID",
        "Taxation year": "Taxation year",
        "Paid amount": "Paid amount",
        "Exempted for this taxation year.": "Exempted for this taxation year."
      },
      "fr": {
        "City": "Ville",
        "Country": "Pays",
        "Tax ID": "ID de taxe",
        "Taxation year": "Année d'imposition",
        "Paid amount": "Montant payé",
        "Exempted for this taxation year.": "Exempté pour cette année d'imposition"
      }
    },
    forms: [
      {
        "id": "pothole-report",
        "method": "POST",
        "action": "/scenarios/e049f2b4-b249-48c2-850c-64d4c4b39527/submissions",
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Tax ID",
            "key": "taxId",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {},
            "lockKey": true
          },
          {
            "clearOnHide": false,
            "input": false,
            "tableView": false,
            "key": "columns",
            "columns": [
              {
                "components": [
                  {
                    "input": true,
                    "tableView": true,
                    "label": "Taxation year",
                    "key": "taxationYear",
                    "placeholder": "",
                    "data": {
                      "values": [
                        {
                          "value": "2017",
                          "label": "2017"
                        },
                        {
                          "value": "2016",
                          "label": "2016"
                        },
                        {
                          "value": "2015",
                          "label": "2015"
                        }
                      ],
                      "json": "",
                      "url": "",
                      "resource": "",
                      "custom": ""
                    },
                    "dataSrc": "values",
                    "valueProperty": "",
                    "defaultValue": "",
                    "refreshOn": "",
                    "filter": "",
                    "authenticate": false,
                    "template": "<span>{{ item.label }}</span>",
                    "multiple": false,
                    "protected": false,
                    "unique": false,
                    "persistent": true,
                    "hidden": false,
                    "clearOnHide": true,
                    "validate": {
                      "required": false
                    },
                    "type": "select",
                    "hideLabel": false,
                    "labelPosition": "top",
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "lockKey": true
                  },
                  {
                    "input": true,
                    "tableView": true,
                    "inputType": "number",
                    "label": "Paid amount",
                    "key": "paidamount",
                    "placeholder": "",
                    "prefix": "",
                    "suffix": "",
                    "defaultValue": "",
                    "protected": false,
                    "persistent": true,
                    "hidden": false,
                    "clearOnHide": true,
                    "validate": {
                      "required": false,
                      "min": "",
                      "max": "",
                      "step": "any",
                      "integer": "",
                      "multiple": "",
                      "custom": ""
                    },
                    "type": "number",
                    "labelPosition": "top",
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "hideLabel": false
                  }
                ],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0
              },
              {
                "components": [
                  {
                    "clearOnHide": false,
                    "key": "columnsWell",
                    "input": false,
                    "components": [
                      {
                        "key": "columnsWellHtml",
                        "input": false,
                        "tag": "p",
                        "attrs": [
                          {
                            "value": "",
                            "attr": ""
                          }
                        ],
                        "className": "small",
                        "content": "Caeleste terras deus ad ambitae effervescere. Zonae dominari formas nullo erant sidera praeter amphitrite. Tumescere quinta valles facientes quisque numero.",
                        "type": "htmlelement",
                        "hideLabel": false,
                        "tags": [],
                        "conditional": {
                          "show": "",
                          "when": null,
                          "eq": ""
                        },
                        "properties": {}
                      }
                    ],
                    "tableView": false,
                    "type": "well",
                    "hideLabel": false,
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {}
                  },
                  {
                    "input": true,
                    "inputType": "checkbox",
                    "tableView": true,
                    "label": "Exempted for this taxation year.",
                    "datagridLabel": true,
                    "key": "exemptedForThisTaxationYear",
                    "defaultValue": false,
                    "protected": false,
                    "persistent": true,
                    "hidden": false,
                    "name": "",
                    "value": "",
                    "clearOnHide": true,
                    "validate": {
                      "required": false
                    },
                    "type": "checkbox",
                    "labelPosition": "right",
                    "hideLabel": false,
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "lockKey": true
                  }
                ],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0
              }
            ],
            "type": "columns",
            "hideLabel": false,
            "tags": [],
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "properties": {}
          },
          {
            "clearOnHide": false,
            "input": false,
            "tableView": false,
            "key": "columns",
            "columns": [
              {
                "components": [
                  {
                    "input": true,
                    "tableView": true,
                    "label": "Taxation year",
                    "key": "taxationYear",
                    "placeholder": "",
                    "data": {
                      "values": [
                        {
                          "value": "2017",
                          "label": "2017"
                        },
                        {
                          "value": "2016",
                          "label": "2016"
                        },
                        {
                          "value": "2015",
                          "label": "2015"
                        }
                      ],
                      "json": "",
                      "url": "",
                      "resource": "",
                      "custom": ""
                    },
                    "dataSrc": "values",
                    "valueProperty": "",
                    "defaultValue": "",
                    "refreshOn": "",
                    "filter": "",
                    "authenticate": false,
                    "template": "<span>{{ item.label }}</span>",
                    "multiple": false,
                    "protected": false,
                    "unique": false,
                    "persistent": true,
                    "hidden": false,
                    "clearOnHide": true,
                    "validate": {
                      "required": false
                    },
                    "type": "select",
                    "hideLabel": false,
                    "labelPosition": "top",
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "lockKey": true
                  },
                  {
                    "input": true,
                    "tableView": true,
                    "inputType": "number",
                    "label": "Paid amount",
                    "key": "paidamount",
                    "placeholder": "",
                    "prefix": "",
                    "suffix": "",
                    "defaultValue": "",
                    "protected": false,
                    "persistent": true,
                    "hidden": false,
                    "clearOnHide": true,
                    "validate": {
                      "required": false,
                      "min": "",
                      "max": "",
                      "step": "any",
                      "integer": "",
                      "multiple": "",
                      "custom": ""
                    },
                    "type": "number",
                    "labelPosition": "top",
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "hideLabel": false
                  }
                ],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0
              },
              {
                "components": [
                  {
                    "clearOnHide": false,
                    "key": "columnsWell",
                    "input": false,
                    "components": [
                      {
                        "key": "columnsWellHtml",
                        "input": false,
                        "tag": "p",
                        "attrs": [
                          {
                            "value": "",
                            "attr": ""
                          }
                        ],
                        "className": "small",
                        "content": "Caeleste terras deus ad ambitae effervescere. Zonae dominari formas nullo erant sidera praeter amphitrite. Tumescere quinta valles facientes quisque numero.",
                        "type": "htmlelement",
                        "hideLabel": false,
                        "tags": [],
                        "conditional": {
                          "show": "",
                          "when": null,
                          "eq": ""
                        },
                        "properties": {}
                      }
                    ],
                    "tableView": false,
                    "type": "well",
                    "hideLabel": false,
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {}
                  },
                  {
                    "input": true,
                    "inputType": "checkbox",
                    "tableView": true,
                    "label": "Exempted for this taxation year.",
                    "datagridLabel": true,
                    "key": "exemptedForThisTaxationYear",
                    "defaultValue": false,
                    "protected": false,
                    "persistent": true,
                    "hidden": false,
                    "name": "",
                    "value": "",
                    "clearOnHide": true,
                    "validate": {
                      "required": false
                    },
                    "type": "checkbox",
                    "labelPosition": "right",
                    "hideLabel": false,
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "lockKey": true
                  }
                ],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0
              }
            ],
            "type": "columns",
            "hideLabel": false,
            "tags": [],
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "properties": {}
          },
          {
            "clearOnHide": false,
            "input": false,
            "tableView": false,
            "key": "columns",
            "columns": [
              {
                "components": [
                  {
                    "input": true,
                    "tableView": true,
                    "label": "Taxation year",
                    "key": "taxationYear",
                    "placeholder": "",
                    "data": {
                      "values": [
                        {
                          "value": "2017",
                          "label": "2017"
                        },
                        {
                          "value": "2016",
                          "label": "2016"
                        },
                        {
                          "value": "2015",
                          "label": "2015"
                        }
                      ],
                      "json": "",
                      "url": "",
                      "resource": "",
                      "custom": ""
                    },
                    "dataSrc": "values",
                    "valueProperty": "",
                    "defaultValue": "",
                    "refreshOn": "",
                    "filter": "",
                    "authenticate": false,
                    "template": "<span>{{ item.label }}</span>",
                    "multiple": false,
                    "protected": false,
                    "unique": false,
                    "persistent": true,
                    "hidden": false,
                    "clearOnHide": true,
                    "validate": {
                      "required": false
                    },
                    "type": "select",
                    "hideLabel": false,
                    "labelPosition": "top",
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "lockKey": true
                  },
                  {
                    "input": true,
                    "tableView": true,
                    "inputType": "number",
                    "label": "Paid amount",
                    "key": "paidamount",
                    "placeholder": "",
                    "prefix": "",
                    "suffix": "",
                    "defaultValue": "",
                    "protected": false,
                    "persistent": true,
                    "hidden": false,
                    "clearOnHide": true,
                    "validate": {
                      "required": false,
                      "min": "",
                      "max": "",
                      "step": "any",
                      "integer": "",
                      "multiple": "",
                      "custom": ""
                    },
                    "type": "number",
                    "labelPosition": "top",
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "hideLabel": false
                  }
                ],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0
              },
              {
                "components": [
                  {
                    "clearOnHide": false,
                    "key": "columnsWell",
                    "input": false,
                    "components": [
                      {
                        "key": "columnsWellHtml",
                        "input": false,
                        "tag": "p",
                        "attrs": [
                          {
                            "value": "",
                            "attr": ""
                          }
                        ],
                        "className": "small",
                        "content": "Caeleste terras deus ad ambitae effervescere. Zonae dominari formas nullo erant sidera praeter amphitrite. Tumescere quinta valles facientes quisque numero.",
                        "type": "htmlelement",
                        "hideLabel": false,
                        "tags": [],
                        "conditional": {
                          "show": "",
                          "when": null,
                          "eq": ""
                        },
                        "properties": {}
                      }
                    ],
                    "tableView": false,
                    "type": "well",
                    "hideLabel": false,
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {}
                  },
                  {
                    "input": true,
                    "inputType": "checkbox",
                    "tableView": true,
                    "label": "Exempted for this taxation year.",
                    "datagridLabel": true,
                    "key": "exemptedForThisTaxationYear",
                    "defaultValue": false,
                    "protected": false,
                    "persistent": true,
                    "hidden": false,
                    "name": "",
                    "value": "",
                    "clearOnHide": true,
                    "validate": {
                      "required": false
                    },
                    "type": "checkbox",
                    "labelPosition": "right",
                    "hideLabel": false,
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "lockKey": true
                  }
                ],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0
              }
            ],
            "type": "columns",
            "hideLabel": false,
            "tags": [],
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "properties": {}
          },
          {
            "clearOnHide": false,
            "input": false,
            "tableView": false,
            "key": "columns",
            "columns": [
              {
                "components": [
                  {
                    "input": true,
                    "tableView": true,
                    "label": "Taxation year",
                    "key": "taxationYear",
                    "placeholder": "",
                    "data": {
                      "values": [
                        {
                          "value": "2017",
                          "label": "2017"
                        },
                        {
                          "value": "2016",
                          "label": "2016"
                        },
                        {
                          "value": "2015",
                          "label": "2015"
                        }
                      ],
                      "json": "",
                      "url": "",
                      "resource": "",
                      "custom": ""
                    },
                    "dataSrc": "values",
                    "valueProperty": "",
                    "defaultValue": "",
                    "refreshOn": "",
                    "filter": "",
                    "authenticate": false,
                    "template": "<span>{{ item.label }}</span>",
                    "multiple": false,
                    "protected": false,
                    "unique": false,
                    "persistent": true,
                    "hidden": false,
                    "clearOnHide": true,
                    "validate": {
                      "required": false
                    },
                    "type": "select",
                    "hideLabel": false,
                    "labelPosition": "top",
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "lockKey": true
                  },
                  {
                    "input": true,
                    "tableView": true,
                    "inputType": "number",
                    "label": "Paid amount",
                    "key": "paidamount",
                    "placeholder": "",
                    "prefix": "",
                    "suffix": "",
                    "defaultValue": "",
                    "protected": false,
                    "persistent": true,
                    "hidden": false,
                    "clearOnHide": true,
                    "validate": {
                      "required": false,
                      "min": "",
                      "max": "",
                      "step": "any",
                      "integer": "",
                      "multiple": "",
                      "custom": ""
                    },
                    "type": "number",
                    "labelPosition": "top",
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "hideLabel": false
                  }
                ],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0
              },
              {
                "components": [
                  {
                    "clearOnHide": false,
                    "key": "columnsWell",
                    "input": false,
                    "components": [
                      {
                        "key": "columnsWellHtml",
                        "input": false,
                        "tag": "p",
                        "attrs": [
                          {
                            "value": "",
                            "attr": ""
                          }
                        ],
                        "className": "small",
                        "content": "Caeleste terras deus ad ambitae effervescere. Zonae dominari formas nullo erant sidera praeter amphitrite. Tumescere quinta valles facientes quisque numero.",
                        "type": "htmlelement",
                        "hideLabel": false,
                        "tags": [],
                        "conditional": {
                          "show": "",
                          "when": null,
                          "eq": ""
                        },
                        "properties": {}
                      }
                    ],
                    "tableView": false,
                    "type": "well",
                    "hideLabel": false,
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {}
                  },
                  {
                    "input": true,
                    "inputType": "checkbox",
                    "tableView": true,
                    "label": "Exempted for this taxation year.",
                    "datagridLabel": true,
                    "key": "exemptedForThisTaxationYear",
                    "defaultValue": false,
                    "protected": false,
                    "persistent": true,
                    "hidden": false,
                    "name": "",
                    "value": "",
                    "clearOnHide": true,
                    "validate": {
                      "required": false
                    },
                    "type": "checkbox",
                    "labelPosition": "right",
                    "hideLabel": false,
                    "tags": [],
                    "conditional": {
                      "show": "",
                      "when": null,
                      "eq": ""
                    },
                    "properties": {},
                    "lockKey": true
                  }
                ],
                "width": 6,
                "offset": 0,
                "push": 0,
                "pull": 0
              }
            ],
            "type": "columns",
            "hideLabel": false,
            "tags": [],
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "properties": {}
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ],
        "data": [],
        "primary": true
      },
      {
        "id": "address",
        "method": null,
        "action": null,
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "City",
            "key": "city",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Country",
            "key": "country",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ],
        "data": {
          "city": "Ottawa",
          "country": "Canada"
        },
        "primary": false
      },
      {
        "id": "address",
        "method": null,
        "action": null,
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "City",
            "key": "city",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Country",
            "key": "country",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ],
        "data": {
          "city": "Ottawa",
          "country": "Canada"
        },
        "primary": false
      },
      {
        "id": "address",
        "method": null,
        "action": null,
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "City",
            "key": "city",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Country",
            "key": "country",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ],
        "data": {
          "city": "Ottawa",
          "country": "Canada"
        },
        "primary": false
      },
      {
        "id": "address",
        "method": null,
        "action": null,
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "City",
            "key": "city",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Country",
            "key": "country",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ],
        "data": {
          "city": "Ottawa",
          "country": "Canada"
        },
        "primary": false
      },
      {
        "id": "address",
        "method": null,
        "action": null,
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "City",
            "key": "city",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Country",
            "key": "country",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ],
        "data": {
          "city": "Ottawa",
          "country": "Canada"
        },
        "primary": false
      },
      {
        "id": "address",
        "method": null,
        "action": null,
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "City",
            "key": "city",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Country",
            "key": "country",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ],
        "data": {
          "city": "Ottawa",
          "country": "Canada"
        },
        "primary": false
      },
      {
        "id": "address",
        "method": null,
        "action": null,
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "City",
            "key": "city",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Country",
            "key": "country",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": {}
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ],
        "data": {
          "city": "Ottawa",
          "country": "Canada"
        },
        "primary": false
      }
    ]
  }
};


FORMIO_MOCK.wizard = {
  messageData: {
    language: 'en',
    translations: null,
    forms: [
      {
        "id": "pothole-report",
        "primary": false,
        "method": "POST",
        "action": "/scenarios/e049f2b4-b249-48c2-850c-64d4c4b39527/submissions",
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "properties": [],
            "tags": [],
            "labelPosition": "top",
            "hideLabel": false,
            "type": "textfield",
            "conditional": {
              "eq": "",
              "when": null,
              "show": ""
            },
            "validate": {
              "customPrivate": false,
              "custom": "",
              "pattern": "",
              "maxLength": "",
              "minLength": "",
              "required": false
            },
            "clearOnHide": true,
            "hidden": false,
            "persistent": true,
            "unique": false,
            "protected": false,
            "defaultValue": "",
            "multiple": false,
            "suffix": "",
            "prefix": "",
            "placeholder": "",
            "key": "description",
            "label": "Description",
            "inputMask": "",
            "inputType": "text",
            "tableView": true,
            "input": true
          },
          {
            "hideLabel": false,
            "type": "button",
            "theme": "primary",
            "disableOnInvalid": false,
            "action": "submit",
            "block": false,
            "rightIcon": "",
            "leftIcon": "",
            "size": "md",
            "key": "submit",
            "tableView": false,
            "label": "Submit",
            "input": true
          }
        ],
        "data": {
          "description": "Sample description text"
        }
      },
      {
        "id": "wizard",
        "primary": true,
        "method": null,
        "action": null,
        "type": "formio",
        "display": "wizard",
        "schema": [
          {
            "type": "panel",
            "title": "Page 1",
            "isNew": true,
            "components": [
              {
                "input": true,
                "tableView": true,
                "inputType": "text",
                "inputMask": "",
                "label": "Text Field in page (1)",
                "key": "textFieldInPage1",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "unique": false,
                "persistent": true,
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                  "required": false,
                  "minLength": "",
                  "maxLength": "",
                  "pattern": "",
                  "custom": "",
                  "customPrivate": false
                },
                "conditional": {
                  "show": "",
                  "when": null,
                  "eq": ""
                },
                "type": "textfield",
                "hideLabel": false,
                "labelPosition": "top",
                "tags": [],
                "properties": {}
              }
            ],
            "input": false,
            "key": "page1",
            "clearOnHide": false,
            "theme": "default",
            "tableView": false,
            "hideLabel": false
          },
          {
            "type": "panel",
            "title": "Page 2",
            "isNew": true,
            "components": [
              {
                "input": true,
                "tableView": true,
                "inputType": "text",
                "inputMask": "",
                "label": "Text Field in page (2)",
                "key": "textFieldInPage2",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "unique": false,
                "persistent": true,
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                  "required": false,
                  "minLength": "",
                  "maxLength": "",
                  "pattern": "",
                  "custom": "",
                  "customPrivate": false
                },
                "conditional": {
                  "show": "",
                  "when": null,
                  "eq": ""
                },
                "type": "textfield",
                "hideLabel": false,
                "labelPosition": "top",
                "tags": [],
                "properties": {}
              }
            ],
            "input": false,
            "key": "page2",
            "clearOnHide": false,
            "theme": "default",
            "tableView": false,
            "hideLabel": false
          },
          {
            "type": "panel",
            "title": "Page 3",
            "isNew": true,
            "components": [
              {
                "input": true,
                "tableView": true,
                "inputType": "text",
                "inputMask": "",
                "label": "Text Field in page (3)",
                "key": "textFieldInPage3",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "unique": false,
                "persistent": true,
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                  "required": false,
                  "minLength": "",
                  "maxLength": "",
                  "pattern": "",
                  "custom": "",
                  "customPrivate": false
                },
                "conditional": {
                  "show": "",
                  "when": null,
                  "eq": ""
                },
                "type": "textfield",
                "hideLabel": false,
                "labelPosition": "top",
                "tags": [],
                "properties": {}
              },
              {
                "input": true,
                "tableView": true,
                "label": "Text Area Field in page (3)",
                "key": "textAreaFieldInPage3",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "rows": 3,
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "persistent": true,
                "hidden": false,
                "wysiwyg": false,
                "clearOnHide": true,
                "validate": {
                  "required": false,
                  "minLength": "",
                  "maxLength": "",
                  "pattern": "",
                  "custom": ""
                },
                "type": "textarea",
                "hideLabel": false,
                "labelPosition": "top",
                "tags": [],
                "conditional": {
                  "show": "",
                  "when": null,
                  "eq": ""
                },
                "properties": {}
              }
            ],
            "input": false,
            "key": "page3",
            "clearOnHide": false,
            "theme": "default",
            "tableView": false,
            "hideLabel": false
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ],
        "data": {
          "textFieldInPage1": "hi I am textFieldInPage1",
          "textFieldInPage2": "hi I am textFieldInPage2",
          "textFieldInPage3": "hi I am textFieldInPage3",
          "textAreaFieldInPage3": "hi I am textAreaFieldInPage3"
        }
      }
    ]
  }
};


FORMIO_MOCK.embedded = {
  messageData: {
    language: 'en',
    translations: null,
    forms: [
      {
        "id": "subFormTest",
        "primary": true,
        "method": "POST",
        "action": "/scenarios/e049f2b4-b249-48c2-850c-64d4c4b39527/submissions",
        "type": "formio",
        "display": "form",
        "schema": [
          {
            "input": true,
            "tableView": true,
            "inputType": "text",
            "inputMask": "",
            "label": "Description",
            "key": "description",
            "placeholder": "",
            "prefix": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": "",
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": false,
              "minLength": "",
              "maxLength": "",
              "pattern": "",
              "custom": "",
              "customPrivate": false
            },
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            },
            "type": "textfield",
            "hideLabel": false,
            "labelPosition": "top",
            "tags": [],
            "properties": []
          },
          {
            "input": true,
            "tableView": true,
            "label": "Approved",
            "key": "approved",
            "values": [
              {
                "value": "yes",
                "label": "yes",
                "shortcut": ""
              },
              {
                "value": "no",
                "label": "no",
                "shortcut": ""
              }
            ],
            "inline": false,
            "protected": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": true,
            "validate": {
              "required": true
            },
            "type": "selectboxes",
            "hideLabel": false,
            "labelPosition": "top",
            "optionsLabelPosition": "right",
            "conditional": {
              "show": "",
              "when": null,
              "eq": ""
            }
          },
          {
            "properties": {},
            "conditional": {
              "eq": "",
              "when": null,
              "show": ""
            },
            "tags": [],
            "labelPosition": "top",
            "hideLabel": false,
            "project": "",
            "type": "form",
            "persistent": true,
            "unique": false,
            "protected": false,
            "label": "mySubForm",
            "path": "",
            "form": {
              "_id": "5aa6b4a29b2ab1003d686e21",
              "machineName": "payTaxes",
              "modified": "2018-03-14T16:53:19.934Z",
              "display": "form",
              "title": "Pay Taxes",
              "name": "payTaxes",
              "path": "pay-taxes",
              "created": "2018-03-12T17:10:58.168Z",
              "components": [
                {
                  "input": true,
                  "tableView": true,
                  "inputType": "text",
                  "inputMask": "",
                  "label": "Tax ID",
                  "key": "taxId",
                  "placeholder": "",
                  "prefix": "",
                  "suffix": "",
                  "multiple": false,
                  "defaultValue": "",
                  "protected": false,
                  "unique": false,
                  "persistent": true,
                  "hidden": false,
                  "clearOnHide": true,
                  "validate": {
                    "required": false,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": "",
                    "customPrivate": false
                  },
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  },
                  "type": "textfield",
                  "hideLabel": false,
                  "labelPosition": "top",
                  "tags": [],
                  "properties": {},
                  "lockKey": true
                },
                {
                  "clearOnHide": false,
                  "input": false,
                  "tableView": false,
                  "key": "columns",
                  "columns": [
                    {
                      "components": [
                        {
                          "input": true,
                          "tableView": true,
                          "label": "Taxation year",
                          "key": "taxationYear",
                          "placeholder": "",
                          "data": {
                            "values": [
                              {
                                "value": "2017",
                                "label": "2017"
                              },
                              {
                                "value": "2016",
                                "label": "2016"
                              },
                              {
                                "value": "2015",
                                "label": "2015"
                              }
                            ],
                            "json": "",
                            "url": "",
                            "resource": "",
                            "custom": ""
                          },
                          "dataSrc": "values",
                          "valueProperty": "",
                          "defaultValue": "",
                          "refreshOn": "",
                          "filter": "",
                          "authenticate": false,
                          "template": "<span>{{ item.label }}</span>",
                          "multiple": false,
                          "protected": false,
                          "unique": false,
                          "persistent": true,
                          "hidden": false,
                          "clearOnHide": true,
                          "validate": {
                            "required": false
                          },
                          "type": "select",
                          "hideLabel": false,
                          "labelPosition": "top",
                          "tags": [],
                          "conditional": {
                            "show": "",
                            "when": null,
                            "eq": ""
                          },
                          "properties": {},
                          "lockKey": true
                        },
                        {
                          "input": true,
                          "tableView": true,
                          "inputType": "number",
                          "label": "Paid amount",
                          "key": "paidamount",
                          "placeholder": "",
                          "prefix": "",
                          "suffix": "",
                          "defaultValue": "",
                          "protected": false,
                          "persistent": true,
                          "hidden": false,
                          "clearOnHide": true,
                          "validate": {
                            "required": false,
                            "min": "",
                            "max": "",
                            "step": "any",
                            "integer": "",
                            "multiple": "",
                            "custom": ""
                          },
                          "type": "number",
                          "labelPosition": "top",
                          "tags": [],
                          "conditional": {
                            "show": "",
                            "when": null,
                            "eq": ""
                          },
                          "properties": {},
                          "hideLabel": false
                        }
                      ],
                      "width": 6,
                      "offset": 0,
                      "push": 0,
                      "pull": 0
                    },
                    {
                      "components": [
                        {
                          "clearOnHide": false,
                          "key": "columnsWell",
                          "input": false,
                          "components": [
                            {
                              "key": "columnsWellHtml",
                              "input": false,
                              "tag": "p",
                              "attrs": [
                                {
                                  "value": "",
                                  "attr": ""
                                }
                              ],
                              "className": "small",
                              "content": "Caeleste terras deus ad ambitae effervescere. Zonae dominari formas nullo erant sidera praeter amphitrite. Tumescere quinta valles facientes quisque numero.",
                              "type": "htmlelement",
                              "hideLabel": false,
                              "tags": [],
                              "conditional": {
                                "show": "",
                                "when": null,
                                "eq": ""
                              },
                              "properties": {}
                            }
                          ],
                          "tableView": false,
                          "type": "well",
                          "hideLabel": false,
                          "tags": [],
                          "conditional": {
                            "show": "",
                            "when": null,
                            "eq": ""
                          },
                          "properties": {}
                        },
                        {
                          "input": true,
                          "inputType": "checkbox",
                          "tableView": true,
                          "label": "Exempted for this taxation year.",
                          "datagridLabel": true,
                          "key": "exemptedForThisTaxationYear",
                          "defaultValue": false,
                          "protected": false,
                          "persistent": true,
                          "hidden": false,
                          "name": "",
                          "value": "",
                          "clearOnHide": true,
                          "validate": {
                            "required": false
                          },
                          "type": "checkbox",
                          "labelPosition": "right",
                          "hideLabel": false,
                          "tags": [],
                          "conditional": {
                            "show": "",
                            "when": null,
                            "eq": ""
                          },
                          "properties": {},
                          "lockKey": true
                        }
                      ],
                      "width": 6,
                      "offset": 0,
                      "push": 0,
                      "pull": 0
                    }
                  ],
                  "type": "columns",
                  "hideLabel": false,
                  "tags": [],
                  "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                  },
                  "properties": {}
                },
                {
                  "input": true,
                  "label": "Submit",
                  "tableView": false,
                  "key": "submit",
                  "size": "md",
                  "leftIcon": "",
                  "rightIcon": "",
                  "block": false,
                  "action": "submit",
                  "disableOnInvalid": false,
                  "theme": "primary",
                  "type": "button",
                  "hideLabel": false
                }
              ],
              "owner": "5aa07191ae3478003d02ccb1",
              "submissionAccess": [
                {
                  "type": "create_all",
                  "roles": []
                },
                {
                  "type": "read_all",
                  "roles": []
                },
                {
                  "type": "update_all",
                  "roles": []
                },
                {
                  "type": "delete_all",
                  "roles": []
                },
                {
                  "type": "create_own",
                  "roles": [
                    "5aa07190ae3478003d02cca4"
                  ]
                },
                {
                  "type": "read_own",
                  "roles": []
                },
                {
                  "type": "update_own",
                  "roles": []
                },
                {
                  "type": "delete_own",
                  "roles": []
                }
              ],
              "access": [
                {
                  "type": "read_all",
                  "roles": [
                    "5aa07190ae3478003d02cca2",
                    "5aa07190ae3478003d02cca3",
                    "5aa07190ae3478003d02cca4"
                  ]
                }
              ],
              "tags": [
                "common"
              ],
              "type": "form"
            },
            "reference": true,
            "src": "",
            "key": "mySubForm",
            "tableView": true,
            "input": true,
            "clearOnHide": true
          },
          {
            "input": true,
            "label": "Submit",
            "tableView": false,
            "key": "submit",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "submit",
            "disableOnInvalid": false,
            "theme": "primary",
            "type": "button",
            "hideLabel": false
          }
        ]
      }
    ]
  }
};