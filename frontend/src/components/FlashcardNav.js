import { NavLink } from 'react-router-dom';

function FlashcardNav() {
  return (
    <>  
        <h2>Practice with Flashcards</h2>
        <div className="secondary-nav">
            <NavLink exact to="/" activeClassName="active">All Words</NavLink> 
            <NavLink to="/starred" activeClassName="active">Saved Words</NavLink>
        </div>

    </>
  )
}

export default FlashcardNav