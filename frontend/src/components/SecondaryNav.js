function SecondaryNav({ practiceSaved, setPractiveSaved }) {
  return (
    <div className="secondary-nav">
      <button className={practiceSaved === false ? 'active' : ''} 
      onClick={() => setPractiveSaved(false)} type="button">All Words</button>
      <button className={practiceSaved ? 'active' : ''} onClick={() => setPractiveSaved(true)} type="button">Saved Words</button>
    </div>
  )
}

export default SecondaryNav;