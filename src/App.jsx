import './styles/App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Switch } from "react-router";

import ProposalState from './context/state';
// import Navbar from './components/Navbar';
import Home from './components/Home';
// import About from './components/About';
import CreateProposal from './components/createProposal';
import Protocol from './components/Protocol';
import Protocols from './components/Protocols';
import Navbar from './components/Navbar';


function App() {
  return (
    <ProposalState>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/protocol" element={<Protocol protocol={"protocol"}  min_tokens_to_create={2} />} />
          <Route exact path="/createprop" element={<CreateProposal protocol={"protocol"} />} />
          <Route exact path="/protocols" element={<Protocols />} />
        </Routes>
      </div>
    </ProposalState>
  );
}

export default App;
