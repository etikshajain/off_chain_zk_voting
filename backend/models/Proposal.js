const mongoose=require('mongoose');

const ProposalSchema=new mongoose.Schema({
    sc_address:{
        type:String,
        required:true
    },
    abi:[
        Object
    ],
    protocol:{
        type:String,
        required:true
    },
    agree:[
        String
    ],
    disagree:[
        String
    ]
    
});

module.exports=mongoose.model('proposals',ProposalSchema);