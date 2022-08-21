import context from "./context"
import React, { useState } from "react"
import { ethers } from "ethers";
import proposals from '../utils/proposals.json';
var axios = require('axios');
const CONTRACT_ADDRESS = "0x45060bB9102527B4154De2E6a85c21cdaF1ef2f9";

const setupEventListener = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, proposals.abi, signer);

      // This will essentially "capture" our event when our contract throws it.
      // connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
      //   console.log(from, tokenId.toNumber())
      //   console.log(`Event emitted`)
      // });

      // console.log("Setup event listener!")

    } else {
      // console.log("Ethereum object doesn't exist!");
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
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, proposals.abi, signer);

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
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, proposals.abi, signer);

      console.log("Fetching proposals list")
      let nftTxn = await connectedContract.get_protocol();

      window.alert("Done")
      console.log(nftTxn)
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
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNWM2ZDhiNS03NmYwLTRjNTUtOTY0NC1kOTIzNmMwZTVjNTgiLCJlbWFpbCI6ImphaW5ldGlrc2hhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhYzAzMDdhMGU5YTZkYzZmMjRiZSIsInNjb3BlZEtleVNlY3JldCI6Ijk3NmQ1MzYwMWQzNDZhY2QwZTA0Y2Y3YmE4NGQyOTcwNDM2OGQyM2M4OWFlMGYzYWZhNzNlNmU1ODNmZGFiZWUiLCJpYXQiOjE2NjA5NzYyMDN9.JJ5Al7boFcZkV0KrLcEGrMwIc8L6k-GvgxqwPVfNef0'
    },
    data : data
  };
  const res = await axios(config);
  let hash = res.data.IpfsHash
  console.log(res.id);
  return hash
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
  const [currentAccount, setCurrentAccount] = useState("");

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

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
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
    //create a mongodb proposal object with 2 fields: yes, no
    
    let options = "proposal_mongo_id"
    let data = {
      "id": id,
      "title": title,
      "description": description,
      "start_time": start_time,
      "end_time": end_time,
      "voting_type": voting_type,
      "min_tokens_to_vote": min_tokens_to_vote,
      "options": options,
      "protocol": protocol
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


  return (
    <context.Provider value={{ proposals, getAllProposals, addProposal, currentAccount, checkIfWalletIsConnected, connectWallet }}>
      {props.children}
    </context.Provider>
  );
}

export default ProposalState;