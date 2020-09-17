import React, { useState, useContext, useEffect } from "react"
import { LogContext } from "./LogProvider"
import { CropContext } from "../crops/CropProvider"
import "./Log.css"

export const LogList = (props) => {
    const { logs, searchTerms, getLogs, updateLog, deleteLog} =useContext(LogContext)
    const { crops, getCrops } = useContext(CropContext)

    const [loggedPlantings, setPlantings] = useState([])
    const [loggedHarvests, setHarvests] = useState([])

    useEffect(() => {
        getCrops()
        getLogs()
    },[])

    useEffect(() => {
        const plantings = logs.filter(l => l.type === "planting")
        const harvests = logs.filter(l => l.type === "harvest")
        setPlantings(plantings)
        setHarvests(harvests)
    },[logs])

    const handleCheckbox = (eve) => {
        const checked = eve.target.checked
        debugger
        const plantingObj = loggedPlantings.find(p => p.id === parseInt(eve.target.id))
        if (checked){
            plantingObj.success = true
            updateLog(plantingObj)
        }else{
            plantingObj.success = false
            updateLog(plantingObj)
        }
    }

    return (
        <div className="logListContainer">
            <section className="loggedPlantingsList">
                <h2>Plantings</h2>
                {loggedPlantings.map(p => {
                    const crop = crops.find(c => c.id === p.cropId)
                    return (
                        <div key={p.id} className="logInfo">
                            <h4>{p.date}</h4>
                            <p>{crop.name}</p>
                            <p>{p.notes}</p>
                            <label htmlFor="success">Successful</label>
                            <input type="checkbox" id={p.id} name="success" checked={p.success}
                                onChange={handleCheckbox}></input>
                            <button onClick={()=> {
                                props.history.push(`/log/edit/${p.id}`)
                            }}>Edit</button>
                            <button onClick={()=> {
                                deleteLog(p.id)
                            }}>Delete</button>
                        </div>
                    )
                })}

            </section>
            <section className="loggedHarvestsList">
                <h2>Harvests</h2>
                {loggedHarvests.map(h => {
                    const crop = crops.find(c => c.id === h.cropId)
                    return (
                        <div key={h.id} className="logInfo">
                            <h4>{h.date}</h4>
                            <p>{crop.name}</p>
                            <p>{h.notes}</p>
                            <button onClick={()=> {
                                props.history.push(`/log/edit/${h.id}`)
                            }}>Edit</button>
                            <button onClick={()=> {
                                deleteLog(h.id)
                            }}>Delete</button>
                        </div>
                    )
                })}

            </section>

        </div>
    )
}
