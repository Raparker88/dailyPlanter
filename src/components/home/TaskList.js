import React, { useState, useContext, useEffect } from "react"
import { ScheduledPlantingsContext, ScheduledPlantingsProvider } from "../schedule/ScheduleProvider"
import { CropContext } from "../crops/CropProvider"
import { WeatherList } from "./WeatherList"
import "./HomePage.css"

export const TaskList = (props) => {
    const { scheduledPlantings, getScheduledPlantings, updateScheduledPlanting } = useContext(ScheduledPlantingsContext)
    const { crops, getCrops } = useContext(CropContext)

    const [futureSchedule, setFutureSchedule] = useState([])
    const [pastSchedule, setPastSchedule] = useState([])

    useEffect(() => {
        getCrops()
        getScheduledPlantings()
    }, [])

    useEffect(() => {
        const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000
        const thisWeek = scheduledPlantings.filter(p => {
            if (p.date >= Date.now() && p.date <= Date.now() + weekInMilliseconds
                && p.userId === parseInt(localStorage.getItem("seedPlan_user")) || new Date(p.date).toDateString() === new Date(Date.now()).toDateString()) {
                return true
            }
        }) || []
        //sort in ascending order
        const sortedFuture = thisWeek.sort(function (a, b) { return a.date - b.date }) || []
        setFutureSchedule(sortedFuture)

        const pastOverdue = scheduledPlantings.filter(p => {
            if (p.date < Date.now() && new Date(p.date).toDateString() != new Date(Date.now()).toDateString() && !p.complete) {
                return true
            }
        }) || []
        //sort in descending order
        const sortedPast = pastOverdue.sort(function (a, b) { return b.date - a.date }) || []
        setPastSchedule(sortedPast)
    }, [scheduledPlantings])

    const handleCheckbox = (eve) => {
        const checked = eve.target.checked
        const scheduleObj = scheduledPlantings.find(p => p.id === parseInt(eve.target.id)) || {}
        if (checked) {
            scheduleObj.complete = true
            updateScheduledPlanting(scheduleObj)
        } else {
            scheduleObj.complete = false
            updateScheduledPlanting(scheduleObj)

        }
    }

    const isThereAFuture = () => {
        if (futureSchedule.length === 0) {
            return <p>Nothing scheduled at this time. Click schedule in the navbar to begin scheduling your planting season.</p>
        }
    }
    const isOverdue = () => {
        if (pastSchedule > 0) {
            return (
                <>
                    <h2>Overdue</h2>
                    <section className="plantings--container">
                        {
                            pastSchedule.map(ps => {
                                const crop = crops.find(c => c.id === ps.cropId)
                                return (
                                    <div key={ps.id} className="detailCard--task">
                                        <h4>{crop.name}</h4>
                                        <p>{new Date(ps.date).toDateString()}</p>
                                        <p>{ps.notes}</p>
                                        <label htmlFor="pastComplete">Complete</label>
                                        <input type="checkbox" id={ps.id} name="pastComplete" checked={ps.complete}
                                            onChange={handleCheckbox}></input>

                                    </div>
                                )
                            })
                        }
                    </section>
                </>
            )
        }
    }


    return (
        <>
            <div className="homeContainer">
                <h2>Scheduled Plantings This Week</h2>
                <section className="plantings--container">
                    <div>{isThereAFuture()}</div>

                    {futureSchedule.map(fs => {
                        const crop = crops.find(c => c.id === fs.cropId)
                        return (
                            <>
                                <div key={fs.id} className="detailCard--task">
                                    <h4>{crop.name}</h4>
                                    <p>{new Date(fs.date).toDateString()}</p>
                                    <p>{fs.notes}</p>
                                    <label htmlFor="complete">Complete</label>
                                    <input type="checkbox" id={fs.id} name="complete" checked={fs.complete}
                                        onChange={handleCheckbox}></input>
                                </div>
                            </>
                        )
                    })}
                </section>
                {isOverdue()}

                <WeatherList />

            </div>
        </>
    )
}