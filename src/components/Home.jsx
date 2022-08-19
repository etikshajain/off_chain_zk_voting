import '../styles/App.css';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import myEpicNft from '../utils/MyEpicNFT.json';

const CONTRACT_ADDRESS = "0xE4e215EC17273f78D162f37449De5E6fffD314fB";

const Home = () => {
  let location = useLocation();
  useEffect(() => {
    //console.log(location.pathname);
  }, [location]);

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

      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
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

  // Setup our listener for contract events.
  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        // This will essentially "capture" our event when our contract throws it.
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          console.log(`Event emitted`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Call smart contract methods
  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT();

        window.alert("Mining...please wait.")
        await nftTxn.wait();
        console.log(nftTxn);
        window.alert(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  // the current account is updated after every render
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const renderUI = () => (
    <div align="center">
      <a className={location.pathname === "/protocol" ? "active" : ""}><Link to="/protocol" className="cta-button connect-wallet-button">Protocol</Link></a>
    </div>
    // <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
    //   Quickswap
    // </button>
  )

  return (
    <div className="Home">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Voting System</p>
          <p className="sub-text">
            Completely decentralised off chain voting system.
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : renderUI()}
        </div>
        <div className="footer-container">
        </div>
      </div>
    </div>
  );
};

export default Home;