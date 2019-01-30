define({ "api": [
  {
    "type": "delete",
    "url": "/features/:id",
    "title": "Delete Existing Feature",
    "version": "1.0.0",
    "name": "DeleteFeature",
    "group": "Feature",
    "description": "<p>Delete existing feature</p>",
    "filename": "lib/feature.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-feature.herokuapp.com/v1/features/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique feature identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nature",
            "defaultValue": "Other",
            "description": "<p>Human readable nature of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "family",
            "defaultValue": "Other",
            "description": "<p>Human readable family of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "other",
            "description": "<p>Human readable type of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a feature if available i.e additional details that clarify what a feature is.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "centroid",
            "defaultValue": "undefined",
            "description": "<p>A geo-point that may be considered as the center of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": false,
            "field": "geometry",
            "description": "<p>A geo-geometry representation of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "properties",
            "description": "<p>A map of key value pairs describing (or detailing) characteristics(or traits) of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "tags",
            "description": "<p>A set of human redable keywords describing a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "place",
            "description": "<p>A map of key value pairs describing a place where a feature is(or belongs).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.continent",
            "defaultValue": "Africa",
            "description": "<p>Human readable continent where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.country",
            "defaultValue": "Tanzania",
            "description": "<p>Human readable country where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when feature was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when feature was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"nature\": \"Boundary\",\n  \"family\": \"Administrative\",\n  \"type\": \"Ward\",\n  \"name\": \"Msongola\",\n  \"place\":{\n     \"continent\": \"Africa\",\n     \"country\": \"Tanzania\",\n     \"region\": \"Dar-es-salaam\",\n     \"district\": \"Ilala\"\n  },\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"geometry\": {\n   \"type\": \"Point\",\n   \"coordinates\": [-76.80207859497996, 55.69469494228919]\n  },\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/features/:id",
    "title": "Get Existing Feature",
    "version": "1.0.0",
    "name": "GetFeature",
    "group": "Feature",
    "description": "<p>Get existing feature</p>",
    "filename": "lib/feature.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-feature.herokuapp.com/v1/features/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique feature identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nature",
            "defaultValue": "Other",
            "description": "<p>Human readable nature of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "family",
            "defaultValue": "Other",
            "description": "<p>Human readable family of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "other",
            "description": "<p>Human readable type of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a feature if available i.e additional details that clarify what a feature is.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "centroid",
            "defaultValue": "undefined",
            "description": "<p>A geo-point that may be considered as the center of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": false,
            "field": "geometry",
            "description": "<p>A geo-geometry representation of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "properties",
            "description": "<p>A map of key value pairs describing (or detailing) characteristics(or traits) of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "tags",
            "description": "<p>A set of human redable keywords describing a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "place",
            "description": "<p>A map of key value pairs describing a place where a feature is(or belongs).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.continent",
            "defaultValue": "Africa",
            "description": "<p>Human readable continent where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.country",
            "defaultValue": "Tanzania",
            "description": "<p>Human readable country where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when feature was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when feature was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"nature\": \"Boundary\",\n  \"family\": \"Administrative\",\n  \"type\": \"Ward\",\n  \"name\": \"Msongola\",\n  \"place\":{\n     \"continent\": \"Africa\",\n     \"country\": \"Tanzania\",\n     \"region\": \"Dar-es-salaam\",\n     \"district\": \"Ilala\"\n  },\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"geometry\": {\n   \"type\": \"Point\",\n   \"coordinates\": [-76.80207859497996, 55.69469494228919]\n  },\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/features/schema",
    "title": "Get Feature Schema",
    "version": "1.0.0",
    "name": "GetFeatureSchema",
    "group": "Feature",
    "description": "<p>Returns feature json schema definition</p>",
    "filename": "lib/feature.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-feature.herokuapp.com/v1/features/schema"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/features",
    "title": "List Features",
    "version": "1.0.0",
    "name": "GetFeatures",
    "group": "Feature",
    "description": "<p>Returns a list of features</p>",
    "filename": "lib/feature.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-feature.herokuapp.com/v1/features"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of features</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique feature identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nature",
            "defaultValue": "Other",
            "description": "<p>Human readable nature of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.family",
            "defaultValue": "Other",
            "description": "<p>Human readable family of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.type",
            "defaultValue": "other",
            "description": "<p>Human readable type of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Human readable name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.nickname",
            "description": "<p>Human readable alternative or well known name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a feature if available i.e additional details that clarify what a feature is.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "data.centroid",
            "defaultValue": "undefined",
            "description": "<p>A geo-point that may be considered as the center of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": false,
            "field": "data.geometry",
            "description": "<p>A geo-geometry representation of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "data.properties",
            "description": "<p>A map of key value pairs describing (or detailing) characteristics(or traits) of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "data.tags",
            "description": "<p>A set of human redable keywords describing a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "data.place",
            "description": "<p>A map of key value pairs describing a place where a feature is(or belongs).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.place.continent",
            "defaultValue": "Africa",
            "description": "<p>Human readable continent where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.place.country",
            "defaultValue": "Tanzania",
            "description": "<p>Human readable country where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when feature was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when feature was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of features</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of features returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest feature was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n   {\n     \"_id\": \"5b5d92da476363251e13e0f4\",\n     \"nature\": \"Boundary\",\n     \"family\": \"Administrative\",\n     \"type\": \"Ward\",\n     \"name\": \"Msongola\",\n     \"place\":{\n       \"continent\": \"Africa\",\n       \"country\": \"Tanzania\",\n       \"region\": \"Dar-es-salaam\",\n       \"district\": \"Ilala\"\n      },\n     \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n     \"geometry\": {\n       \"type\": \"Point\",\n       \"coordinates\": [-76.80207859497996, 55.69469494228919]\n     },\n     \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n     \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n   }\n  ],\n  \"total\": 20,\n  \"size\": 10,\n  \"limit\": 10,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 2,\n  \"lastModified\": \"2018-07-29T10:11:38.111Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/features/:id",
    "title": "Patch Existing Feature",
    "version": "1.0.0",
    "name": "PatchFeature",
    "group": "Feature",
    "description": "<p>Patch existing feature</p>",
    "filename": "lib/feature.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-feature.herokuapp.com/v1/features/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique feature identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nature",
            "defaultValue": "Other",
            "description": "<p>Human readable nature of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "family",
            "defaultValue": "Other",
            "description": "<p>Human readable family of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "other",
            "description": "<p>Human readable type of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a feature if available i.e additional details that clarify what a feature is.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "centroid",
            "defaultValue": "undefined",
            "description": "<p>A geo-point that may be considered as the center of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": false,
            "field": "geometry",
            "description": "<p>A geo-geometry representation of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "properties",
            "description": "<p>A map of key value pairs describing (or detailing) characteristics(or traits) of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "tags",
            "description": "<p>A set of human redable keywords describing a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "place",
            "description": "<p>A map of key value pairs describing a place where a feature is(or belongs).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.continent",
            "defaultValue": "Africa",
            "description": "<p>Human readable continent where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.country",
            "defaultValue": "Tanzania",
            "description": "<p>Human readable country where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when feature was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when feature was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"nature\": \"Boundary\",\n  \"family\": \"Administrative\",\n  \"type\": \"Ward\",\n  \"name\": \"Msongola\",\n  \"place\":{\n     \"continent\": \"Africa\",\n     \"country\": \"Tanzania\",\n     \"region\": \"Dar-es-salaam\",\n     \"district\": \"Ilala\"\n  },\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"geometry\": {\n   \"type\": \"Point\",\n   \"coordinates\": [-76.80207859497996, 55.69469494228919]\n  },\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/features",
    "title": "Create New Feature",
    "version": "1.0.0",
    "name": "PostFeature",
    "group": "Feature",
    "description": "<p>Create new feature</p>",
    "filename": "lib/feature.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-feature.herokuapp.com/v1/features"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique feature identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nature",
            "defaultValue": "Other",
            "description": "<p>Human readable nature of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "family",
            "defaultValue": "Other",
            "description": "<p>Human readable family of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "other",
            "description": "<p>Human readable type of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a feature if available i.e additional details that clarify what a feature is.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "centroid",
            "defaultValue": "undefined",
            "description": "<p>A geo-point that may be considered as the center of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": false,
            "field": "geometry",
            "description": "<p>A geo-geometry representation of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "properties",
            "description": "<p>A map of key value pairs describing (or detailing) characteristics(or traits) of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "tags",
            "description": "<p>A set of human redable keywords describing a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "place",
            "description": "<p>A map of key value pairs describing a place where a feature is(or belongs).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.continent",
            "defaultValue": "Africa",
            "description": "<p>Human readable continent where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.country",
            "defaultValue": "Tanzania",
            "description": "<p>Human readable country where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when feature was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when feature was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"nature\": \"Boundary\",\n  \"family\": \"Administrative\",\n  \"type\": \"Ward\",\n  \"name\": \"Msongola\",\n  \"place\":{\n     \"continent\": \"Africa\",\n     \"country\": \"Tanzania\",\n     \"region\": \"Dar-es-salaam\",\n     \"district\": \"Ilala\"\n  },\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"geometry\": {\n   \"type\": \"Point\",\n   \"coordinates\": [-76.80207859497996, 55.69469494228919]\n  },\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/features/:id",
    "title": "Put Existing Feature",
    "version": "1.0.0",
    "name": "PutFeature",
    "group": "Feature",
    "description": "<p>Put existing feature</p>",
    "filename": "lib/feature.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://emis-feature.herokuapp.com/v1/features/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique feature identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nature",
            "defaultValue": "Other",
            "description": "<p>Human readable nature of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "family",
            "defaultValue": "Other",
            "description": "<p>Human readable family of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "other",
            "description": "<p>Human readable type of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Human readable name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "nickname",
            "description": "<p>Human readable alternative or well known name of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "about",
            "defaultValue": "undefined",
            "description": "<p>A brief summary about a feature if available i.e additional details that clarify what a feature is.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": true,
            "field": "centroid",
            "defaultValue": "undefined",
            "description": "<p>A geo-point that may be considered as the center of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Geometry",
            "optional": false,
            "field": "geometry",
            "description": "<p>A geo-geometry representation of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "properties",
            "description": "<p>A map of key value pairs describing (or detailing) characteristics(or traits) of a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": true,
            "field": "tags",
            "description": "<p>A set of human redable keywords describing a feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "place",
            "description": "<p>A map of key value pairs describing a place where a feature is(or belongs).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.continent",
            "defaultValue": "Africa",
            "description": "<p>Human readable continent where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "place.country",
            "defaultValue": "Tanzania",
            "description": "<p>Human readable country where a feature belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when feature was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when feature was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b5d92da476363251e13e0f4\",\n  \"nature\": \"Boundary\",\n  \"family\": \"Administrative\",\n  \"type\": \"Ward\",\n  \"name\": \"Msongola\",\n  \"place\":{\n     \"continent\": \"Africa\",\n     \"country\": \"Tanzania\",\n     \"region\": \"Dar-es-salaam\",\n     \"district\": \"Ilala\"\n  },\n  \"about\": \"Labore aut corrupti et. Doloribus animi quidem ratione.\",\n  \"geometry\": {\n   \"type\": \"Point\",\n   \"coordinates\": [-76.80207859497996, 55.69469494228919]\n  },\n  \"updatedAt\": \"2018-07-29T10:11:38.110Z\",\n  \"createdAt\": \"2018-07-29T10:11:38.110Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  }
] });
