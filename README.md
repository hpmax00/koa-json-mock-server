Example of: https://www.npmjs.com/package/koa-json-mock-server


## To install

`npm install`

##Run

`npm start`

#Data  

###db/user.json  

```json
[
  { "id"          : 1,
    "name"        : "User 1",
    "favourites"  : [
        { "title" : "Favorito 1",
          "url"   : "url1"
        },
        { "title" : "Favorito 2",
          "url"   : "url2"
        }, {
          "title" : "Favorito 3",
          "url"   : "url3"
        }, {
          "title" : "Favorito 4",
          "url"   : "url4"
        }, {
          "title" : "Favorito 5",
          "url"   : "url5"
        }
      ]
  }
]  
```

###db/bets.json  

```json
[
  {
    "id": 1,
    "date": "19/05/2015",
    "reference": "39594382",
    "description": "Single RUP 25.00",
    "min": "Doble Chance - 90 Mins: Atletico Madrid / Draw @1.50",
    "equipment": "Atletico Madrid - Real Madrid",
    "player": "",
    "match": "",
    "result": "Won",
    "comment": "25.00",
    "in": "37.50",
    "userId": 1
  }
]
```

##To use

```javascript
//server.js
var koa = require('koa');
var Router = require('koa-router');
var jsonServer = require('koa-json-mock-server');
var jsonBody = require('koa-json-body');

const app = new koa()

var koaRouter = new Router();

app.use(jsonBody());
app.use(jsonServer(__dirname + '/db'));

koaRouter.get('/hello', function *(next) {
  this.body = 'Hello World!';
});

app.use(koaRouter.routes());

app.listen(3000);
```

###Url to test

####GET

* http://localhost:3000/users/
* http://localhost:3000/users?id=1
* http://localhost:3000/bets?id=1


####POST

* http://localhost:3000/users/      
* http://localhost:3000/users/  
json: { id: 1 }

Post method save only in memory
