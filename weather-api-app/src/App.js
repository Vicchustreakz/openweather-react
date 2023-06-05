import './App.css';
import { useState, useEffect } from 'react';

 function App() {
   const [cityName, setCityName] = useState(['Chennai', 'Bangalore', 'New York', 'Cape Town', 'Brisbane', 'Tokyo']);
   const [weatherData, setWeatherData] = useState([]);
   const [isUnit, setIsUnit] = useState(true);

   useEffect(() => {

    const storeData = async () => {
      
      const weatherDataStore = []
     
      for (const city of cityName) {  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7d831a7d9cdc4f1ab345d842bace418&units=${isUnit ? 'metric' : 'imperial'}`;
        const res = await fetch(url)
        const data = await res.json()
        weatherDataStore.push(data)
      }

      setWeatherData(weatherDataStore)
    };
    
    storeData();
    return () => console.log("CleanUp code");
   },[cityName, isUnit]);

   const toggletempUnit = () => {
      setIsUnit(!isUnit)
   }

   return (
     <div className='container'>
      <div className='btn-style'>
      <button className='btn' onClick={toggletempUnit}>{isUnit ? 'Celcius' : 'Farenheit'}</button>
      </div>
      <div className='d-grid'>
      {weatherData.map((data,index) => (
      <div className="App-header" key={index}>
      <div className='card'>
         <h1>{data?.name}</h1>
         <p>Climate: {data.weather && data.weather.length > 0 ? data.weather[0].main : 'Unknown'}</p>
         <h2>{data.main?.temp.toFixed()} {isUnit ? '°C' : '°F'}</h2>
         <h4>Feels Like: {data.main?.feels_like.toFixed()} {isUnit ? '°C' : '°F'}</h4>
         <p className='d-inline'>Max: {data.main?.temp_max.toFixed()} {isUnit ? '°C' : '°F'}</p>
         <p className='d-inline'>Min: {data.main?.temp_min.toFixed()} {isUnit ? '°C' : '°F'}</p>
       </div>
     </div>
      ))}
      </div>
     </div>
   );
 }

 export default App;



