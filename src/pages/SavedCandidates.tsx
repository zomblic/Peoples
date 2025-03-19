import type { Candidate } from '../interfaces/Candidate.interface';


const SavedCandidates = ({ savedCandidates }: { savedCandidates: Candidate[] }) => {
  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <div key={candidate.login}>
            <h2>{candidate.login}</h2>
            <img src={candidate.avatar_url} alt={candidate.login} />
          </div>
        ))
      ) : (
        <p>No saved candidates yet.</p>
      )}
    </>
  );
}

export default SavedCandidates;