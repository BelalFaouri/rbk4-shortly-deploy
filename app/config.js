var mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/shortlydb')

var db =mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Mongodb connection is open')
})

module.exports = db;
      
      

