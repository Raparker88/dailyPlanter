import React, { useState, useContext, useEffect } from "react"
import { ScheduledPlantingsContext, ScheduledPlantingsProvider } from "../schedule/ScheduleProvider"
import { CropContext } from "../crops/CropProvider"
import { WeatherList } from "./WeatherList"
import "./HomePage.css"

export const TaskList = (props) => {
    const { scheduledPlantings, getScheduledPlantings } = useContext(ScheduledPlantingsContext)
    const { crops, getCrops } = useContext(CropContext)

    const [futureSchedule, setFutureSchedule] = useState([])

    useEffect(() => {
        getCrops()
        getScheduledPlantings()
    } ,[])

    useEffect(() => {
        const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000
        const thisWeek = scheduledPlantings.filter(p => {
            if(p.date >= Date.now() && p.date <= Date.now()+weekInMilliseconds){
                return true
            }
        })
        setFutureSchedule(thisWeek)
    },[scheduledPlantings],[crops])

    return (
        <>
        <div className="homeContainer">
            <h2>Scheduled Plantings this week</h2>
            <section className="upcomingPlantings--container">
                {futureSchedule.map(fs => {
                    const crop = crops.find(c => c.id === fs.cropId)
                    return (
                        <div key={fs.id} className="detailCard--task">
                            <h4>{crop.name}</h4>
                            <p>{new Date(fs.date).toDateString()}</p>
                            <p>{fs.notes}</p>
                        </div>
                    )
                })}
            </section>
            <WeatherList/>

        </div>
        </>
    )
}