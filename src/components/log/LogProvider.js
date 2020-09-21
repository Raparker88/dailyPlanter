import React, { useState, useEffect } from "react"


export const LogContext = React.createContext()

export const LogProvider = (props) => {
    const [logs, setLogs] = useState([])
    

    const getLogs = () => {
        return fetch("http://localhost:8088/logs")
            .then(res => res.json())
            .then(setLogs)
    }

    const addLog = log => {
        return fetch("http://localhost:8088/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        })
            .then(getLogs)
    }
   
    const deleteLog = logId => {
        return fetch(`http://localhost:8088/logs/${logId}`, {
            method: "DELETE"
        })
            .then(getLogs)
    }
    const updateLog = log => {
        return fetch(`http://localhost:8088/logs/${log.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        })
            .then(getLogs)
    }
    const getLogById = (id) => {
        return fetch(`http://localhost:8088/logs/${ id }`)
            .then(res => res.json())
    }

    return (
        <LogContext.Provider value={{
            logs, addLog, getLogs, deleteLog, updateLog, getLogById
        }}>
            {props.children}
        </LogContext.Provider>
    )
}