import React from 'react';
import { ethers } from "ethers";


// Exports a connectMetamask button
// Sets user current address to the address variable

export default function connectMetamask(){
    const [address, setAddress] = React.useState('');

    async function  handleClick() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const a = await signer.getAddress();
        setAddress(a);
      }

    return(
        <div className='MetamaskButton'>
        <div>
        <button type="button" onClick={handleClick}>Connect Metamask</button>
        </div>
        </div>
    );

}