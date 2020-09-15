import React, { useState } from "react"


export const FrostDatesContext = React.createContext()

export const FrostDatesProvider = (props) => {
    const [stations, setStations] = useState([])
    const [springProbs, setSpringProbs] = useState([])
    const [fallProbs, setFallProbs] = useState([])

    const getNearestStations = (lat, lon) => {
        return fetch(`https://api.farmsense.net/v1/frostdates/stations/?lat=${lat}&lon=${lon}`)
            .then(res => res.json())
            .then(setStations)
    }

    const getSpringProbabilities = (stationId) => {
        return fetch(`https://api.farmsense.net/v1/frostdates/probabilities/?station=${stationId}&season=1`)
            .then(res => res.json())
            .then(setSpringProbs)
    }
    const getFallProbabilities = (stationId) => {
        return fetch(`https://api.farmsense.net/v1/frostdates/probabilities/?station=${stationId}&season=2`)
            .then(res => res.json())
            .then(setFallProbs)
    }



    return (
        <FrostDatesContext value={{
            stations, getNearestStations, springProbs, getSpringProbabilities, fallProbs, getFallProbabilities
        }}>
            {props.children}
        </FrostDatesContext>
    )
}
