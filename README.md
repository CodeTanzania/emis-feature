# emis-feature

[![Build Status](https://travis-ci.org/CodeTanzania/emis-feature.svg?branch=develop)](https://travis-ci.org/CodeTanzania/emis-feature)
[![Dependencies Status](https://david-dm.org/CodeTanzania/emis-feature/status.svg?style=flat-square)](https://david-dm.org/CodeTanzania/emis-feature)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/CodeTanzania/emis-feature/tree/develop)

A representation of geographical feature of interest(i.e mapped physical element with their attributes in landscape e.g. administrative boundaries, roads, buildings etc) both natural and man made used in emergency(or disaster) management(or event).

[Demo](https://emis-feature.herokuapp.com/v1/features)


## Domain Model

![EMIS Feature Domain Model](https://raw.githubusercontent.com/CodeTanzania/emis-feature/develop/specifications/feature.model.png)

## Requirements

- [NodeJS v8.11.1+](https://nodejs.org)
- [Npm v5.6.0+](https://www.npmjs.com/)
- [MongoDB v3.4.10+](https://www.mongodb.com/)
- [Mongoose v5.1.2+](https://github.com/Automattic/mongoose)

## Installation

```sh
npm install @codetanzania/emis-feature --save
```

## Usage

```js
const { app } = require('@codetanzania/emis-feature');
app.start((error) => { ... });
```

## Demo
[View Demo](https://emis-feature.herokuapp.com/v1/features)
[View apidoc](https://codetanzania.github.io/emis-feature/)


## Testing

- Clone this repository

- Install all development dependencies

```sh
npm install
```

- Run example

```sh
npm run dev
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.


## References
- [geojson.org](http://geojson.org/)
- [IETF - The GeoJSON Format](https://tools.ietf.org/html/rfc7946)
- [GeoJSON Wikipedia](https://en.wikipedia.org/wiki/GeoJSON)
- [More than you ever wanted to know about GeoJSON](https://macwright.org/2015/03/23/geojson-second-bite.html)
- [MongoDB - GeoJSON Objects](https://docs.mongodb.com/manual/reference/geojson/)
- [OSM - Map Features](https://wiki.openstreetmap.org/wiki/Map_Features)
- [OSM - Features](https://wiki.openstreetmap.org/wiki/Features)
- [Geographic Information System](https://en.wikipedia.org/wiki/Geographic_information_system)
- [OSM - Boundary](https://wiki.openstreetmap.org/wiki/Boundaries)
- [OSM - Boundary Administrative](https://wiki.openstreetmap.org/wiki/Tag:boundary=administrative)
- [OSM - Place](https://wiki.openstreetmap.org/wiki/Key:place)
- [OSM - Amenity](https://wiki.openstreetmap.org/wiki/Key:amenity)
- [Humanitarian OSM Tags - HDM Preset](https://wiki.openstreetmap.org/wiki/Humanitarian_OSM_Tags/HDM_preset)
- [Dar es Salaam Ramani_Huria Tags](https://wiki.openstreetmap.org/wiki/Dar_es_Salaam/Ramani_Huria)
- [OSM - East Africa Tagging Guidelines](https://wiki.openstreetmap.org/wiki/East_Africa_Tagging_Guidelines)


## License

The MIT License (MIT)

Copyright (c) 2018 CodeTanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
