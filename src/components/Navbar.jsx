import React,{useEffect,useState,useContext} from 'react'
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router,Link,useLocation} from "react-router-dom";
import proposalContext from '../context/context'

const Navbar = props => {
    const { currentAccount, checkIfWalletIsConnected, connectWallet } = useContext(proposalContext);
    useEffect(() => {
        checkIfWalletIsConnected();
      }, [])
    
    // Setup our listener for contract events.
    const setupEventListener = async () => {
    }
    const nav_style={
        backgroundColor:"#fce4d8",
        textAlign:"center", 
        paddingLeft:"70px", 
        paddingRight:"70px",
        paddingBottom:"0px",
        /* identical to box height */
        textTransform: "uppercase",
        color: "#000000",
    }
    return (<>
        <nav class="navbar navbar-expand-lg" style={nav_style}>
            <div class="container-fluid">
                <a href="#"><Link to="/" className="navbar-brand nav-text">SENTENTIA</Link></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <form class="d-flex" role="search">
                    <a class="btn btn-outline-dark nav-btn" href="https://www.notion.so/Steps-to-generate-the-ZKProof-bd3a369883d54edaab5804a0592b4da2" target="_blank" download="">Instructions to Vote</a>
                    {/* <button class="btn btn-outline-dark nav-btn" type="submit" onClick={connectWallet}>Connect Wallet</button> */}
                </form>
                <form class="d-flex" role="search">
                    <button class="btn btn-outline-dark nav-btn" type="submit" onClick={connectWallet}>Connect Wallet</button>
                </form>
            </div>
        </nav>
        <hr style={{backgroundColor:"#191644",textAlign:"center",height:"2px"}} />
        </>
    )
}

export default Navbar
