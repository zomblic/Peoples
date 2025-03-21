import type { Candidate } from '../interfaces/Candidate.interface';
import { useState, useEffect } from "react";


const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(candidates);
  }, []);

  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };
  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <article key={candidate.login}>
            <img src={candidate.avatar_url} alt="Candidate Avatar" />
            <h2>{candidate.name || candidate.login}</h2>
            <p>Location: {candidate.location || 'Where in the world is Carmen SanDiego?'}</p>
            <p>Email: {candidate.email || 'Not today!'}</p>
            <p>Company: {candidate.company || 'N/A'}</p>
            <p>Bio: {candidate.bio || 'work in progress'}</p>
            
            <button onClick={() => removeCandidate(candidate.login)}>Remove</button>
          </article>
          
        ))
      ) : (
        <p>No saved candidates yet.</p>
      )}
    </>
  );
}

export default SavedCandidates;