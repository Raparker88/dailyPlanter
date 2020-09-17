import React, { useState } from "react"


export const WeatherContext = React.createContext()

export const WeatherProvider = (props) => {
    const [weather, setWeather] = useState([])

    const getWeather = (zip) => {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast/?zip=${zip}&units=imperial&appid=5071c2a8155fb0d57c8a8b8b161427a7`)
            .then(res => res.json())
            .then(setWeather)
    }


    return (
        <WeatherContext.Provider value={{
            weather, getWeather
        }}>
            {props.children}
        </WeatherContext.Provider>
    )
}