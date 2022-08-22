const express=require('express');
const router=express.Router();

//express validator
const { body, validationResult } = require('express-validator');

const Proposals = require('../models/Proposal');
const Options = require('../models/Option');

//fetch all proposals: GET: /api/proposal/fetchallproposals
router.get('/fetchallproposals/:protocol',async (req,res)=>{
    try {
        req_adds=[]
        const proposals=await Proposals.find({});  //fetching all notes 
        // console.log(proposals)
        for(let i=0;i<proposals.length;i++){
            if(proposals[i].protocol==req.params.protocol){
                let json = {"address":proposals[i].sc_address, "abi":proposals[i].abi}
                console.log("json")
                req_adds.push(json)
            }
        }
        console.log(req_adds)
        return res.send(req_adds);
    } catch (error) {
        return res.status(500).send("Some error occured.");
    }
});


router.get('/fetchabi/:id',async (req,res)=>{
    try {
        let proposal=await Proposals.findById(req.params.id); 
        console.log("here")
        console.log(proposal)
        return res.send(proposal.abi)
    } catch (error) {
        return res.status(500).send("Some error occured.");
    }
});

//fetch all options of a proposal: GET: /api/proposal/fetchoptions
// router.get('/fetchoptions/:id',async (req,res)=>{
//     try {
//         let proposal=await Proposals.findById(req.params.id);
//         let options_ids = proposal.options
//         options=[]
//         for(let i=0;i<options_ids.length;i++){
//             options.push(await Options.findById(options_ids[i]))
//         }
//         return res.json(options);
//     } catch (error) {
//         return res.status(500).send("Some error occured.");
//     }
// });

//Credit distribution over multiple options?---laterr
//check already voted state update
//check proposal status state update
//results of prop state update

//vote on a proposal: PUT: /api/proposal/vote -connect wallet reqq, min tokens condition req
//id_option=0 for agree, 1 for disagree
router.put('/vote/:id_prop/:id_option',async (req,res)=>{
        let proposal=await Proposals.findById(req.params.id_prop);

        if(req.params.id_option==0){
            let zk_proofs = proposal.agree
            zk_proofs.push(req.body.proof)
            prop=await Proposals.findByIdAndUpdate(req.params.id_prop,{agree:zk_proofs})
            return res.send(prop)
        }
        else{
            let zk_proofs = proposal.disagree
            zk_proofs.push(req.body.proof)
            prop=await Proposals.findByIdAndUpdate(req.params.id_prop,{disagree:zk_proofs})
            return res.send(prop)
        }
});

// fetch all voters: GET: /api/proposal/fetchvoters 
// router.get('/fetchvoters/:id',async (req,res)=>{
//     try {
//         const proposal=await Proposals.findById(req.params.id); 
//         return res.send(proposal.voters);
//     } catch (error) {
//         return res.status(500).send("Some error occured.");
//     }
// });

//adding a new proposal: POST: /api/proposal/create  --login reqq
router.post('/createprop',
    async (req,res)=>{

    try{
        //creating new note object:
        prop=await Proposals.create({
            sc_address:req.body.sc_address,
            protocol:req.body.protocol,
            abi:req.body.abi
        });
        return res.json(prop)
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Some error occured.");
    }
});


// //ROUTE3: updating note: PUT: /api/notes/updatenote:id  --login reqq
// router.put('/updatenote/:id',
//     async (req,res)=>{

//     try{
    
//     const {title,description,ctc,deadline,location,role,cg,tenth,twelfth,branch}=req.body;
//     //creating new note object:
//     newNote={};
//     if(title){newNote.title=title;}
//     if(description){newNote.description=description;}
//     if(ctc){newNote.ctc=ctc;}
//     if(deadline){newNote.deadline=deadline;}
//     if(location){newNote.location=location;}
//     if(role){newNote.role=role;}
//     if(cg){newNote.cg=cg;}
//     if(tenth){newNote.tenth=tenth;}
//     if(twelfth){newNote.twelfth=twelfth;}
//     if(branch){newNote.branch=branch;}
    
//     //find the note to be updated and update it:
//     let note=await Notes.findById(req.params.id);

//     //check if note exists or not:
//     if(!note){
//         return res.status(404).send("Note not found");
//     }


//     //now note exists and user is corretc:
//     note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
//     res.json(note);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send("Some error occured.");
//     }
// });

// //ROUTE4: deleting a  note: DELETE: /api/notes/deletenote/:id  --login reqq
// router.delete('/deletenote/:id',
//     async (req,res)=>{

//     try{
    
//     //find the note to be deleted and delete it:
//     let note=await Notes.findById(req.params.id);
    
//     //check if note exists or not:
//     if(!note){
//         return res.status(404).send("Note not found");
//     }

//     //now note exists and user is corretc:
//     note=await Notes.findByIdAndDelete(req.params.id);
//     res.send({"Success":"Note deleted successfully",note:note});

//     // let user=await Users.findById(req.user.id);
//     // applnote=await user.appliedTo.findByIdAndDelete(req.params.id);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send("Some error occured.");
//     }
// });

module.exports=router;