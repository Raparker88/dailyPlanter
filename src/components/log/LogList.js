import React, { useState, useContext, useEffect } from "react"
import { LogContext } from "./LogProvider"
import { CropContext } from "../crops/CropProvider"
import "./Log.css"

export const LogList = (props) => {
    const { logs, searchTerms, getLogs} =useContext(LogContext)
    const { crops, getCrops } = useContext(CropContext)

    const [loggedPlantings, setPlantings] = useState([])
    const [loggedHarvests, setHarvests] = useState([])

    useEffect(() => {
        getLogs()
        .then(getCrops)
    },[])

    useEffect(() => {
        const plantings = logs.filter(l => l.type === "planting")
        const harvests = logs.filter(l => l.type === "harvest")
        setPlantings(plantings)
        setHarvests(harvests)
    },[logs])

    return (
        <div className="logListContainer">
            <section className="loggedPlantingsList">
                <h2>Plantings</h2>
                {loggedPlantings.map(p => {
                    const crop = crops.find(c => c.id === p.cropId)
                    return (
                        <div key={p.id} className="plantingInfo">
                            <h4>{p.date}</h4>
                            <p>{crop.name}</p>
                            <p>{p.notes}</p>
                        </div>
                    )
                })}

            </section>
            <section className="loggedHarvestsList">
                <h2>Harvests</h2>
                {loggedHarvests.map(h => {
                    const crop = crops.find(c => c.id === h.cropId)
                    return (
                        <div key={h.id} className="harvestInfo">
                            <h4>{h.date}</h4>
                            <p>{crop.name}</p>
                            <p>{h.notes}</p>
                        </div>
                    )
                })}

            </section>

        </div>
    )
}
