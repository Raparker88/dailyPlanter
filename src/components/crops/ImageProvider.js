import React, { useState, useEffect } from "react"


export const CropImageContext = React.createContext()

export const CropImageProvider = (props) => {
    const [images, setImages] = useState([])

    const getImages = () => {
        return fetch("http://localhost:8088/cropImages")
            .then(res => res.json())
            .then(setImages)
    }

    const addImage = crop => {
        return fetch("http://localhost:8088/cropImages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crop)
        })
            .then(getImages)
    }
   
    const deleteImage = imageId => {
        return fetch(`http://localhost:8088/crops/${imageId}`, {
            method: "DELETE"
        })
            .then(getImages)
    }
    

    return (
        <CropImageContext.Provider value={{
            images, addImage, getImages,  deleteImage
        }}>
            {props.children}
        </CropImageContext.Provider>
    )
}