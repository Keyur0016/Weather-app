import React, { useEffect, useState } from 'react' ; 
import CloudImage from './Cloud.jpg';

export default function Search() {
    
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

    // set Useremail cookie value 
     
    let User_email = getCookie("useremail") ; 

    // useState -> Store user searchHistory Data

    const [HistoryData, HistorydataUpdate] = useState([]) ; 

    useEffect(()=>{
      
      // Request -> For user searchHistory Data 

      let RequestOption = {
        method: "POST",
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({"Email": User_email})
      } ; 
      
      const fetchData = async () =>{

        let HistoryResponse = await fetch("http://localhost:5000/history/all", RequestOption) ; 
        let HistoryResponseJson = await HistoryResponse.json() ; 
        HistorydataUpdate(HistoryResponseJson["Status"]) ;
      }

      fetchData() ; 

    })
     
    // --- Search element widget css --- // 

    let Search_main_layout_css = {
      paddingTop : '80px',
      display: 'flex',
      textAlign : 'center',
      justifyContent: 'center'
    } ; 

    const [SearchLayoutCss, SearchlayoutUpdateCss] = useState(Search_main_layout_css) ; 

    let Search_division_css = {
      width : "65%",
      margin: "auto",
      textAlign: "center",
      justifyContent: "center"
    }

    let Search_input_button_css = {
      display: 'flex',
      textAlign : 'center' ,
      justifyContent : 'center',
      margin : 'auto',
      width: '100%',
      height: 'fitContent'
    }

    let Search_input_css = {
      justifyConten : 'left' ,
      width : '80%',
      margin : 'auto'
    }

    let Search_button_css = {
      margin : 'auto'
    }

    let Search_history_css = {
      width : '90%',
      height: '90px', 
      textAlign : "center",
      justifyContent : 'center',
      marginLeft : "auto",
      marginRight : "auto",
      marginTop : "20px"
    }

    let Search_history_title = {
      fontSize : '17px',
      color : '#0010ff'
    }

    let List_group_css = {
      marginTop: "20px",
      textAlign: "left",
      justifyContent: "left"
    }
    
    let Search_history_time = {
      color : '#868686'
    } ; 

    // --- ShowTemperature element widget css --- // 

    let Weather_information_main_division_css = {
      paddingTop : '80px',
      display: 'none',
      textAlign: 'center',
      justifyConten: 'center'
    }

    const [WeatherLayout , WeatherUpdateLayout] = useState(Weather_information_main_division_css) ; 

    let Weather_information = {
      width: '60%',
      height: '80vh',
      margin : 'auto',
      backgroundImage : `url(${CloudImage})`,
      backgroundRepeat : 'no-repeat',
      backgroundSize: '100%, 100%',
      textAlign: 'center',
      justifyContent: 'center'
    }

    let City_title = {
      width: '100%',
      textAlign: 'center',
      marginTop: '20px',
      color: 'white'
    }

    let Latitude_description_css = {
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      marginTop: '45px',
      paddingBottom: '15px'
    }

    let Latitude_css = {
      width: '30%',
      textAlign: 'left',
      justifyContent: 'left'
    }

    let Other_information_text = {
      fontSize : '15px',
      color: '#444444',
      paddingLeft: '6px'
    }

    let Other_information_division = {
      marginTop: '12px'
    }

    let Temperature = {
      marginTop: '16px'
    }

    let Search_again_button = {
      marginTop : '20px'
    }

    let Temperature_other_css = {
      textAlign: 'center',
      justifyContent: 'center'
   
    } ; 
    
    // --- All state --- //
   
   
    // 1. Latitude

    const [latitude, latitudeUpdate] = useState(0) ; 

    // 2. Longitude

    const [longitude, longitudeUpdate] = useState(0) ; 

    // 3. City 

    const [city, cityUpdate] = useState("Surat") ; 

    // 4. Weather information

    const [Weather, WeatherUpdate] = useState("Rain"); 
    
    // 5. Weather description 

    const [WeatherInformation, WeatherInformationUpdate] = useState("Havy rain") ; 

    // 6. Temperature

    const [temperature, temperatureUpdate] = useState(10) ; 

    // 7. Feel Temperature

    const [feeTemperature, feeTemperatureUpdate] = useState(10) ; 

    // 8. Minimum Temperature

    const [temperaturemin, temperatureminUpdate] = useState(10) ; 


    // Function -> Get Weather data from weather.com api

    const HistoryRequest = async (city_name) => {
         
      const WeatherRequestOption = {
        method : 'GET', 
      }

      let Weather_request_url =  `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=b9c20072402c0af624724b0100a94891` ; 
      
      let Weather_request = await fetch(Weather_request_url, WeatherRequestOption) ; 
      let Weather_request_response = await Weather_request.json() ; 

      SearchlayoutUpdateCss({
        display: 'none' 
      }) ; 

      WeatherUpdateLayout({
        display: 'flex',
        paddingTop: '80px'
      }) ; 

      cityUpdate(city_name) ; 

      latitudeUpdate(Weather_request_response['coord']['lat']) ; 

      longitudeUpdate(Weather_request_response['coord']['lon']) ;

      WeatherUpdate(Weather_request_response['weather'][0]['main']) ; 

      WeatherInformationUpdate(Weather_request_response['weather'][0]['description']);
      
      let Response_temperature = parseInt(Weather_request_response['main']['temp'] - 273.15) ; 
      temperatureUpdate(Response_temperature) ;

      let Feeltemperature = parseInt(Weather_request_response['min']['feels_like'] - 273.15) ; 
      feeTemperatureUpdate(Feeltemperature) ; 

      let MinTemperature = parseInt(Weather_request_response['min']['temp_min'] - 273.15) ; 
      temperatureminUpdate(MinTemperature) ; 

    } ; 

    // Function -> Search Button

    const Search_button = () =>{
      let Search_input = document.getElementById("exampleSearch").value ; 

      if (Search_input === ""){
        alert("Please, Enter search city name") ; 
      }
      else{
           
        // Insert history information in Database 

        const InserthistoryRequest_option = {
          method : "POST",
          headers: {
            'Content-Type' : 'application/json'
          }, 
          body : JSON.stringify({"Email":User_email,
          "History":Search_input })
        } ; 

        const MongoDbInsertHistory = async () => {
           
          let InsertHistory_request_url = 'http://localhost:5000/history/insert' ; 
          let InsertHistory_request = await fetch(InsertHistory_request_url, InserthistoryRequest_option) ; 

        } ; 

        MongoDbInsertHistory() ; 

        // Call Featch weather infomation function 

        HistoryRequest(Search_input) ; 
        
      }
    }

    // Function -> Search again Button

    const SearchAgainButton = () =>{

      SearchlayoutUpdateCss({
        display: 'flex' ,
        paddingTop: '80px'
      }) ; 

      WeatherUpdateLayout({
        display: 'none',
      }) ; 

    }


    return (
    <>
      <div className='Search_main_layout' style={SearchLayoutCss}>

        <div className='Search_division' style={Search_division_css}>
            
          {/* Search layout  */}
        
          <div className='Search_input_button' style={Search_input_button_css}>

          {/* Search input widget  */}

          <div className='Search_input' style={Search_input_css}>
           
            <input className="form-control" id="exampleSearch" placeholder="Enter city name"/>
           
          </div>

          {/* Search button widget  */}
           
          <div className='Search_button' style={Search_button_css}>
            <button type="button" className="btn btn-outline-primary" onClick={Search_button}>Search</button>
          </div>

        </div>

        
        {/* Search history information division  */}
         
        <div className='Search_history' style={Search_history_css}>

          <div style={Search_history_title}  > History </div>

            <div className="list-group" style={List_group_css}>

              {
                HistoryData.map((element) =>{
                      
                  return(<button type="button" className="list-group-item list-group-item-action" onClick={HistoryRequest(`${element.history}`)} key={element._id}>{element.history} | <spne style={Search_history_time}>{element.date}</spne></button>)
                })
              }

          </div>

        </div>
      
      </div>
 
      </div>

      {/* Weather information layout  */}

      <div className='Weather_info_main_layout' style={WeatherLayout}>
        
        <div className='Weather_information' style={Weather_information}>
          
          {/* city title information division  */}

          <div className='City_title' style={City_title}><h5 class="card-title">{city}</h5></div>

          <div className='Latitude_and_description' style={Latitude_description_css}>
            
            {/* Latitude and Longitude information  */}

            <div className='Latitude' style={Latitude_css}>
        
              <h6 class="card-title">Latitude <span style={Other_information_text}>{latitude}</span></h6>
              <h6 class="card-title" style={Other_information_division}>Longitude <span style={Other_information_text}>{longitude}</span></h6>
            
            </div>
        
            {/* Weather and other information division  */}

            <div className='Description' style={Latitude_css}>
              
              <h6 class="card-title">Weather <span style={Other_information_text}>{Weather}</span></h6>
              <h6 class="card-title" style={Other_information_division}>Description<span style={Other_information_text}>{WeatherInformation}</span></h6>
            
            </div>
        
          </div>
          
          <div className='Temperature_title' style={City_title}><h5 class="card-title">Temperature</h5></div>
           
          {/* Temperature information  */}

          <h6 classname="card-title" style={Temperature}>{temperature}</h6>
          
          <div className='Latitude_and_description' style={Latitude_description_css}>
                
            <div className='Latitude' style={Temperature_other_css}>
              
              {/* Feels like and Minimum temperature information  */}

              <h6 className="card-title">Feels like <span style={Other_information_text}>{feeTemperature}</span></h6>
              <h6 className="card-title" style={Other_information_division}>Min temperature<span style={Other_information_text}>{temperaturemin}</span></h6>
              <h6 className="card-title" style={Other_information_division}>Min temperature<span style={Other_information_text}>{temperaturemin}</span></h6>

            </div>  
          
          </div>

          {/* Search again button  */}

          <button className="btn btn-primary" type="submit" style={Search_again_button} onClick={SearchAgainButton}>Search again</button>

        </div>
      
      </div>
 
    </>
  )
}
