import { Link } from 'react-router-dom';

function NoSavedWords({ url, setPractiveSaved }) {
  return (
    <main className="center default">
      <p>You have no saved words yet.</p>
      <Link exact to={url} onClick={() => setPractiveSaved(false)}>Practice All Words</Link>
  </main>
  )
}

export default NoSavedWords