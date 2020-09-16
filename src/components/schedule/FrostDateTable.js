import React, { useContext, useEffect, useState } from "react"
import { FrostDatesContext } from "../externals/FrostDateProvider"
import { LatLonContext } from "../externals/GraphHopperProvider"
import { UsersContext } from "../users/UserDataProvider"
import "./Schedule.css"

export const FrostDateTable = () => {
    const { getUserById } = useContext(UsersContext)
    const { latLonObj, getLatLon } = useContext(LatLonContext)
    const { stations, getNearestStations, springProbs, getSpringProbabilities, fallProbs, getFallProbabilities} = useContext(FrostDatesContext)
    
    const [chosenStationId, setChosenStation] = useState("")

    useEffect(() => {
        const currentUserId = parseInt(localStorage.getItem("seedPlan_user"))
        getUserById(currentUserId)
            .then(res => {
                getLatLon(res.city, res.state)
            })
    }, [])

    useEffect(()=> {
        getNearestStations(latLonObj.lat, latLonObj.lng)
    }, [latLonObj])

    useEffect(() => {
        if(stations.length > 0){
            setChosenStation(stations[0].id)
        }
    },[stations])

    useEffect(() => {
        if(chosenStationId != ""){
            getSpringProbabilities(chosenStationId)
            .then(() => {
                getFallProbabilities(chosenStationId)
            })
        }

    }, [chosenStationId])

    const stringToDate = (str, seasonId) => {
        const season = parseInt(seasonId)
        const today = new Date()
        let mon = 0
        let day = 0

        if(str.slice(0,1) != '0'){
			mon = parseInt(str.slice(0,2));
		} else {
			mon = parseInt(str.slice(1,2));
        }
        if(str.slice(2,3) != '0'){
			day = parseInt(str.slice(2,4));
		} else {
			day = parseInt(str.slice(3,4));
        }
        if((season == 1 && today.getMonth() <= mon-1) || (season == 2 && today.getMonth() <= mon-1)){
			return new Date(today.getFullYear(),mon-1,day);
		} else if((season == 1 && today.getMonth() > mon-1) || (season == 2 && today.getMonth() > mon-1)){
			return new Date(today.getFullYear()+1,mon-1,day);
		} 
    }

    return (
        <>
            <h2>Frost Dates</h2>
            <h3>Choose a Weather Station</h3>
            {stations.map(s => {
                return (<label key={s.id}>
                    <input type="radio" name="station" key={s.id} value={s.id} checked={s.id === chosenStationId}
                        onChange={() => {
                            setChosenStation(`${s.id}`)
                        }}/>{s.name} {Math.round(s.distance*100)/100} miles away
                </label>)
            })}
            <h3>Spring Possibilities</h3>
            <table>
                <tr><th>Threshold</th><th>90%</th><th>80%</th><th>70%</th><th>60%</th><th>50%</th><th>40%</th><th>30%</th><th>20%</th><th>10%</th></tr>
                    {springProbs.map(sp => {
                        return(
                            <tr key={sp.id}>
                                <td>{sp.temperature_threshold}°F</td>
                                <td>{stringToDate(sp.prob_90, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_80, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_70, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_60, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_50, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_40, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_30, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_20, sp.season_id).toDateString()}</td>
                                <td>{stringToDate(sp.prob_10, sp.season_id).toDateString()}</td>
                            </tr>
                        )
                    })}
                
            </table>
            <h3>Fall Possibilities</h3>
            <table>
                <tr><th>Threshold</th><th>90%</th><th>80%</th><th>70%</th><th>60%</th><th>50%</th><th>40%</th><th>30%</th><th>20%</th><th>10%</th></tr>
                    {fallProbs.map(fp => {
                        return(
                            <tr key={fp.id}>
                                <td>{fp.temperature_threshold}°F</td>
                                <td>{stringToDate(fp.prob_90, fp.season_id).toDateString()}</td>
                                <td>{stringToDate(fp.prob_80, fp.season_id).toDateString()}</td>
                                <td>{stringToDate(fp.prob_70, fp.season_id).toDateString()}</td>
                                <td>{stringToDate(fp.prob_60, fp.season_id).toDateString()}</td>
                                <td>{stringToDate(fp.prob_50, fp.season_id).toDateString()}</td>
                                <td>{stringToDate(fp.prob_40, fp.season_id).toDateString()}</td>
                                <td>{stringToDate(fp.prob_30, fp.season_id).toDateString()}</td>
                                <td>{stringToDate(fp.prob_20, fp.season_id).toDateString()}</td>
                                <td>{stringToDate(fp.prob_10, fp.season_id).toDateString()}</td>
                            </tr>
                        )
                    })}
                
            </table>
        </>
    )
}