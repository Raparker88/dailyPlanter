import React from "react"
import { Route, Router } from "react-router-dom"
import { CropProvider } from "./crops/CropProvider"
import { CropList } from "./crops/CropList"
import { CropForm } from "./crops/CropForm"
import { CropDetails } from "./crops/CropDetail"
import { CropSearch } from "./crops/CropSearch"
import { ScheduledPlantingsProvider } from "./schedule/ScheduleProvider"
import { SeedScheduleForm } from "./schedule/ScheduleForm"
import { LatLonProvider } from "./externals/GraphHopperProvider"
import { UserProvider } from "./users/UserDataProvider"
import { FrostDatesProvider } from "./externals/FrostDateProvider"
import { FrostDateTable } from "./schedule/FrostDateTable"
import { LogProvider } from "./log/LogProvider"
import { LogForm } from "./log/LogForm"
import { LogList } from "./log/LogList"
import { WeatherProvider } from "./externals/WeatherProvider"
import { TaskList } from "./home/TaskList"
import { ScheduleList } from "./schedule/ScheduleList"
import { Chart } from "./chart/Chart"
import { CropImageProvider } from "./crops/ImageProvider"


export const ApplicationViews = (props) => {
    return (
        <>
            <UserProvider>
                <WeatherProvider>
                    <ScheduledPlantingsProvider>
                        <CropProvider>
                            <Route exact path="/" render={
                                props => <>
                                    <TaskList {...props}/>
                                </>
                            }>
                                </Route>
                        </CropProvider>
                    </ScheduledPlantingsProvider>
                </WeatherProvider>
            </UserProvider>
            <CropProvider>
                <LogProvider>
                    <Route exact path="/log" render={
                        props => <LogForm {...props}/>
                    }/>
                    <Route path="/log/archives" render={
                        props => <LogList {...props}/>
                    }/>
                    <Route path="/log/edit/:logId(\d+)" render={
                        props => <LogForm {...props} />
                } />
                </LogProvider>
            </CropProvider>
            <ScheduledPlantingsProvider>
                <CropProvider>
                    <LatLonProvider>
                        <FrostDatesProvider> 
                            <UserProvider>
                                <Route exact path="/schedule" render={
                                    props => <><SeedScheduleForm {...props}/>
                                    <FrostDateTable/>
                                    </>
                                }/>
                            </UserProvider>
                        </FrostDatesProvider>
                    </LatLonProvider>
                </CropProvider>
            </ScheduledPlantingsProvider>
            <ScheduledPlantingsProvider>
                <CropProvider>
                    <Route path="/schedule/fullSchedule" render={
                        props => <ScheduleList {...props}/>
                    }/>
                </CropProvider>
            </ScheduledPlantingsProvider>
            <CropProvider>
                <CropImageProvider>
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
                        props => 
                        <CropDetails {...props}/> 
                    }/>
                    <Route path="/crops/edit/:cropId(\d+)" render={
                            props => <CropForm {...props} />
                    } />
                </CropImageProvider>
            </CropProvider>
            <LogProvider>
                <CropProvider>
                    <Route path="/chart" render={
                            props => <Chart {...props} />
                    } />
                </CropProvider>
            </LogProvider>
        </>
    )
}