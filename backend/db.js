const mongoose = require('mongoose');
const config=require('./config');
const mongoURI=config.mongoUrl;

const connectToMongo=()=>{
    mongoose.connect(
        mongoURI
      )
      .then(()=>console.log('connected to mongo'))
      .catch(e=>console.log(e));
}

module.exports=connectToMongo;