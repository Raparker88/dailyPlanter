import React, { useContext, useEffect, useState } from "react"
import { FrostDatesContext } from "../externalAPIs/FrostDateProvider"
import { LatLonContext } from "../externalAPIs/GraphHopperProvider"
import { UsersContext } from "../users/UserDataProvider"
import "./Schedule.css"

export const FrostDateTable = () => {
    const { getUserById } = useContext(UsersContext)
    const { latLonObj, getLatLon } = useContext(LatLonContext)
    const { stations, getNearestStations, springProbs, getSpringProbabilities, 
        fallProbs, getFallProbabilities} = useContext(FrostDatesContext)
    
    const [currentUserObj, setCurrentUserObj] = useState({})

    useEffect(() => {
        const currentUserId = parseInt(localStorage.getItem("seedPlan_user"))
        getUserById(currentUserId)
            .then(setCurrentUserObj)
            .then(() => {
                getLatLon(currentUserObj.id)
            }).then(() => {
                getNearestStations(latLonObj.lat, latLonObj.lon)
            })
    }, [])

    return (
        <>
            {stations.map(s => <div>{s.name}</div>)}
        </>
    )
}