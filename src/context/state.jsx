import context from "./context"
import React, { useState } from "react"

// const create = require("ipfs-http-client");
// let ipfs = await create({
//             host: "ipfs.infura.io",
//             port: 5001,
//             protocol: "https"});

const ProposalState = (props) => {
  let cid_list= []

  const [proposals, setProposals] = useState([]);

  //getALL props:
  const getAllProposals = async (protocol_name) => {
    // get cid list of protocol_name from smart contract

    //get proposal object from ipfs for each cid
    // for(let i=0;i<cid.length;i++){
    //   cid=cid_list[i]
    // }

    let json = [{
      "id": 1,
      "title": "proposal1",
      "description": "des1",
      "start_time": "2022-08-17",
      "end_time": "2022-08-23",
      "voting_type": "Quadratic",
      "count": 0,
      "min_tokens_to_vote": 1,
      "options": [1, 2],
      "protocol": "Quickswap"
    }, {
      "id": 2,
      "title": "proposal2",
      "description": "des2",
      "start_time": "2022-08-17",
      "end_time": "2022-08-23",
      "voting_type": "Quadratic",
      "count": 0,
      "min_tokens_to_vote": 1,
      "options": [1, 2, 3],
      "protocol": "Quickswap"
    }]

    //adding in front end
    setProposals(json);
  }

  // add a proposal 
  const addProposal = async (id, title, description, start_time, end_time, voting_type, min_tokens_to_vote, protocol) => {
    //create a mongodb proposal object with 2 fields: yes, no
    
    let options = ["proposal_mongo"]
    let data = {
      "id": id,
      "title": title,
      "description": description,
      "start_time": start_time,
      "end_time": end_time,
      "voting_type": voting_type,
      "count": 0,
      "min_tokens_to_vote": min_tokens_to_vote,
      "options": options,
      "protocol": protocol
    }
    // add to ipfs and get cid
    // let result = await ipfs.add(data);
    // console.log(result);
    let cid = 1

    //add cid to smart contract in protocol name list**
    cid_list.append(cid)

    //adding in front end
    getAllProposals(protocol);
  }


  return (
    <context.Provider value={{ proposals, getAllProposals, addProposal }}>
      {props.children}
    </context.Provider>
  );
}

export default ProposalState;