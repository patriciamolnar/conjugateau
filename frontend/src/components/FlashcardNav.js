import { NavLink } from 'react-router-dom';

function FlashcardNav() {
  return (
    <div>  
        <div className="secondary-nav">
            <NavLink exact to="/" activeClassName="active">All Words</NavLink> 
            <NavLink to="/starred" activeClassName="active">Saved Words</NavLink>
        </div>
        <h2>Practice with Flashcards</h2>
    </div>
  )
}

export default FlashcardNav