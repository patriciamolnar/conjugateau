import { NavLink } from 'react-router-dom';

function SecondaryNav({ uri, uriStarred, title }) {
  return (
    <div>  
        <div className="secondary-nav">
            <NavLink exact to={uri} activeClassName="active">All Words</NavLink> 
            <NavLink to={uriStarred} activeClassName="active">Saved Words</NavLink>
        </div>
        <h2>{title}</h2>
    </div>
  )
}

export default SecondaryNav