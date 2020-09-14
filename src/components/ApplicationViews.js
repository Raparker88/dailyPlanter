import React from "react"
import { Route, Router } from "react-router-dom"
import { CropProvider } from "./crops/CropProvider"
import { CropList } from "./crops/CropList"
import { CropForm } from "./crops/CropForm"
import { CropDetails } from "./crops/CropDetail"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route path="/home">
                </Route>
            <Route path="/schedule">
                </Route>
            <Route path="/log">
                </Route>
            <CropProvider>
                <Route exact path="/crops" render={
                    props => <CropList {...props}/>
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