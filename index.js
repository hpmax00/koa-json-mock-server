var db = require('./db');

module.exports = function(path){
  var database;

  db(path).then(function(d){
    database = d;
  });

  return async function(ctx, next){
    const path = ctx.request.path;
    const query = ctx.request.query;
    const body = ctx.request.query;
    try{
      let response
      if (ctx.request.method == 'GET'){
        response = database.get(path, query);
      }else if (ctx.request.method == 'POST'){
        response = database.get(path, body);
      }
      
      if (!response) {
        await next()
      } else {
        ctx.response.body = response
      }
    }catch(e){
      console.log("error:", e)
      await next();
    }
  };
}
