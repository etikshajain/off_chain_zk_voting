const mongoose=require('mongoose');

const ProposalSchema=new mongoose.Schema({
    proposal_id:{
        type:String, //mongoose.Schema.Types.ObjectId
        required:true
    },
    sc_address:{
        type:String,
        required:true
    },
    agree:[
        [Number]
    ],
    disagree:[
        [Number]
    ]
    
});

module.exports=mongoose.model('proposals',ProposalSchema);