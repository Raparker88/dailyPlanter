import React, { useState, useContext, useEffect } from "react"
import {CropImageContext} from "./ImageProvider"
import "./Crop.css"


export const ImageList = ({props}) => {
    const {images, getImages} = useContext(CropImageContext)
    const [cropImages, setImages] = useState([])

    useEffect(() => {
        getImages()
    },[])

    useEffect(() => {
        debugger
        const cropId = parseInt(props.match.params.cropId)
        const cImages = images.filter(i => i.cropId === cropId) || []
        setImages(cImages)
    },[images])

    return (
        <div className="imageContainer">
            {cropImages.map(c => {
                return (
                    <div className="image" key={c.id}>
                        <img src={c.imageURL} style="width:100%"></img>
                        <div className="imageContent"><p>{c.label}</p></div>
                    </div>
                )
            })}

        </div>
    )
}