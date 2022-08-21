import React, { useState, useContext } from 'react'
import proposalContext from '../context/context'
import { useNavigate } from "react-router-dom";
// protocol
const CreateProposal = (props) => {
  let navigate = useNavigate();
  // useEffect(() => {
  //   if (props.tokens < props.min_tokens) {
  //     //getApplproposals();
  //   }
  //   else {
  //     window.alert("You don't have sufficient tokens to create a proposal.")
  //     history.push("/protocol");
  //   }
  // }, [])
  const { addProposal } = useContext(proposalContext);
  const [proposal, setProposal] = useState({ id: 0, title: "", description: "", start_time: "", end_time: "", voting_type: "", min_tokens_to_vote: 0 })

  const handleClick = async (e) => {
    e.preventDefault(); //to prevent page reload upon submitting
    addProposal(proposal.id, proposal.title, proposal.description, proposal.start_time, proposal.end_time, proposal.voting_type, proposal.min_tokens_to_vote, props.protocol);
    setProposal({ id: 0, title: "", description: "", start_time: "", end_time: "", voting_type: "", min_tokens_to_vote: 0 });
    // navigate("/");
  }
  const handleOnChange = (e) => {
    setProposal({ ...proposal, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="container">
        <h1>Create a new Proposal:</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="id" className="form-label">Proposal ID</label>
            <textarea className="form-control" id="id" name="id" rows="1" value={proposal.id} onChange={handleOnChange}  ></textarea>

            <label htmlFor="title" className="form-label">Title</label>
            <textarea className="form-control" id="title" name="title" rows="1" value={proposal.title} onChange={handleOnChange}  ></textarea>

            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" value={proposal.description} rows="4" onChange={handleOnChange} placeholder="Enter Text" minLength={3} required></textarea>

            <label htmlFor="start_time" className="form-label">Start Time</label>
            <input type="date" className="form-control" id="start_time" onChange={handleOnChange} name="start_time" value={proposal.start_time} />

            <label htmlFor="end_time" className="form-label">End Time</label>
            <input type="date" className="form-control" id="end_time" onChange={handleOnChange} name="end_time" value={proposal.end_time} />

            <label htmlFor="voting_type" className="form-label">Voting Type</label>
            <textarea className="form-control" id="voting_type" name="voting_type" value={proposal.voting_type} rows="4" onChange={handleOnChange} placeholder="Enter Text" required></textarea>

            <label htmlFor="min_tokens_to_vote" className="form-label">Minimum tokens to Vote</label>
            <input type="min_tokens_to_vote" className="form-control" id="min_tokens_to_vote" onChange={handleOnChange} name="min_tokens_to_vote" value={proposal.min_tokens_to_vote} />

          </div>
          <div className="my-2">
            <button disabled={proposal.title.length < 1 || proposal.description.length < 3 ? true : false} type="submit" className="btn btn-primary" onClick={handleClick}>Add Proposal</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProposal
