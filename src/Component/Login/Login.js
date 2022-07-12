import React from 'react' ; 
import {useNavigate} from 'react-router-dom';


export default function Login() {

    // navigate hooks

    let navigate = useNavigate() ; 

    // Function -> for setcookie

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // Function -> LoginButton function

    const Login_button = async () =>{
        
        let LoginEmailaddress = document.getElementById("exampleInputEmail").value ; 
        let LoginPasword = document.getElementById("exampleInputPassword").value ;

        if (LoginEmailaddress === ""){
            alert("Please, Enter emailaddress") ; 
        }
        else if (LoginPasword === ""){
            alert("Please, Enter password") ; 
        }
        else{
            
            // Request -> LoginUser

            let BaseURL = "http://localhost:5000/api/login_user" ; 

            let RequestOption = {
                method : "POST",
                headers : { 
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                   'Email' : LoginEmailaddress,
                   'Password' : LoginPasword
                })
            } ; 

            const response = await fetch(BaseURL, RequestOption) ; 
            const response_data = await response.json() ; 

            if (response_data.Status == "Match Password"){

                // set useremail information cookie               

                setCookie("useremail", LoginEmailaddress,1);
                 
                navigate('/search') ; 
                
            }
            else if (response_data.Status == "Invaild Password"){
                alert("Invaild Password") ; 
            }
            else if (response_data.Status == "This emailaddress is not register"){
                alert("This emailaddress not register with any any account") ; 
            }
            else{
                alert(response_data.Status) ; 
            }
                
            
        }
        
    }

    // --- Login element widget css --- // 

    let LoginDivisionStyle = {
        "width" : "100%" ,
        "display" : "flex" , 
        "textAlign": "center",
        "justifyContent" : "center",
        'paddingTop' : '80px'
    } ;

    let LoginStyle = {
        "width" : "40%" ,
        "margin" : "auto",
        "textAlign" : "left"
    } ; 
    
    let LoginTitle = {
        "fontSize": "20px" , 
        "width" : "100%" , 
        "textAlign" : "center", 
        "justifyContent" : "center",
        'marginTop' : "10px",
        'marginBottom' : '18px'
    }

    let LoginButtonDivision_css = {
        'width' : '100%', 
        'textAlign': 'center',
        'justifyContent': 'center',
        'marginTop' : '20px'
    }

    let InputPasswordLabel_css = {
        'marginTop' : '16px'
    }

    return (
    <>
    <div className='LoginDivision' style={LoginDivisionStyle}>
        
        <div className='Login' style={LoginStyle}>

            <div className='Login_title' style={LoginTitle}>Login</div>
    
            <label forlabel="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"/>
        
            <label forlabel="exampleInputEmail1" className="form-label" style={InputPasswordLabel_css} >Password</label>
            <input type="password" className="form-control" id="exampleInputPassword" aria-describedby="emailHelp"/>
           
            <div className='LoginButton_division' style={LoginButtonDivision_css}>
                <button type="button" className="btn btn-primary" onClick={Login_button}>Login</button>
            </div>

        </div>
    
    </div>
    </>
  )
}
