import React, { useContext } from "react"
import { CropContext } from "./CropProvider"
import "./Crop.css"

export const CropSearch = (props) => {
    const { setTerms } = useContext(CropContext)

    return (
        <>
            <input type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => setTerms(keyEvent.target.value)
                }
                placeholder="Search Crops... " />
        </>
    )
}