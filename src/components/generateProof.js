import React, { useState } from "react";
const snarkjs = require("snarkjs");

const makeProof = async (_proofInput, _wasm, _zkey) => {
	const { proof, publicSignals } = await snarkjs.groth16.fullProve(_proofInput, _wasm, _zkey);
	return { proof, publicSignals };
};


export default function generateProof(a){
    const [proof, setProof] = useState("");
	const [signals, setSignals] = useState("");

    let wasmFile;
    let zkeyFile;
    let verificationKey;

    let proofInput = { a, 65 } ;

    ( p1, p2 ) = makeProof( proofInput, wasmFile, zkeyFile );
    setProof(p1);
    setSignals(p2);
    return { proof, signals }; 
}



