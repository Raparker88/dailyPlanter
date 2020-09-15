import React, { useState, useEffect } from "react"


export const UsersContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

 
    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${ id }`)
            .then(res => res.json())
    }

    return (
        <UsersContext.Provider value={{
            users, getUsers, getUserById
        }}>
            {props.children}
        </UsersContext.Provider>
    )
}