import React, { useState, useContext, useEffect } from "react"
import { LogContext } from "../log/LogProvider"
import { CropContext } from "../crops/CropProvider"
import "./Chart.css"

export const Chart = (props) => {
    const {logs, getLogs} = useContext(LogContext)
    const {crops, getCrops} = useContext(CropContext)

    const [userLogs, setUserLogs] = useState([])
    const [cropsObj, setCropsObj] = useState({})
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"]

    useEffect(() => {
        getLogs()
        getCrops()
    }, [])

    useEffect(() => {
        const filteredLogs = logs.filter(l => l.userId === parseInt(localStorage.getItem("seedPlan_user")))
        setUserLogs(filteredLogs)
    },[logs])

    useEffect(() => {
        debugger
        const obj = {}
        crops.forEach(c => {
            months.forEach(month => {
                obj[c.name]["planting"][month] = false
                obj[c.name]["harvest"][month] = false
            })
        })
        userLogs.forEach(ul => {
            const crop = ul.crop.name
            const dateIndex = parseInt(ul.date.slice(5.7))-1
            const month = months[dateIndex]
            const type = ul.type
            obj[crop][type][month] = true
        })
        setCropsObj(obj)
    },[userLogs], [crops])

    return (
        <table>
            <tbody>
                <tr>
                    <th>Month</th>
                    {months.map(m => <th>{m}</th>)}
                </tr>
                    {crops.map(crop => {
                        return(
                            <tr key={crop.id}>
                                <td>{crop.name}</td>
                                {/* <td>{stringToDate(sp.prob_90, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_80, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_70, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_60, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_50, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_40, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_30, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_20, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_10, sp.season_id).toDateString()}</td> */}
                            </tr>
                        )
                    })}

                </tbody>

        </table>
    )
}

