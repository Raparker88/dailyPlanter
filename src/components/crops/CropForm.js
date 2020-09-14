import React, { useContext, useState, useEffect } from "react"
import { CropContext } from "./CropProvider"


export const CropForm = (props) => {
    
    const { addCrop, crops, updateCrop, getCrops } = useContext(CropContext)

    // Component state
    const [crop, setCrop] = useState({})

    // Is there a a URL parameter??
    const editMode = props.match.params.hasOwnProperty("cropId")

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
                .then(() => props.history.push("/crops"))
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
        
    }

    return (
        <form className="cropForm">
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
                    <input type="text" name="frostNotes" required className="form-control"
                        proptype="varchar"
                        placeholder="example: 2 weeks before last frost"
                        defaultValue={crop.frostNotes}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="seedingNotes">Seeding strategies: </label>
                    <textarea type="text" name="seedingNotes" className="form-control"
                        proptype="varchar"
                        defaultvalue={crop.seedingNotes}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="harvestingNotes">Harvesting strategies: </label>
                    <textarea type="text" name="harvestingNotes" className="form-control"
                        proptype="varchar"
                        defaultvalue={crop.harvestingNotes}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genNotes">Other notes: </label>
                    <textarea type="text" name="genNotes" className="form-control"
                        proptype="varchar"
                        defaultvalue={crop.genNotes}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewCrop()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Create Crop"}
            </button>
        </form>
    )
}