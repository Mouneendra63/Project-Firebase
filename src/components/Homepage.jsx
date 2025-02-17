import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

import {useFirebase} from '../context/firebase'
function HomaPage() {
    const firebase=useFirebase();
    const [user, setUser] = useState(null);
    useEffect(()=>
    {

    },[firebase.isLoggedIn])
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" style={{textDecoration:"none",fontFamily:"DM Serif Display"}} className="fs-2">WCM</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Action</a></li>
                <li><a className="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
         <div className="d-flex ms-2">
            {
                firebase.isLoggedIn  ? ( <button className="btn btn-primary me-2" onClick={()=>firebase.logout()}>Logout</button>) :(
                <div>
                    <Link to='/login'>
                        <button className="btn btn-primary me-2">Login</button> 
                    </Link>
                
                <Link to='/register'>
                <button className="btn btn-primary me-2">Sign Up</button> 
                </Link>
                </div>
            )
            }
            
         </div>
        </div>
      </div>
    </nav>
  );
}

export default HomaPage;