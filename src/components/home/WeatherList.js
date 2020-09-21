import React, { useState, useContext, useEffect } from "react"
import { WeatherContext } from "../externals/WeatherProvider"
import { UsersContext } from "../users/UserDataProvider"
import "./HomePage.css"

export const WeatherList = () => {
    const { weather, getWeather } = useContext(WeatherContext)
    const { users, getUserById } = useContext(UsersContext)

    const [filteredWeather, setFilteredWeather] = useState([])

    useEffect(() => {
        const currentUserId = parseInt(localStorage.getItem("seedPlan_user"))
        getUserById(currentUserId)
            .then(res => {
                getWeather(res.zipcode)
            })
    },[])

    useEffect(() => {
        const fiveDayForecast = weather.filter(w => {
            if (w.dt_txt.split(" ")[1] === "00:00:00") {
                return true
          }
        }) || []
        setFilteredWeather(fiveDayForecast)
    },[weather])

    const getDayOfTheWeek = (weather) => {
        const date = new Date(weather.dt * 1000);
        const daysOfTheWeek = [
              'SUN',
              'MON',
              'TUE',
              'WED',
              'THU',
              'FRI',
              'SAT'
        ]
        const day = date.getDay()
        return daysOfTheWeek[day]
    }

    return (
        <>
        <section className="weatherContainer">

            {filteredWeather.map(day => {
                return (
                    <div className="forecast--card" key={day.dt}>
                        <h3>{getDayOfTheWeek(day)}</h3>
                        <img className="forecast--image" src={require(`./WeatherImages/${day.weather[0].icon}.png`)}></img>
                        <div className="forecast--description">{day.weather[0].description}</div>
                        <div className="forecast--lowTemp">{Math.round(day.main.temp_max)} •F</div>
                    </div>
                )
            })}
        </section>
        </>
    )

}