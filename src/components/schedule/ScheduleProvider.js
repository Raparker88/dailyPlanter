import React, { useState, useEffect } from "react"


export const ScheduledPlantingsContext = React.createContext()

export const ScheduledPlantingsProvider = (props) => {
    const [scheduledPlantings, setScheduledPlantings] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getScheduledPlantings = () => {
        return fetch("http://localhost:8088/scheduledPlantings")
            .then(res => res.json())
            .then(setScheduledPlantings)
    }

    const addScheduledPlanting = planting => {
        return fetch("http://localhost:8088/scheduledPlantings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(planting)
        })
            .then(getScheduledPlantings)
    }
   
    const deleteScheduledPlanting = plantingId => {
        return fetch(`http://localhost:8088/scheduledPlantings/${plantingId}`, {
            method: "DELETE"
        })
            .then(getScheduledPlantings)
    }
    const updateScheduledPlanting = planting => {
        return fetch(`http://localhost:8088/scheduledPlantings/${planting.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(planting)
        })
            .then(getScheduledPlantings)
    }
    const getScheduledPlantingById = (id) => {
        return fetch(`http://localhost:8088/scheduledPlantings/${ id }`)
            .then(res => res.json())
    }

    return (
        <ScheduledPlantingsContext.Provider value={{
            scheduledPlantings, addScheduledPlanting, getScheduledPlantings, setTerms, 
            searchTerms, deleteScheduledPlanting, updateScheduledPlanting, getScheduledPlantingById
        }}>
            {props.children}
        </ScheduledPlantingsContext.Provider>
    )
}