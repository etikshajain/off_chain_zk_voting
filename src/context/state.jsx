import context from "./context"
import React, { useState } from "react"
import { ethers } from "ethers";
import proposals_abi from '../utils/proposals.json';
import Deploy from '../components/deploy'
// import generateProof from '../components/generateProof'
var axios = require('axios');
const host="http://localhost:5000";
// const CONTRACT_ADDRESS = "0x5446Fc945E3F01f202CdD32Dd2f2AbB597725f8A";

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

const setupEventListener = async (sc_address, abi) => {
  try {
    const connectedContract = await getContract(sc_address, abi);
    //do something
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
  };
  const res = await axios(config);
  console.log(res.data);
  return res.data
}

const askContractToAddHash = async (sc_address, abi, hash) => {
  try {
    const connectedContract = await getContract(sc_address, abi);
    window.alert("Going to pop wallet now to pay gas...")
    let nftTxn = await connectedContract.set_CID(hash);
    window.alert("Creating proposal...please wait.")
    await nftTxn.wait();
    console.log(nftTxn);
  } catch (error) {
    console.log(error)
  }
}

const askContractToAddkeys = async (sc_address, abi, pub, priv) => {
  try {
    const connectedContract = await getContract(sc_address, abi);
    window.alert("Going to pop wallet now to pay gas...")
    let nftTxn = await connectedContract.setKeys(pub, priv);
    window.alert("Generating Keys...please wait.")
    await nftTxn.wait();
    console.log(nftTxn);
  } catch (error) {
    console.log(error)
  }
}

const askContractToAddVoter = async (sc_address, abi) => {
    try {
      const connectedContract = await getContract(sc_address, abi);
      window.alert("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.updateVote();
      window.alert("Registering Vote...please wait.")
      await nftTxn.wait();
      console.log(nftTxn);
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToAddZKPhash = async (sc_address, abi, zkphash) => {
    try {
      const connectedContract = await getContract(sc_address, abi);
      window.alert("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.submitZKHash(zkphash);
      window.alert("Adding Hash to SC..please wait.")
      await nftTxn.wait();
      console.log(nftTxn);
    } catch (error) {
      console.log(error)
    }
  }

  // const askContractToFetchVoters = async (protocol, proposal_id) => {
  //   try {
  //     const { ethereum } = window;
  
  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, proposals_abi.abi, signer);
  //       console.log(connectedContract)
  
  //       console.log("Getting Voters List.")
  //       let nftTxn = await connectedContract.get_voters(proposal_id);
  
  //       console.log(nftTxn)
  //       console.log("Fetched.")
  //       return nftTxn
  //     } else {
  //       window.alert("Ethereum object doesn't exist!");
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

const ProposalState = (props) => {

  const [proposals, setProposals] = useState([]);
  const [tokens, setTokens] = useState(5);
  const [currentAccount, setCurrentAccount] = useState("");

  const getTokens = async (protocol) => {
    try {
      //fetch tokens of protocol name
      setTokens(5);
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

      // setupEventListener()
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
      // setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  //getALL props:
  const getAllProposals = async (protocol_name) => {
    // fetch address and abis from mongodb:
    const response = await fetch(`${host}/api/proposal/fetchallproposals/${protocol_name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // json is list of addresses and abis of smart contracts of proposals of 'protocol_name'
    const json= await response.json(); 
    console.log(json)

    let protocol_props = []

    for(let i=0;i<json.length;i++){
      let add = json[i].address
      let abi = json[i].abi
      let contract = await getContract(add, abi)
      let hash = await contract.proposal_CID;
      let prop = await get(hash)
      protocol_props.push(prop)
    }
    //adding in front end
    setProposals(protocol_props);
  }

  // add a proposal 
  const addProposal = async (title, description, start_time, end_time, voting_type, protocol) => {

    //deploy sc based on protocol name:
    let sc_address = Deploy()
    let abi = proposals_abi.abi
    
    //add to mongodb:
    const response = await fetch(`${host}/api/proposal/createprop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"sc_address":sc_address, "protocol":protocol, "abi":abi }) 
    });
    const json= await response.json();
    console.log(json) 

    let mongo_prop_id = json._id
    let data = {
      "title": title,
      "description": description,
      "start_time": start_time,
      "end_time":end_time,
      "voting_type": voting_type,
      "mongo_id": mongo_prop_id,
      "protocol": protocol,
      "sc_address":sc_address,
      "keys":"publickey:privatekey"
    }

    // add to ipfs and get hash
    let hash = await upload(data)
    console.log("hash:")
    console.log(hash)

    //add hash to smart contract
    await askContractToAddHash(sc_address, abi, hash);

    //add encrypted keys to smart contract
    let publickey_encrypt = "public_key"
    let privatekey_encypt = "private_key"
    await askContractToAddkeys(sc_address, abi, publickey_encrypt, privatekey_encypt)

    //adding in front end
    await getAllProposals(protocol);
  }

  const checkVoter = async (sc_address, abi) => {

    let contract = await getContract(sc_address, abi)
    let has_voted = await contract.checkVoted()
    return has_voted;

    // await getAllProposals(protocol);
  }

  // const getVoterslist = async (protocol, proposal_id) => {

  //   let voters_list = await askContractToFetchVoters(protocol, proposal_id)
  //   console.log("voters_list:")
  //   console.log(voters_list)
  //   if(voters_list===undefined){
  //     return []
  //   }
  //   return voters_list;
  // }

  //option_id=0 for agress, 1 for disagree
  const getZKP = async(option_id) => {
    window.alert("Generating ZKP.. Please wait.")
    // const {proof, signals} = await generateProof(option_id);
    return [0,1,2];
  }

  //return to frontend: zkp, hash of zkp
  const registerVote = async (sc_address, abi, proposal_mongo_id, option_id) => {

    //generate zkp
    let zkp = await getZKP(option_id)
    console.log(zkp)

    //encrypt zkp with priv key
    //tbd

    //add encrypted zkp to mongodb
    const response = await fetch(`${host}/api/proposal/vote/${proposal_mongo_id}/${option_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"proof":zkp }) 
    });
    console.log(response)

    //add voter to sc:
    let txn = await askContractToAddVoter(sc_address, abi);
    console.log(txn)

    //add hash of zkp to sc:
    //tbd
    let zkphash = zkp
    let txn_hash = await askContractToAddZKPhash(sc_address, abi, zkphash);
    console.log(txn_hash)
  }


  return (
    <context.Provider value={{ proposals, getAllProposals, addProposal, currentAccount, checkIfWalletIsConnected, connectWallet, tokens, getTokens, checkVoter, registerVote }}>
      {props.children}
    </context.Provider>
  );
}

export default ProposalState;