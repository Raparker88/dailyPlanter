import React, { useContext } from "react"
import { CropContext } from "../crops/CropProvider"
import "./Schedule.css"

export const CropSearch = (props) => {
    const { setScheduleSearchTerms, scheduleSearchTerms } = useContext(CropContext)

    return (
        <>
        <div className="cropSearch">

            <input type="text"
                className="input--wide"
                defaultValue = {scheduleSearchTerms}
                onKeyUp={
                    (keyEvent) => setScheduleSearchTerms(keyEvent.target.value)
                }
                placeholder="Search Crops... " />
        </div>
        </>
    )
}