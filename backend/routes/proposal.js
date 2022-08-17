const express=require('express');
const router=express.Router();

//express validator
const { body, validationResult } = require('express-validator');

const Proposals = require('../models/Proposal');
const Options = require('../models/Option');

//fetch all proposals: GET: /api/proposal/fetchallproposals
router.get('/fetchallproposals',async (req,res)=>{
    try {
        const proposals=await Proposals.find({});  //fetching all notes 
        return res.json(proposals);
    } catch (error) {
        return res.status(500).send("Some error occured.");
    }
});

//fetch all options of a proposal: GET: /api/proposal/fetchoptions
router.get('/fetchoptions/:id',async (req,res)=>{
    try {
        let proposal=await Proposals.findById(req.params.id);
        let options_ids = proposal.options
        options=[]
        for(let i=0;i<options_ids.length;i++){
            options.push(await Options.findById(options_ids[i]))
        }
        return res.json(options);
    } catch (error) {
        return res.status(500).send("Some error occured.");
    }
});

//Credit distribution over multiple options?---laterr
//check already voted state update
//check proposal status state update
//results of prop state update

//vote on a proposal: PUT: /api/proposal/vote -connect wallet reqq, min tokens condition req
router.put('/vote/:id_prop/:id_option',async (req,res)=>{
        const address=req.header('account');
        //check whether the account has min number of tokens
        const tokens=req.header('tokens');
        let proposal=await Proposals.findById(req.params.id_prop);

        //check that the user is connected and can vote:
        if(address=='0x0' || parseInt(tokens)<proposal.min_tokens_to_vote){
            return res.status(401).json({"error":"Authentication error"});
        }

        //check whether the proposal is active
        else if(Date.now()<proposal.start_time || Date.now>proposal.end_time){
            return res.status(401).json({"error":"This proposal is closed."});
        }

        //check that the option has the right proposal id:
        let option_chosen=await Options.findById(req.params.id_option)
        if(req.params.id_prop!=option_chosen.proposal_id){
            return res.status(401).json({"error":"Please vote for the right proposal"});
        }
        else{
            //getting the number of credits depending upon voting type:
            let credits=0
            if(proposal.voting_type=='SingleChoice'){
                credits=parseInt(tokens)
            }
            else{
                credits=parseInt(tokens)
            }
            //check double vote:
            for(let i=0;i<proposal.voters.length;i++){
                if(proposal.voters[i]==address){
                    return res.status(401).send("You have already voted.");
                }
            }
            //increment count
            new_total_count = parseInt(proposal.count)
            new_total_count += credits
            //add voter
            new_voters_total = proposal.voters
            new_voters_total.push(address)

            prop=await Proposals.findByIdAndUpdate(req.params.id_prop,{count:new_total_count, voters:new_voters_total})

            //get the option and register vote on option:
            new_count = parseInt(option_chosen.count)+credits
            new_voters=option_chosen.voters
            new_voters.push(address)
            opt=await Options.findByIdAndUpdate(req.params.id_option,{count:new_count, voters:new_voters})

            return res.send(opt);
        }
});

// fetch all voters: GET: /api/proposal/fetchvoters 
router.get('/fetchvoters/:id',async (req,res)=>{
    try {
        const proposal=await Proposals.findById(req.params.id); 
        return res.send(proposal.voters);
    } catch (error) {
        return res.status(500).send("Some error occured.");
    }
});

//adding a new proposal: POST: /api/proposal/create  --login reqq
router.post('/createprop',[
    body('title','Enter a valid title!').isLength({ min: 3 }),
    body('description','Enter a valid description!').isLength({ min: 5 })],
    async (req,res)=>{

    //if there are errorrs return errors array object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const min_tokens_to_create = 10
        const address=req.header('account');
        //check whether the account has those tokens
        const tokens=req.header('tokens');

        //check that the user is connected and can create:
        if(address=='0x0' || parseInt(tokens)<parseInt(min_tokens_to_create)){
            return res.status(401).json({"error":"Not sufficient tokens"});
        }
        //creating new note object:
        prop=await Proposals.create({
            proposal_id:req.body.proposal_id,
            title: req.body.title,
            description: req.body.description,
            start_time:req.body.start_time,
            end_time:req.body.end_time,
            voting_type:req.body.voting_type,
            min_tokens_to_vote:req.body.min_tokens_to_vote
        });
        return res.json(prop);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Some error occured.");
    }
});

//adding options to a proposal: POST: /api/proposal/addoptions  --login reqq
router.post('/addoptions/:id',[
    body('title','Enter a valid title!').isLength({ min: 3 }),
    body('description','Enter a valid description!').isLength({ min: 5 })],
    async (req,res)=>{

    //if there are errorrs return errors array object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const min_tokens_to_create = 10
        const address=req.header('account');
        //check whether the account has those tokens
        const tokens=req.header('tokens'); 

        //check that the user is connected and can add options:
        if(address=='0x0' || parseInt(tokens)<parseInt(min_tokens_to_create)){
            return res.status(401).json({"error":"Not sufficient tokens"});
        }
        proposal = await Proposals.findById(req.params.id)
        //check whether the proposal is active
        if(Date.now()>=proposal.start_time && Date.now<=proposal.end_time){
            return res.status(401).json({"error":"This proposal is active, changes cannot be made."});
        }

        //creating new option object:
        opt=await Options.create({
            option_id:req.body.option_id,
            proposal_id:req.params.id,
            title: req.body.title,
            description: req.body.description
        });

        //adding option id to proposal:
        new_opts=proposal.options
        new_opts.push(opt.id)

        prop=await Proposals.findByIdAndUpdate(req.params.id,{options:new_opts})
        return res.json(opt);
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