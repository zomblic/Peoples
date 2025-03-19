import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  //      variable | method to update the variable = hook( initial value )
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [singleCandidate, setSingleCandidate] = useState<Candidate>({
    login: "",
    avatar_url: "",
    html_url: "",
  });

  // store saved candidates w/ local storage
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const saved = localStorage.getItem('savedCandidates');
  if (saved) {
    setSavedCandidates(JSON.parse(saved));
    return saved ? JSON.parse(saved) : [];
  } else {
    setSavedCandidates([]);
  }

  //fetch candidates from API
  const fetchCandidates = async () => {
    const data: Array<any> = await searchGithub();
    const login = data.pop().login; // can be changed later
    setCandidates(data);

    const candidate = await searchGithubUser(login);
    setSingleCandidate(candidate);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);


  //update local storage
  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  //moving onto next candidate
  const nextCandidate = async () => {
    if (candidates.length > 0) {
      const nextLogin = candidates.pop()!.login;
      const nextCandidate = await searchGithubUser(nextLogin);
      setSingleCandidate(nextCandidate);
    } else {
      setSingleCandidate({
        login: "",
        avatar_url: "",
        html_url: "",
      });
    }
  };

//rejected
const rejected = () => {
  nextCandidate();
  setSavedCandidates(savedCandidates.filter((candidate) => candidate.login !== singleCandidate.login));
};
//accepted
const accepted = () => {
  if (!savedCandidates.some((c) => c.login === singleCandidate.login)) {
    setSavedCandidates([...savedCandidates, singleCandidate]);
  }
  nextCandidate();
  // use singleCandidate
};

return (
  <>
    <h1>CandidateSearch</h1>
    <article>
      <img src={singleCandidate.avatar_url} alt="" />
      <h2> {singleCandidate?.name || ''}      {singleCandidate.login}</h2>
      <p> Location: {singleCandidate?.location || 'Where in the world is Carmen SanDiego?'}</p>
      <p>Email: {singleCandidate?.email || 'Not today!'}  </p>
      <p> Company: {singleCandidate?.company || 'N/A'}</p>
      <p> Bio: {singleCandidate?.bio || 'work in progress'}</p>

    </article>

    <button type='button' title='Rejected Yo!' onClick={rejected}>-</button>

    <button type='button' title='Accepted Yo!' onClick={accepted}>+</button>
  </>
);
//  something, something, people here
}

export default CandidateSearch;