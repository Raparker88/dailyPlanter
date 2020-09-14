import React, { useContext, useEffect, useState } from "react"
import { CropContext } from "./CropProvider"
import "./Crop.css"

export const CropDetails = (props) => {
    const { deleteCrop, getCropById } = useContext(CropContext)

    const [crop, setCrop] = useState({})

    useEffect(() => {
        const cropId = parseInt(props.match.params.cropId)
        getCropById(cropId)
            .then(setCrop)
    }, [])

    return (
        <>
        <h2 className="crop__name">{crop.name}</h2>
        <section className="cropDetails">
            <div className="detail crop__time">
                <h3>When to Plant</h3>
                <p>{crop.frostNotes}</p>
            </div>
            <div className="detail crop__seeding">
                <h3>Seeding Strategies</h3>
                <p>{crop.seedingNotes}</p>
            </div>
            <div className="detail crop__harvesting">
                <h3>Harvesting Strategies</h3>
                <p>{crop.harvestingNotes}</p>
            </div>
            <div className="detail crop__general">
                <h3>Other Notes</h3>
                <p>{crop.genNotes}</p>
            </div>
        </section>
        <button onClick={
            ()=> {
                deleteCrop(crop.id)
                    .then(()=> {
                        props.history.push("/crops")
                    })
            }
        }>
            Delete Crop
        </button>
        <button onClick={()=> {
            props.history.push(`/crops/edit/${crop.id}`)
        }}>Edit</button>
        </>
    )
}