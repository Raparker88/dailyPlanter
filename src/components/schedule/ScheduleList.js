
import React, { useState, useContext, useEffect } from "react"
import { ScheduledPlantingsContext } from "./ScheduleProvider"
import { CropContext } from "../crops/CropProvider"
import "./Schedule.css"

export const ScheduleList = (props) => {
    const { scheduledPlantings, getScheduledPlantings } = useContext(ScheduledPlantingsContext)
    const { crops, getCrops } = useContext(CropContext)

    const [futureSchedule, setFutureSchedule] = useState({})
    const [pastSchedule, setPastSchedule] = useState({})

    useEffect(() => {
        getCrops()
        getScheduledPlantings()
    } ,[])

    useEffect(() => {
        const future = scheduledPlantings.filter(p => {
            if(p.date >= Date.now() && p.userId === parseInt(localStorage.getItem("seedPlan_user"))){
                return true
            }
        })
        //sort in ascending order
        const sortedFuture = future.sort(function(a,b){return a.date-b.date})
        createDateObject(sortedFuture, "future")

        const past = scheduledPlantings.filter(p => {
            if(p.date < Date.now() && p.userId === parseInt(localStorage.getItem("seedPlan_user"))){
                return true
            }
        })
        //sort in descending order
        const sortedPast = past.sort(function(a,b){return b.date-a.date})
        createDateObject(sortedPast, "past")
    },[scheduledPlantings],[crops])

    const createDateObject = (arr, type) => {
        let dateObj={}
        arr.forEach(v => {
            const dateStr = new Date(v.date).toDateString()
            if (dateObj.hasOwnProperty(dateStr)){
                dateObj[dateStr].push(v)
            }else{
                dateObj[dateStr] = []
                dateObj[dateStr].push(v)
            }
        })
        if(type === "future"){
            setFutureSchedule(dateObj)
        }else{
            setPastSchedule(dateObj)
        }
    }

    const iterateObject = (obj) => {
        const keys = Object.keys(obj)
        return keys.map(key => {
            return (
                <div className="dateGroup" key={obj[key][0].id}>
                    <h3>{key}</h3>
                    {obj[key].map(o => {
                        const crop = crops.find(c => c.id === o.cropId)
                        return (
                            <div key={o.id} className="plantingCard">
                            <p className="cropName"><b>{crop.name}:</b></p>
                            <p>{o.notes}</p>
                            </div>
                        )
                    })}
                </div>
            )

        })
    }

    return (
        <>
        <div className="scheduleListContainer">
            <section className="futurePlantings--container">
                <h2>Future</h2>
                {iterateObject(futureSchedule)}
            </section>
            <section className="pastPlantings--container">
                <h2>Past</h2>
                {iterateObject(pastSchedule)}
            </section>

        </div>
        </>
    )
}