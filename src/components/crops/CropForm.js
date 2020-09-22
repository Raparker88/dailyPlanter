import React, { useContext, useState, useEffect, useRef } from "react"
import { CropContext } from "./CropProvider"


export const CropForm = (props) => {
    
    const { addCrop, crops, updateCrop, getCrops } = useContext(CropContext)

    // Component state
    const [crop, setCrop] = useState({})

    // Is there a a URL parameter??
    const editMode = props.match.params.hasOwnProperty("cropId")

    const cropFormDialog = useRef()

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newCrop = Object.assign({}, crop)
        newCrop[event.target.name] = event.target.value
        setCrop(newCrop)
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit a crop.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the animal.
            3. Update component state variable.
    */
    const getCropInEditMode = () => {
        if (editMode) {
            const cropId = parseInt(props.match.params.cropId)
            const selectedCrop = crops.find(c => c.id === cropId) || {}
            setCrop(selectedCrop)
        }
    }

    // Get crops from API when component initializes
    useEffect(() => {
        getCrops()
    }, [])

    // Once provider state is updated, determine the crop (if edit)
    useEffect(() => {
        getCropInEditMode()
    }, [crops])


    const constructNewCrop = () => {
        if(crop.name && crop.seedingNotes && crop.harvestingNotes && crop.frostNotes && crop.genNotes){
            if (editMode) {
                updateCrop({
                    id: crop.id,
                    name: crop.name,
                    seedingNotes: crop.seedingNotes,
                    harvestingNotes: crop.harvestingNotes,
                    genNotes: crop.genNotes,
                    frostNotes: crop.frostNotes,
                    userId: parseInt(localStorage.getItem("seedPlan_user"))
                })
                    .then(() => props.history.push(`/crops/${crop.id}`))
            } else {
                addCrop({
                    name: crop.name,
                    seedingNotes: crop.seedingNotes,
                    harvestingNotes: crop.harvestingNotes,
                    genNotes: crop.genNotes,
                    frostNotes: crop.frostNotes,
                    userId: parseInt(localStorage.getItem("seedPlan_user"))
                })
                    .then(() => props.history.push("/crops"))
            }
        }else{
            cropFormDialog.current.showModal()
        }
        
    }

    return (
        <form className="cropForm">
            <dialog className="dialog dialog--cropForm" ref={cropFormDialog}>
                <div>Please Fill in all fields</div>
                <button className="button--close" onClick={e => cropFormDialog.current.close()}>Close</button>
            </dialog>
            <h2 className="cropForm__title">{editMode ? "Edit Crop" : "Add A New Crop"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Crop name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Crop name"
                        defaultValue={crop.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="frostNotes">When to plant: </label>
                    <textarea type="text" name="frostNotes" required className="form-control"
                        proptype="varchar"
                        placeholder="example: 2 weeks before last frost"
                        defaultValue={crop.frostNotes}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="seedingNotes">Seeding strategies: </label>
                    <textarea type="text" name="seedingNotes" required className="form-control"
                        proptype="varchar"
                        defaultValue={crop.seedingNotes}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="harvestingNotes">Harvesting strategies: </label>
                    <textarea type="text" name="harvestingNotes" required className="form-control"
                        proptype="varchar"
                        defaultValue={crop.harvestingNotes}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genNotes">Other notes: </label>
                    <textarea type="text" name="genNotes" required className="form-control"
                        proptype="varchar"
                        defaultValue={crop.genNotes}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <div className="buttonDiv">
                <button type="submit" id="cropButton"
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewCrop()
                    }}
                    className="btn btn-primary submitButton">
                    {editMode ? "Save Updates" : "Create Crop"}
                </button>

            </div>
        </form>
    )
}