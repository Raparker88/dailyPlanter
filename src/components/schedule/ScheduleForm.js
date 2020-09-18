import React, { useContext, useRef, useEffect, useState } from "react"
import { CropContext } from "../crops/CropProvider"
import { ScheduledPlantingsContext } from "./ScheduleProvider"

export const SeedScheduleForm = (props) => {
    const [selectedCrop, setSelectedCrop] = useState({})

    const { addScheduledPlanting, getScheduledPlantings, scheduledPlantings } = useContext(ScheduledPlantingsContext)
    const { crops, getCrops } = useContext(CropContext)

    useEffect(() => {
        getCrops()
    }, [])
    useEffect(() => {
        getScheduledPlantings()
    }, [])
    
    const parsedCrops = crops.filter(crop => crop.userId === parseInt(localStorage.getItem("seedPlan_user")))

    const crop = useRef(null)
    const notes = useRef(null)
    const date = useRef(null)
    const successions = useRef(null)
    const interval = useRef(null)

    const findCrop = (cropId) => {
        const cropObj = crops.find(crop => crop.id === cropId)
        if (cropObj === undefined){
            setSelectedCrop({})
        }else{
            setSelectedCrop(cropObj)
        }
    }

    const displayCropInfo = () => {
        if(selectedCrop.hasOwnProperty("seedingNotes")){
            return (
                <section className="cropInfo">
                    <h3>{selectedCrop.name}</h3>
                    <h5>Seeding Notes</h5>
                    <div className="seedingNotes">{selectedCrop.seedingNotes}</div>
                    <h5>Best Time To Plant</h5>
                    <div className="plantingTime">{selectedCrop.frostNotes}</div>
                </section>
            )
        }
    }
 
    async function constructPlantings() {

        const cropId = parseInt(crop.current.value)
        const successionNum = parseInt(successions.current.value)
        const dateInt = new Date(date.current.value.replace(/-/g, '\/')).getTime()
        
        let newSeeding = {
                cropId,
                notes: notes.current.value,
                date: dateInt,
                userId: parseInt(localStorage.getItem("seedPlan_user"))
            }

        
        for(let i = 0; i <= successionNum; i++){
            await addScheduledPlanting(newSeeding)
            newSeeding.date += parseInt(interval.current.value)
        }
        document.getElementById("seedScheduleForm").reset()
    }

    const successionArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000
    const intervalArr = [{"2 Weeks": weekInMilliseconds*2},{"3 Weeks": weekInMilliseconds*3},{"4 Weeks": weekInMilliseconds*4}]

    return (
        <div className="scheduleTop">
        <aside></aside>
        <div className="formContainer">
        <form className="scheduleForm" id="seedScheduleForm">
            <h2>Create Seeding Schedule</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="crop">Crop: </label>
                    <select defaultValue="" name="crop" ref={crop} id="plantingCrop" className="form-control"
                        onChange={()=>{findCrop(parseInt(crop.current.value))}} >
                        <option value="0">Select a crop</option>
                        {parsedCrops.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group" id="scheduleDate">
                    <div><label htmlFor="date">Choose the first planting date </label></div>
                    <div><input type="date" id="date" name="date" ref={date}></input></div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="succession">Number of successions </label>
                    <select defaultValue="" name="succession" ref={successions} id="succession" className="form-control" >
                        <option value={0}>none</option>
                        {successionArr.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="interval">Interval Between Successions</label>
                    <select defaultValue="" name="interval" ref={interval} id="interval" className="form-control" >
                        <option value={weekInMilliseconds}>1 Week</option>
                        {intervalArr.map(i => (
                            <option key={Object.values(i)[0]} value={Object.values(i)[0]}>{Object.keys(i)[0]}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes for this planting: </label>
                    <textarea type="text" id="notes" ref={notes} required autoFocus className="form-control" placeholder="write notes here" />
                </div>
            </fieldset>
            
            <button type="submit" id="scheduleButton"
                onClick={evt => {
                    evt.preventDefault()
                    constructPlantings()
                }}
                className="btn btn-primary">
                    Schedule
                </button>
        </form>
        </div>
        <aside>
            {displayCropInfo()}
        </aside>
        </div>
    )
    

}