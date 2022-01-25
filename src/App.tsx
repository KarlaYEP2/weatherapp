import React, {Component, useState} from "react"
import { render } from "react-dom"
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
let lat = 0
let lon = 0
interface weatherFunction {
  getWeather: any
}
const MyMap: React.FC<weatherFunction> =({getWeather}) => {
  interface map {
    loc: null,
    setLoc: null
  }
  const [loc, setLoc] = useState([]);
  useMapEvents({
    // @ts-ignore
    click: (e) => {
      lat = e.latlng.lat
      lon = e.latlng.lng
      getWeather()
      console.log(e)
      console.log('test')
    }

  })
  return null
}
const Map:React.FC<weatherFunction> = ({getWeather}) => {
  return(
      <MapContainer center={[59.505, 26]} zoom={13} scrollWheelZoom={true} id={'map'}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[59.505, 26]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <MyMap getWeather={getWeather}/>
      </MapContainer>
  )
}

function App() {

  function getDay( index: number)
  {
    let baseDate = new Date()
    let weekDays = []
    for (let i = 0; i < 7; i++)
    {
      weekDays.push(baseDate.toLocaleDateString('en-GB', { weekday: 'long' }))
      baseDate.setDate(baseDate.getDate() + 1)
    }
    return weekDays[index]
  }


  function getMonth(){
    const date = new Date()
    const month = date.toLocaleString('en-GB', { month: 'long' })
    return month

  }
  let [weather, setWeather] = useState([])
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        lat = position.coords.latitude
        lon = position.coords.longitude
        console.log(lat)
        console.log(lon)
        getWeather()
      }, () => {
        alert ('In order for this website to function I need your location :)')
      })
    }
  }
  function getWeather() {
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts,current&appid=' + process.env.REACT_APP_API_KEY
    return fetch(url)
        .then(res => res.json())
        .then(data => setWeather(data.daily))
  }

  function showWeather(index: number) {
    if(weather !== undefined && weather.length>0) {
      return weather[index]["weather"][0]["description"];
    }
  }


  return (

        <div>
          <Map getWeather={getWeather}/>
          <div id="map">
            <button onClick={getLocation}>get weather</button>
            <h1>{getMonth()}</h1>
            <p>Today: {showWeather(0)}</p>
            <p>Tomorrow: {showWeather(0)}</p>
            <p>{getDay(2)}: {showWeather(1)}</p>
            <p>{getDay(3)}: {showWeather(3)}</p>
            <p>{getDay(4)}: {showWeather(4)}</p>
            <p>{getDay(5)}: {showWeather(5)}</p>
          </div>
        </div>

  )
}
render(<App />, document.getElementById("root"));
export default App
