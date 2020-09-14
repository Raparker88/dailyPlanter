import React, { useState, useContext, useEffect } from "react"
import { CropContext } from "./CropProvider"
import "./Crop.css"

export const CropList = (props) => {
    const { crops, getCrops } = useContext(CropContext)
    
    const [ usersCrops, setUsersCrops ] = useState([])

    useEffect(() => {
        getCrops()
    }, [])
    
    useEffect(() => {
        const parsedCrops = crops.filter(crop => crop.userId === parseInt(localStorage.getItem("seedPlan_user")))
        setUsersCrops(parsedCrops)
    }, [crops])

    return (
        <>
            <h2>Crops</h2>
            <div className="buttonContainer">
                <button onClick={() => props.history.push("/crops/create")}>
                    Add a new crop
                </button>
            </div>
            <div className="cropList">
                {
                    usersCrops.map(crop => {
                        return (
                            <div onClick={()=> props.history.push(`/crops/${crop.id}`)}className="cropContainer">
                                <h3>{crop.name}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}