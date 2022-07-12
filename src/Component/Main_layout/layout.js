import React from 'react' ; 
import WeatherImage from '../../Image/Weather_image.jpg' ; 

export default function layout() {
  
  // Function -> getCookie function

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

  // Get Useremail cookie value

  let Useremail = getCookie("useremail") ; 
  
  // Function -> Conenct to account Button Function

  const Connect_to_account = () => {
    window.location.href = "/Search" ; 
  }

  // --- MainLayout element widget css --- // 

  let Weather_image_division_css = {
    'height' : '100vh',
    'width'  : '100%' ,
    'fontFamily' : 'Mukta,sansSerif',
    'textAlign' : 'center'
  } ; 

  let WeatherImage_css = {
    'width' : '100%', 
    'height': '100vh'
  }

  let WeatherTest_css = {
    'marginTop' : '-47vh',
    'fontSize' : '22px',
    'backgroundColor' : 'black',
    'color' : 'black'
  } ;

  let Connect_button_css = {
    marginTop: '30px'
  }
   
  return (
  <>
    <div className='Weather_image_layout' style={Weather_image_division_css} >

      {/* Weather image  */}

      <img className='Weather_image' src={WeatherImage} style={WeatherImage_css} />
      
      {/* Weather information text  */}

      <div className='Weather_information_text' style={WeatherTest_css}>Get your city weather information in few seconds</div>
      
      {/* Connect to account Button  */}

      {Useremail != "" ? <button type="button" class="btn btn-secondary" style={Connect_button_css} onClick={Connect_to_account}>Connect to account</button>:<></>}
    
    </div>
  </>
  )
}
