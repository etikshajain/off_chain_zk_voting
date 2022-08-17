const mongoose=require('mongoose');

const OptionSchema=new mongoose.Schema({
    option_id:{
        type:String, //mongoose.Schema.Types.ObjectId
        required:true
    },
    proposal_id:{type:mongoose.Schema.Types.ObjectId},
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:0
    },
    voters:[
        {type:String} //array of addresses of voters
    ],
    
});

module.exports=mongoose.model('options',OptionSchema);