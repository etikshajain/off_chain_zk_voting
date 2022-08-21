const mongoose=require('mongoose');

const ProposalSchema=new mongoose.Schema({
    sc_address:{
        type:String,
        required:true
    },
    abi:{
        type:String,
        required:true
    },
    protocol:{
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