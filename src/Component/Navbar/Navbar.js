import React , {useEffect} from 'react'
import {Link, useLocation} from "react-router-dom" ; 

export default function Navbar(props) {
  
  // useLocation hook -> Return current location 

  let Location = useLocation() ; 
  
  useEffect(() => {
     console.log(Location) ; 
  }, [Location]);

  // Function -> Get cookie value

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  let Useremail = getCookie("useremail") ; 
  

  // --- Widget css --- //

  let FontColor = {
    "color" : "white"
  } ; 

  let emailInformationColor = {
    color : '#b0b0b0'
  }

  let Navbar_css = {
    'position' : 'fixed' ,
    'width' : '100vw' , 
    'height' : 'auto' 
  } ; 

    return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark" style={Navbar_css}>
      <div className="container-fluid">

        <Link className="navbar-brand" style={FontColor} to="/">{props.Navbarname}</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav" >

            <li className="nav-item" >
            
              {Location.pathname !== '/search' ? <Link className="nav-link active" aria-current="page" to="/Signup" style={FontColor}>{props.Option1}</Link>:<></>  }
            
            </li>

            <li className="nav-item">

              {Location.pathname !== "/search" ? <Link className="nav-link" to="/Login" style={FontColor}>{props.Option2}</Link>: <></> }
              
            </li>

          </ul>

        </div>

      </div>

    </nav>
    </>
  )
}
