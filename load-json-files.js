var recursive_readdir = require('recursive-readdir-filter');

var options = {
    filterFile: function (stats) {
        return stats.name.match(/\.json$/);
    }
};

var data = {};

module.exports = function(path){
  return new Promise(function(resolve){
    recursive_readdir(path, options, function (err, files) {
      var pathSize = path.split("/").length;

      for(var i = 0, len = files.length; i < len; i++){

        var splits = files[i].split("/");
        var currentData = data;

        for (var k = pathSize; k < splits.length; k++){
           if (splits[k].match(/\.json$/)){
             var label = splits[k].substring(0, splits[k].length - 5);
             currentData[label] = require(files[i]);
           }else{
             if (!currentData[splits[k]]){
               currentData[splits[k]] = {};
             }
             currentData = currentData[splits[k]];
           }
        }
      }

      resolve(data);
    });
  });
}
