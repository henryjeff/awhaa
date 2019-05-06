// const MongoClient = require('mongodb').MongoClient;
// const Logger = require('mongodb').Logger
// const mongo_uri = require('../config/.env').MONGODB_URI
//
// const assert = require('assert');
//
//
// var _db;
//
// console.log("Establishing Connection with master cluter")
// var s_time = process.hrtime()[1];
//
// MongoClient.connect(mongo_uri, {useNewUrlParser: true}, function(err, client) {
//   assert.equal(null, err);
//   Logger.setLevel('debug');
//   Logger.filter('class', ['Db']);
//
//
//   console.log('Connected to master cluster...');
//
//
//   console.log('\tEstablishing Connection with database: awhaa_db...');
//
//   _db = client.db('awhaa_db');
//
//   var d_time = (process.hrtime()[1] - s_time) / 1000000;
//
//   console.log('\tConnected to awhaa_db');
//   console.log(`Connecitions established in ${d_time} ms`)
//   console.log('Exporting Database');
// });
//
// module.exports = {
//   getDb: function(){
//     return _db;
//   }
// };
