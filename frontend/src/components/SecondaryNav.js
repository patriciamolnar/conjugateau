function SecondaryNav({ practiceSaved, setPractiveSaved }) {
  return (
    <div className="secondary-nav">
      <button className={practiceSaved === false ? 'active' : ''} 
      onClick={() => setPractiveSaved(false)}>All Words</button>
      <button className={practiceSaved ? 'active' : ''} onClick={() => setPractiveSaved(true)}>Saved Words</button>
    </div>
  )
}

export default SecondaryNav;