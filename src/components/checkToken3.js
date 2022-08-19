// Token3 = AAVE Governance token check
import React from 'react';
import { ethers } from "ethers";


export default function checkAAVE(address,signer,provider) {
    abi =[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"_admin","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"initialize","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"initialize","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}] ;
    addressAAVE = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
    
    const [ hasToken3, sethasToken3 ] = React.useState(false);
    const [ amtToken3, setamtToken3 ] = React.useState(0);

    const AAVEContract = new ethers.Contract(addressAAVE, abi, signer);
    var balance = await AAVEContract.balanceOf(address.toString()); 
    var decimals = await AAVEContract.decimals();
    balance1 = ethers.utils.formatEther(balance);
    if( balance != 0  ){
        sethasToken3 = true;
        setamtToekn3 = balance1;
    }
    return amtToken3 ;
}

