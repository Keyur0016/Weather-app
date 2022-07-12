import React from 'react' ; 
import {useNavigate} from 'react-router-dom' ;

export default function Signup() {

    const navigate = useNavigate() ; 

    // Function -> for setCookie

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // Function -> For Signup Button

    const  Signup_function = async () =>{

        let Emailaddress = document.getElementById("exampleInputEmail1").value ; 

        let Password = document.getElementById("exampleInputPassword1").value ; 
        
        let Re_password = document.getElementById("exampleInputPassword2").value ; 

        if (Emailaddress === ""){
            alert("Please, Enter emailaddress") ; 
        }
        else if (Password === ""){
            alert("Please, Enter Password") ; 
        }
        else if (Re_password === "") {
            alert("Please, Re-enter password") ; 
        }
        else if (Password !== Re_password){
            alert("Password and Re-enter password not match") ; 
        }
        else{
        
            //Request -> For newuser       
        
            let BaseURl = 'http://localhost:5000/api/new_user' ; 
            const requestOption = {
                method : 'POST', 
                headers : {
                    'Content-Type': 'application/json'
                } , 
                body: JSON.stringify({
                    'Email' : Emailaddress,
                    'Password' : Password
                })
            } ; 
            
            const response = await fetch(BaseURl , requestOption) ; 
            const response_data = await response.json() ; 

            if (response_data.Status == 'Find user'){
                
                alert("This Emailaddress already resgister") ; 

            } 

            else if (response_data.Status == 'Create user successfully'){
                
                // set useremail cookie           

                setCookie("useremail", Emailaddress,1);
                 
                navigate('/search') ; 
                  
            }

            else{
                alert(response_data.Status) ; 
            }
        }

    }
    
    // --- Signup element widget css --- // 
    
    let LoginDivisionStyle = {
        "width" : "100%" ,
        "display" : "flex" , 
        "textAlign": "center",
        "justifyContent" : "center",
        "paddingTop" : '80px'
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

        {/* Signup Division  */}
        
        <div className='Signup' style={LoginStyle}>

            <div className='Login_title' style={LoginTitle}>Signup</div>
             
            {/* Emailaddress input  */}

            <label forlabel="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" />
        
            {/* Password input  */}

            <label forlabel="exampleInputEmail1" className="form-label" style={InputPasswordLabel_css} >Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"/>
            
            {/* Confirm Password input  */}

            <label forlabel="exampleInputEmail1" className="form-label" style={InputPasswordLabel_css} >Re-enter Password</label>
            <input type="password" className="form-control" id="exampleInputPassword2" />
            
            {/* Signuo Button  */}

            <div className='LoginButton_division' style={LoginButtonDivision_css}>
                <button type="button" className="btn btn-primary" onClick={Signup_function}>Signup</button>
            </div>

        </div>
    
    </div>
    </> 
    )

    }