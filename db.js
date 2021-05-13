var jsonFilesLoader = require('./load-json-files');
var R = require('ramda')

var db = {};

function search(array, fieldName, value){
  for (var i = 0; i < array.length; i++){
    var item = array[i];

    if (item[fieldName] == value){
      return item;
    }
  }
}

db.getCollection = (url) => {
  const split = url.split("/");
  split.shift()
  return R.path(split, db.data)
}

db.get = function(url, query){

  const collection = db.getCollection(url)
  const filter = item => {
    const keys = Object.keys(query)
    let result = true

    if (keys.length === 0) {
      result = false
    }

    keys.forEach(key => {
      if (item[key] != query[key]) {
        result = false
      }
    })

    return result
  }

  return Array.isArray(collection) ? collection.filter(filter) : collection
}

// db.post = (url, body) => {
//   console.log(55555555, url, query)
// }

// db.post =  function (rqObj){
//   // var collection = this.get(path);
//   // collection.push(data);
//   const params =  R.toPairs(rqObj)
//   // const filter =
//   var collection = R.filter(filter, this.data);
//    return collection
// }

module.exports = function(path){
  return new Promise(function(resolve){
    jsonFilesLoader(path).then(function(data){
      db.data = data;
      console.log('data', data);
      resolve(db);
    });
  });
}
