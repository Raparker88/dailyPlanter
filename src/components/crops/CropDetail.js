import React, { useContext, useEffect, useState, useRef } from "react"
import { CropContext } from "./CropProvider"
import {ImageUpload} from "./CropImages"
import {ImageList} from "./ImageList"
import "./Crop.css"

export const CropDetails = (props) => {
    const { deleteCrop, getCropById } = useContext(CropContext)

    const [crop, setCrop] = useState({})

    const imageDialog = useRef(null)

    useEffect(() => {
        const cropId = parseInt(props.match.params.cropId)
        getCropById(cropId)
            .then(setCrop)
    }, [])

    return (
        <>
        <div className="cropDetailContainer">

            <h2 className="crop__name">{crop.name}</h2>
            <section className="cropDetails">
                <div className="detail crop__time">
                    <h3>When to Plant</h3>
                    <p className="detailNote">{crop.frostNotes}</p>
                </div>
                <div className="detail crop__seeding">
                    <h3>Seeding Strategies</h3>
                    <p className="detailNote">{crop.seedingNotes}</p>
                </div>
                <div className="detail crop__harvesting">
                    <h3>Harvesting Strategies</h3>
                    <p className="detailNote">{crop.harvestingNotes}</p>
                </div>
                <div className="detail crop__general">
                    <h3>Other Notes</h3>
                    <p className="detailNote">{crop.genNotes}</p>
                </div>
            </section>
            <div className="editDeleteContainer">
                <button 
                    className="submitButton cropDetailDelete"
                    onClick={
                    ()=> {
                        deleteCrop(crop.id)
                            .then(()=> {
                                props.history.push("/crops")
                            })
                    }
                }>
                    Delete Crop
                </button>
                <button 
                    className="submitButton cropDetailEdit"
                    onClick={()=> {
                    props.history.push(`/crops/edit/${crop.id}`)
                }}>Edit</button>

            </div>

        </div>
            <button 
                    className="archiveButton showImageDialog"
                    onClick={()=> {
                    imageDialog.current.showModal()
                }}>Upload Images</button>
        <dialog className="imageDialog" ref={imageDialog}>
            <ImageUpload crop={crop}/>
            <button 
                    className="submitButton closeDialog"
                    onClick={()=> {
                    imageDialog.current.close()
                }}>Close</button>

        </dialog>
        <div className="imageFlexContainer">
            <ImageList props={props}/>
        </div>
        </>
    )
}