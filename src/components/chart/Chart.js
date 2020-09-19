import React, { useState, useContext, useEffect } from "react"
import { LogContext } from "../log/LogProvider"
import { CropContext } from "../crops/CropProvider"
import "./Chart.css"

export const Chart = (props) => {
    const {logs, getLogs} = useContext(LogContext)
    const {crops, getCrops} = useContext(CropContext)

    const [userLogs, setUserLogs] = useState([])
    const [cropsWithMonths, setCropsWithMonths] = useState([])
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"]

    useEffect(() => {
        getCrops()
        .then(getLogs)
    }, [])

    useEffect(() => {
        const filteredLogs = logs.filter(l => {
            if(l.userId === parseInt(localStorage.getItem("seedPlan_user")) && l.success){
                return true
            }
        })
        setUserLogs(filteredLogs)
    },[logs])

    useEffect(() => {

       const cropsExpand = crops.map(c => {
            months.forEach(month => {

                c[month] = {harvest: false, planting: false}
                
            })
            const cropLogs = userLogs.filter(l => l.cropId === c.id)
            cropLogs.forEach(cl => {
                const dateIndex = parseInt(cl.date.slice(5,7))-1
                const month = months[dateIndex]
                const type = cl.type
                c[month][type] = true
            })
            return c
        })
        setCropsWithMonths(cropsExpand)

    },[userLogs], [crops])

    const getClass = (crop, month) => {
        if(crop[month].planting && crop[month].harvest){
            return "blueGreen"
        }else if(crop[month].planting){
            return "green"
        }else if(crop[month].harvest){
            return "blue"
        }
    }

    return (
        <div className="tableContainer">
            <h2>Plantings and Harvests by Month</h2>
            <div className="legend">
                <div className="legendItem">
                    <h4>Plantings</h4>
                    <div className="green legendColor"></div>
                </div>
                <div className="legendItem">
                    <h4>Harvests</h4>
                    <div className="blue legendColor"></div>
                </div>

            </div>
            <table className="logTable">
                <tbody>
                    <tr>
                        <th>Crops</th>
                        {months.map(m => <th className="column">{m}</th>)}
                    </tr>
                        {cropsWithMonths.map(crop => {
                            return(
                                <tr key={crop.id}>
                                    <td>{crop.name}</td>
                                    {months.map (month => {
                                        return <td className={getClass(crop, month)}></td>
                                    })}
                                    
                                </tr>
                            )
                        })}

                    </tbody>

            </table>

        </div>
    )
}

