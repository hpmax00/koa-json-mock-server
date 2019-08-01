var db = require('./db');

module.exports = function(path){
  var database;

  db(path).then(function(d){
    database = d;
  });

  return function *(next){
    var path = this.request.path;
    var query = this.request.query;

    try{
      if (this.method == 'GET'){
        this.response.body = database.get(path, query);
      }else if (this.method == 'POST'){
        this.response.body = database.get(path, this.request.body);
      }
    }catch(e){
      yield next;
    }
  };
}
