import context from "./context"
import React, { useState } from "react"
import { ethers } from "ethers";
import proposals_abi from '../utils/proposals.json';
import Deploy from '../components/deploy'
// import generateProof from '../components/generateProof'
var axios = require('axios');
const host="http://localhost:5000";
const CONTRACT_ADDRESS = "0x5446Fc945E3F01f202CdD32Dd2f2AbB597725f8A";

const getContract = async (address, abi) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(address, abi, signer);
      console.log(connectedContract)
      return connectedContract;

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

const setupEventListener = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, proposals_abi.abi, signer);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

const askContractToAddHash = async (hash) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, proposals_abi.abi, signer);
      console.log(connectedContract)
      window.alert("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.addHash(hash);

      window.alert("Creating proposal...please wait.")
      await nftTxn.wait();
      console.log("hey")
      console.log(nftTxn);
      // window.alert(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      askContractToFetchHashList()

    } else {
      window.alert("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

const askContractToFetchHashList = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, proposals_abi.abi, signer);

      console.log("Fetching proposals list")
      let nftTxn = await connectedContract.get_protocol();

      // window.alert("Done")
      console.log(nftTxn)
      return nftTxn


    } else {
      window.alert("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

const askContractToAddVoter = async (protocol, proposal_id) => {
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, proposals_abi.abi, signer);
        console.log(connectedContract)
  
        console.log("Registering your vote..Please wait")
        console.log(proposal_id)
        let nftTxn = await connectedContract.vote(proposal_id);
        await nftTxn.wait();
  
        console.log(nftTxn)
        window.alert("Vote Registered")
        return nftTxn
      } else {
        window.alert("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToFetchVoters = async (protocol, proposal_id) => {
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, proposals_abi.abi, signer);
        console.log(connectedContract)
  
        console.log("Getting Voters List.")
        let nftTxn = await connectedContract.get_voters(proposal_id);
  
        console.log(nftTxn)
        console.log("Fetched.")
        return nftTxn
      } else {
        window.alert("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

async function upload(json) {
  var data = JSON.stringify({
    "pinataOptions": {
      "cidVersion": 1
    },
    "pinataMetadata": {
      "name": "off_chain_zk_voting",
      "keyvalues": json
    },
    "pinataContent":json
  });
  var config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNWM2ZDhiNS03NmYwLTRjNTUtOTY0NC1kOTIzNmMwZTVjNTgiLCJlbWFpbCI6ImphaW5ldGlrc2hhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjYjk5ZjRhOGU2ZGIzM2I2YTA5OCIsInNjb3BlZEtleVNlY3JldCI6ImFjNjJhOTQ5NzRlYTcwMTc0Zjg4YzQwYTRhM2UzMTRkOWY1YzU0NGVhNjIwNzMzZjY4NTcwODBlZDQzZjFhMWYiLCJpYXQiOjE2NjExMDM5OTR9.GKLNPCS88TmAynM3q08Ib4U7f83ttUnBl6veZdicxC8'
    },
    data : data
  };
  try {
    const res = await axios(config);
    let hash = res.data.IpfsHash
    console.log(res.id);
    return hash
  } catch (error) {
    console.log(error.response)
  }
}

async function get(hash) {
  var config = {
    method: 'get',
    url: 'https://gateway.pinata.cloud/ipfs/' + hash
    // headers: { 
    //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNWM2ZDhiNS03NmYwLTRjNTUtOTY0NC1kOTIzNmMwZTVjNTgiLCJlbWFpbCI6ImphaW5ldGlrc2hhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhYzAzMDdhMGU5YTZkYzZmMjRiZSIsInNjb3BlZEtleVNlY3JldCI6Ijk3NmQ1MzYwMWQzNDZhY2QwZTA0Y2Y3YmE4NGQyOTcwNDM2OGQyM2M4OWFlMGYzYWZhNzNlNmU1ODNmZGFiZWUiLCJpYXQiOjE2NjA5NzYyMDN9.JJ5Al7boFcZkV0KrLcEGrMwIc8L6k-GvgxqwPVfNef0'
    // }
  };
  const res = await axios(config);
  // let json = res.data.rows[0].metadata.keyvalues
  console.log(res.data);
  return res.data
}

const ProposalState = (props) => {

  const [proposals, setProposals] = useState([]);
  const [tokens, setTokens] = useState(5);
  const [currentAccount, setCurrentAccount] = useState("");

  const getTokens = async () => {
    try {
      setTokens(5);
      setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      window.alert("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)

      setupEventListener()
    } else {
      window.alert("No authorized account found")
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  //getALL props:
  const getAllProposals = async (protocol_name) => {
    // get hash list of protocol_name from smart contract
    console.log('1')
    console.log('2')
    let hash_list = await askContractToFetchHashList()
    let props_list = []

    //get proposal object from ipfs for each cid
    for(let i=0;i<hash_list.length;i++){
      let hash = hash_list[i]
      let prop = await get(hash)
      props_list.push(prop)
    }
    console.log('proposals list:')
    console.log(hash_list)
    console.log(props_list)

    //adding in front end
    setProposals(props_list);
  }

  // add a proposal 
  const addProposal = async (id, title, description, start_time, end_time, voting_type, min_tokens_to_vote, protocol) => {
    
    //add to mongodb:
    const response = await fetch(`${host}/api/proposal/createprop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"proposal_id":id, sc_address:"address" }) 
    });
    const json= await response.json();
    console.log(json) 

    let mongo_prop_id = json._id
    let data = {
      "id": id,
      "title": title,
      "description": description,
      "start_time": start_time,
      "end_time": end_time,
      "voting_type": voting_type,
      "min_tokens_to_vote": min_tokens_to_vote,
      "mongo_id": mongo_prop_id,
      "protocol": protocol,
      // "sc_address":"address"
      // "public_key":"pubkey",
      // "private_key":"priv"
    }

    // add to ipfs and get hash
    let hash = await upload(data)
    console.log("hash:")
    console.log(hash)

    //add hash to smart contract in protocol name list**
    await askContractToAddHash(hash);

    //adding in front end
    await getAllProposals(protocol);
  }

  const checkVoter = async (protocol, proposal_id, address) => {

    let voters_list = await askContractToFetchVoters(protocol, proposal_id)
    console.log("check voter:")
    console.log(voters_list)

    //check double voting
    if(voters_list===undefined || voters_list===[]){
      return false;
    }
    for(let i=0;i<voters_list.length;i++){
      console.log(voters_list[i])
      console.log(address)
      if(voters_list[i].toLowerCase()===address.toLowerCase()){
        return true;
      }
    }
    return false;

    // await getAllProposals(protocol);
  }

  const getVoterslist = async (protocol, proposal_id) => {

    let voters_list = await askContractToFetchVoters(protocol, proposal_id)
    console.log("voters_list:")
    console.log(voters_list)
    if(voters_list===undefined){
      return []
    }
    return voters_list;

    // await getAllProposals(protocol);
  }

  //option_id=0 for agress, 1 for disagree
  const getZKP = async(option_id) => {
    // const {proof, signals} = await generateProof(option_id);
    return [0,1,2];
  }

  //return to frontend: zkp, hash of zkp
  const registerVote = async (protocol, proposal_id, proposal_mongo_id, option_id) => {

    //generate zkp
    let zkp = await getZKP(option_id)
    console.log(zkp)

    //encrypt zkp with priv key
    //tbd

    //add zk proof to mongodb
    let prop_id = proposal_mongo_id
    const response = await fetch(`${host}/api/proposal/vote/${prop_id}/${option_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"proof":zkp }) 
    });
    console.log(response)

    //add voter to sc:
    let txn = await askContractToAddVoter(protocol, proposal_id);
    console.log(txn)

    //add hash of zkp to sc:
    //tbd
  }


  return (
    <context.Provider value={{ proposals, getAllProposals, addProposal, currentAccount, checkIfWalletIsConnected, connectWallet, tokens, getTokens, checkVoter, getVoterslist, registerVote }}>
      {props.children}
    </context.Provider>
  );
}

export default ProposalState;