import React, { useContext, useRef, useEffect } from "react"
import { CropContext } from "../crops/CropProvider"
import { ScheduledPlantingsContext } from "./ScheduleProvider"

export const SeedScheduleForm = (props) => {
    const { addScheduledPlanting } = useContext(ScheduledPlantingsContext)
    const { crops, getCrops } = useContext(CropContext)

    useEffect(() => {
        getCrops()
    }, [])

    const parsedCrops = crops.filter(crop => crop.userId === parseInt(localStorage.getItem("seedPlan_user")))

    const crop = useRef(null)
    const notes = useRef(null)
    const date = useRef(null)
    const successions = useRef(null)
    const interval = useRef(null)

    async function constructPlantings() {

        const cropId = parseInt(crop.current.value)
        const successionNum = successions.current.value
        const dateInt = new Date(date.current.value).getTime()
        
        let newSeeding = {
                cropId,
                notes: notes.current.value,
                date: dateInt,
                userId: parseInt(localStorage.getItem("seedPlan_user"))
            }

        
        for(let i = 0; i < successionNum; i++){
            await addScheduledPlanting(newSeeding)
            newSeeding.date += parseInt(interval.current.value)
        }
    }

    const successionArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000
    const intervalArr = [{"2 Weeks": weekInMilliseconds*2},{"3 Weeks": weekInMilliseconds*3},{"4 Weeks": weekInMilliseconds*4}]

    return (
        <form className="scheduleForm">
            <h2>Create Seeding Schedule</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="crop">Crop: </label>
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Choose the first planting date</label>
                    <input type="date" id="date" name="date" ref={date}></input>
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
            
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructPlantings()
                }}
                className="btn btn-primary">
                    Schedule
                </button>
        </form>
    )
    

}