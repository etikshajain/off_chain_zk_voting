const mongoose=require('mongoose');

const ProposalSchema=new mongoose.Schema({
    proposal_id:{
        type:String, //mongoose.Schema.Types.ObjectId
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    start_time:{
        type:Date,
        required:true
    },
    end_time:{
        type:Date,
        required:true
    },
    voting_type:{
        type:String, //SingleChoice,
        default:'SingleChoice'
    },
    voters:[
        {type:String},
    ],
    count:{
        type:Number,
        default:0
    },
    min_tokens_to_vote:{
        type:Number
    },
    options:[
        {type:mongoose.Schema.Types.ObjectId}
    ]
    
});

module.exports=mongoose.model('proposals',ProposalSchema);