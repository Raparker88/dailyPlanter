
import React, { useState, useContext, useEffect, useRef } from "react"
import { ScheduledPlantingsContext } from "./ScheduleProvider"
import { CropContext } from "../crops/CropProvider"
import {CropSearch} from "./ScheduleSearch"
import "./Schedule.css"

export const ScheduleList = (props) => {
    const { scheduledPlantings, getScheduledPlantings, updateScheduledPlanting, deleteScheduledPlanting } = useContext(ScheduledPlantingsContext)
    const { crops, getCrops, scheduleSearchTerms, setScheduleSearchTerms } = useContext(CropContext)

    const [futureSchedule, setFutureSchedule] = useState({})
    const [pastSchedule, setPastSchedule] = useState({})
    const [chosenSchedule, setChosenSchedule] = useState({})
    const [filteredSchedule, setFilteredSchedule] = useState([])
    const [userCrops, setUserCrops] = useState([])
    const [futurePlantingsClass, setFutureClass] = useState("")
    const [pastPlantingsClass, setPastClass] = useState("")

    const scheduleEditDialog = useRef()

    useEffect(() => {
        getCrops()
        getScheduledPlantings()
        setFutureClass("futurePlantings--container")
        setPastClass("schedule--hidden")
    } ,[])
    

    useEffect(() => {
        const userSchedule = scheduledPlantings.filter(p => p.userId === parseInt(localStorage.getItem("seedPlan_user"))) || []
        const userCrops = crops.filter(crop => crop.userId === parseInt(localStorage.getItem("seedPlan_user"))) || []
        setUserCrops(userCrops)
        if (scheduleSearchTerms !== "") {
            const subset = userCrops.filter(crop => crop.name.toLowerCase().includes(scheduleSearchTerms.toLowerCase())) || []
            let scheduleSubset=[]
            subset.forEach(crop => {
                userSchedule.forEach(s => {
                    if(crop.id === s.cropId){
                        scheduleSubset.push(s)
                    }
                })
            })
            setFilteredSchedule(scheduleSubset)
        } else {
            
            setFilteredSchedule(userSchedule)
        }
    }, [scheduleSearchTerms, scheduledPlantings, crops])


    useEffect(() => {
        const future = filteredSchedule.filter(p => {
            if(p.date >= Date.now() && p.userId === parseInt(localStorage.getItem("seedPlan_user"))){
                return true
            }
        }) || []
        //sort in ascending order
        const sortedFuture = future.sort(function(a,b){return a.date-b.date})
        createDateObject(sortedFuture, "future")

        const past = filteredSchedule.filter(p => {
            if(p.date < Date.now() && p.userId === parseInt(localStorage.getItem("seedPlan_user"))){
                return true
            }
        }) || []
        //sort in descending order
        const sortedPast = past.sort(function(a,b){return b.date-a.date})
        createDateObject(sortedPast, "past")
    },[filteredSchedule])

    const createDateObject = (arr, type) => {
        let dateObj={}
        arr.forEach(v => {
            const date = new Date(v.date)
            const dateOffset = new Date(date.getTime() + Math.abs(date.getTimezoneOffset()*60000))
            const dateStr = dateOffset.toDateString()
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
                        const crop = crops.find(c => c.id === o.cropId) || {}
                        return (
                            <div key={o.id} className="plantingCard">
                            <h4 className="cropName"><b>{crop.name}</b></h4>
                            <p className="scheduleNotes">{o.notes}</p>
                            <div className="editDeleteDiv">
                                <button 
                                    className="editDelete"
                                    onClick={()=> {
                                    setChosenSchedule(o)
                                        scheduleEditDialog.current.showModal()
                                }}>Edit</button>
                                <button 
                                    className="editDelete"
                                    onClick={()=> {
                                    deleteScheduledPlanting(o.id)
                                }}>Delete</button>
                                </div>

                            </div>
                            
                        )
                    })}
                </div>
            )

        })
    }
    const handleControlledInputChange = (eve) => {
        const newSchedule = Object.assign({}, chosenSchedule)
        newSchedule[eve.target.name] = eve.target.value
        if(eve.target.name === "date"){
           newSchedule[eve.target.name] = new Date(eve.target.value.replace(/-/g, '\/')).getTime()
        }
        setChosenSchedule(newSchedule)
    } 
    
    const handleDate = (date) => {
        if ("date" in chosenSchedule) {
            const [ISO, placeholder] = new Date(date).toISOString().split('T')
            return ISO
        }
    }

    const update = () => {
        updateScheduledPlanting(chosenSchedule)
        .then(() => {
            setChosenSchedule({})
        }).then(() => {
            scheduleEditDialog.current.close()
            console.log(chosenSchedule)
        })

    }

    return (
        <>
        <CropSearch/>
        <div className="buttonContainer">
            <button 
                className="showButton"
                onClick={()=> {
                setFutureClass("futurePlantings--container")
                setPastClass("schedule--hidden")
            }}>Show Future Planting Schedules</button>
            <button
                className="showButton" 
                onClick={()=> {
                setFutureClass("schedule--hidden")
                setPastClass("pastPlantings--container")
            }}>Show Past Planting Schedules</button>
        </div>
        <div className="scheduleListContainer">
            <dialog className="dialog dialog--scheduleEdit" ref={scheduleEditDialog}>
                <form>
                <fieldset className="dateField">
                        <div className="form-group">
                            <label htmlFor="date">Date: </label>
                            <input type="date" id="scheduleDate" name="date" 
                                proptype="varchar"
                                placeholder="schedule date"
                                defaultValue={handleDate(chosenSchedule.date)}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="cropId">Crop: </label>
                        <select name="cropId" className="form-control" id="scheduleCrop"
                            proptype="int"
                            value={chosenSchedule.cropId}
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a crop</option>
                            {userCrops.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="notes">Notes: </label>
                        <textarea type="text" name="notes" required className="form-control" id="scheduleNotes"
                            proptype="varchar"
                            placeholder="notes"
                            defaultValue={chosenSchedule.notes}
                            onChange={handleControlledInputChange}>
                        </textarea>
                    </div>
                </fieldset>
                </form>
                <button type="submit" id="scheduleEditButton"
                    onClick={evt => {
                        evt.preventDefault()
                        update()
                    }}
                    className="btn btn-primary">
                    Save Updates
                </button>
                <button className="button--close" onClick={e => scheduleEditDialog.current.close()}>Close</button>
            </dialog>
            <section className={futurePlantingsClass}>
                <h2>Future</h2>
                <div className="scheduleFlex">
                    {iterateObject(futureSchedule)}
                </div>
            </section>
            <section className={pastPlantingsClass}>
                <h2>Past</h2>
                <div className="scheduleFlex">
                    {iterateObject(pastSchedule)}
                </div>
            </section>

        </div>
        </>
    )
}