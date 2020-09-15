import React, { useState, useContext, useEffect } from "react"
import { CropContext } from "./CropProvider"
import "./Crop.css"

export const CropList = (props) => {
    const { crops, getCrops, searchTerms } = useContext(CropContext)
    
    const [ filteredCrops, setFiltered ] = useState([])

    useEffect(() => {
        getCrops()
    }, [])
    

    useEffect(() => {
        const parsedCrops = crops.filter(crop => crop.userId === parseInt(localStorage.getItem("seedPlan_user")))
        if (searchTerms !== "") {
            const subset = parsedCrops.filter(crop => crop.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else {
            
            setFiltered(parsedCrops)
        }
    }, [searchTerms, crops])

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
                    filteredCrops.map(crop => {
                        return (
                            <div onClick={()=> props.history.push(`/crops/${crop.id}`)}key={crop.id} className="cropContainer">
                                <h3 >{crop.name}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}