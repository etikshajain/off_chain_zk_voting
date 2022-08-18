// All checkTokens.js files exports a function which check if 
// User has Governance tokens of a particular token
// And returns out the tokenBalance

// QUICKSWAP Governance token check
import React from 'react';
import { ethers } from "ethers";


export default function checkQuickswap(address,signer,provider) {
       
    const [ hasToken1, sethasToken1 ] = React.useState(false);
    const [ amtToken1, setamtToken1 ] = React.useState(0);
    
    


}