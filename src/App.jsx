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


function App() {
  return (
    <ProposalState>
      {/* <Alert msg="this is alert"/> */}
      {/* <Navbar/> */}
      {/* <div class="sidebar">
            <a class="active" href="#home">Home</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
      </div> */}
      {/*<Navbar />*/}
      <div className="content my-5">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/protocol" element={<Protocol protocol={"protocol"} tokens={5} min_tokens_to_create={2} />} />
          <Route exact path="/createprop" element={<CreateProposal protocol={"protocol"} />} />
        </Routes>
      </div>
    </ProposalState>
  );
}

export default App;
