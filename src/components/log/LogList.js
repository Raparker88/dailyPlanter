import React, { useState, useContext, useEffect } from "react"
import { LogContext } from "./LogProvider"
import { CropContext } from "../crops/CropProvider"
import { CropSearch} from "./LogCropSearch"
import "./Log.css"

export const LogList = (props) => {
    const { logs, getLogs, updateLog, deleteLog} =useContext(LogContext)
    const { crops, getCrops, logSearchTerms, setLogSearchTerms } = useContext(CropContext)

    const [plantingsObj, setPlantingsObj] = useState({})
    const [harvestsObj, setHarvestsObj] = useState({})
    const [filteredLogs, setFilteredLogs] = useState([])
    const [plantingClass, setPlantingClass] = useState("logList")
    const [harvestClass, setHarvestClass] = useState("logHidden")
    

    useEffect(() => {
        getCrops()
        getLogs()
    },[])

    useEffect(() => {
        // const sortedLogs = logs.sort(function(a,b){
        //     return new Date(b.date).getTime()-new Date(a.date).getTime()}) || []
        const sortedLogs = filteredLogs.sort(function(a,b){
            return new Date(b.date).getTime()-new Date(a.date).getTime()}) || []

        const plantings = sortedLogs.filter(l => {
            if(l.type === "planting" && l.userId === parseInt(localStorage.getItem("seedPlan_user"))){
                return true
            }
        }) || []
        const harvests = sortedLogs.filter(l => {
            if(l.type === "harvest" && l.userId === parseInt(localStorage.getItem("seedPlan_user"))){
                return true
            }
        }) || []
        
        
        createDateObj(plantings, "plantings")
        createDateObj(harvests, "harvests")
    },[filteredLogs])

    useEffect(() => {
        const userLogs = logs.filter(l => l.userId === parseInt(localStorage.getItem("seedPlan_user"))) || []
        if (logSearchTerms !== "") {
            const userCrops = crops.filter(crop => crop.userId === parseInt(localStorage.getItem("seedPlan_user"))) || []
            const subset = userCrops.filter(crop => crop.name.toLowerCase().includes(logSearchTerms.toLowerCase())) || []
            let logSubset=[]
            subset.forEach(crop => {
                userLogs.forEach(log => {
                    if(crop.id === log.cropId){
                        logSubset.push(log)
                    }
                })
            })
            setFilteredLogs(logSubset)
        } else {
            
            setFilteredLogs(userLogs)
        }
    }, [logSearchTerms, logs, crops])
    

    

    const createDateObj = (arr, type) => {
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
        if(type === "plantings"){
            setPlantingsObj(dateObj)
        }else{
            setHarvestsObj(dateObj)
        }
    }
    
    const iterateObject = (obj, type) => {
        const keys = Object.keys(obj) 
        if (type === "harvest"){
            return keys.map(key => {
                return (
                    <>
                    <h3>{key}</h3>
                    <div className="logDateGroup" key={obj[key][0].id}>
                        {obj[key].map(o => {
                            const crop = crops.find(c => c.id === o.cropId) || {}
                            return (
                                <div key={o.id} className="logPlantingCard">
                                <h4 className="logCropName"><b>{crop.name}</b></h4>
                                <p className="logNotes">{o.notes}</p>
                                <div className="editDeleteDiv">
                                    <button 
                                        className="editDelete"
                                        onClick={()=> {
                                        props.history.push(`/log/edit/${o.id}`)
                                    }}>Edit</button>
                                    <button 
                                        className="editDelete"
                                        onClick={()=> {
                                        deleteLog(o.id)
                                    }}>Delete</button>
                                    </div>

                                </div>
                                
                            )
                        })}
                    </div>
                    </>
                )
    
            })
        }else{
            return keys.map(key => {
                return (
                    <>
                        <h3>{key}</h3>
                        <div className="logDateGroup" key={obj[key][0].id}>
                            {obj[key].map(o => {
                                const crop = crops.find(c => c.id === o.cropId) || {}
                                return (
                                    <div key={o.id} className="logPlantingCard">
                                    <h4 className="logCropName"><b>{crop.name}</b></h4>
                                    <p className="logNotes">{o.notes}</p>
                                        <label htmlFor="success">Successful</label>
                                        <input  type="checkbox" id={o.id} name="success" checked={o.success}
                                            onChange={handleCheckbox}></input>
                                    <div className="editDeleteDiv">
                                        <button 
                                            className="editDelete"
                                            onClick={()=> {
                                            props.history.push(`/log/edit/${o.id}`)
                                        }}>Edit</button>
                                        <button 
                                            className="editDelete"
                                            onClick={()=> {
                                            deleteLog(o.id)
                                        }}>Delete</button>
                                    </div>
                        
                                    </div>
                                    
                                )
                            })}

                        </div>
                    </>
                )
    
            })

        }
    }
    

    const handleCheckbox = (eve) => {
        const checked = eve.target.checked
        const plantingObj = logs.find(p => p.id === parseInt(eve.target.id))
        if (checked){
            plantingObj.success = true
            updateLog(plantingObj)
        }else{
            plantingObj.success = false
            updateLog(plantingObj)
        }
    }

    return (
        <>
        <CropSearch/>
        <div className="logButtons">
            <button 
                className="showButton"
                onClick={()=> {
                setPlantingClass("logList")
                setHarvestClass("logHidden")
            }}>Show Logged Plantings</button>
            <button
                className="showButton"
                onClick={()=> {
                setPlantingClass("logHidden")
                setHarvestClass("logList")
            }}>Show Logged Harvests</button>
        </div>
        <div className="logListContainer">
            <section className={plantingClass}>
                <h2 className="typeTitle">Plantings</h2>
                <div className="flexLogs">
                    {iterateObject(plantingsObj, "planting")}
                </div>
            </section>
            <section className={harvestClass}>
                <h2 className="typeTitle">Harvests</h2>
                <div className="flexLogs">
                    {iterateObject(harvestsObj, "harvest")}
                </div>
            </section>

        </div>
        </>
    )
}
