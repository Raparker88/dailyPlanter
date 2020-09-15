import React, { useContext, useRef, useEffect } from "react"
import { CropContext } from "../crops/CropProvider"
import { ScheduledPlantingsContext } from "./ScheduleProvider"

export const SeedScheduleForm = (props) => {
    const { addScheduledPlanting } = useContext(ScheduledPlantingsContext)
    const { crops } = useContext(CropContext)

    const parsedCrops = crops.filter(crop => crop.userId === parseInt(localStorage.getItem("seedPlan_user")))

    const crop = useRef(null)
    const notes = useRef(null)
    const date = useRef(null)
    const successions = useRef(null)
    const interval = useRef(null)

    const constructPlantings = () => {

        const cropId = parseInt(crop.current.value)
        const successions = parseInt(successions.current.value)

        let newSeeding = {
            cropId,
            notes: notes.currents.value,
            //date 
        }

        //write code for indeterminate number of fetch calls based on number of successions
        const promises = []
        for(let i = 1; i <= successions; i++){
            promises.push(addScheduledPlanting(newSeeding))
            newSeeding.date += interval
        }

        Promise.all(promises)
            .then(() => {
                //rerender form
            })
    }

    return (
        <form className="scheduleForm">
            <h2>Create Seeding Schedule</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="crop">Seeding: </label>
                    <select defaultValue="" name="crop" ref={crop} id="plantingCrop" className="form-control" >
                        <option value="0">Select a crop</option>
                        {parsedCrops.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        </form>
    )
    

}