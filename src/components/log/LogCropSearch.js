import React, { useContext } from "react"
import { CropContext } from "../crops/CropProvider"
import "./Log.css"

export const CropSearch = (props) => {
    const { setLogSearchTerms, logSearchTerms } = useContext(CropContext)

    return (
        <>
        <div className="cropSearch">

            <input type="text"
                className="input--wide"
                defaultValue = {logSearchTerms}
                onKeyUp={
                    (keyEvent) => setLogSearchTerms(keyEvent.target.value)
                }
                placeholder="Search Crops... " />
        </div>
        </>
    )
}