import React, { useEffect, useState } from 'react'
import {CheckAuth} from "../components/CheckAuth"
import ProfileMenu from "../components/ProfileMenu"
import styles from "../styles/profile.module.css"
import axios from 'axios';

function profile() {

    const [name, setName] = useState()

    useEffect(() => {
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/get-name", withCredentials: true})
            .then(res => {
                if (res.data){
                    setName(res.data)
                }
            })
            .catch(err => console.log(err))

        CheckAuth().then(res => {
            if(!res){
                window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL)
            }
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h2 className={styles.helloText}>Hi, {name}</h2>
            <div className={styles.profileMenuContainer}>
                <ProfileMenu name={name}/>
            </div>
        </div>
    )
}

export default profile
