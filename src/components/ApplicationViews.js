import React from "react"
import { Route, Router } from "react-router-dom"
import { CropProvider } from "./crops/CropProvider"
import { CropList } from "./crops/CropList"
import { CropForm } from "./crops/CropForm"
import { CropDetails } from "./crops/CropDetail"
import { CropSearch } from "./crops/CropSearch"
import { ScheduledPlantingsProvider } from "./schedule/ScheduleProvider"
import { SeedScheduleForm } from "./schedule/ScheduleForm"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route path="/home">
                </Route>
            <Route path="/log">
                </Route>
            <ScheduledPlantingsProvider>
                <CropProvider>
                    <Route exact path="/schedule" render={
                        props => <SeedScheduleForm {...props}/>
                    }/>
                </CropProvider>
            </ScheduledPlantingsProvider>
            <CropProvider>
                <Route exact path="/crops" render={
                    props => <>
                        <CropSearch/>
                        <CropList {...props}/>
                    </>
                }/>
                <Route path="/crops/create" render={
                    props => <CropForm {...props}/>
                }/>
                <Route path="/crops/:cropId(\d+)" render={
                    props => <CropDetails {...props} />
                }/>
                <Route path="/crops/edit/:cropId(\d+)" render={
                        props => <CropForm {...props} />
                } />
            </CropProvider>
        </>
    )
}