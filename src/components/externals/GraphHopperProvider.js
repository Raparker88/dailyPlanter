import React, { useState } from "react"


export const LatLonContext = React.createContext()

export const LatLonProvider = (props) => {
    const [latLonObj, setlatLonObj] = useState({})

    const getLatLon = (city, state) => {
        return fetch(`https://graphhopper.com/api/1/geocode?q=${city}+${state}&locale=us&debug=true&key=1fbc757e-9e23-42e1-9601-ca9ec738d3e2`)
            .then(res => res.json())
            .then(response => response.hits[0].point)
            .then((response) => {
                setlatLonObj(response)
            })
            
            
            
            
    }


    return (
        <LatLonContext.Provider value={{
            latLonObj, getLatLon
        }}>
            {props.children}
        </LatLonContext.Provider>
    )
}