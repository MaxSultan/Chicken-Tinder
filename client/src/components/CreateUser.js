import React, { useState, useEffect, } from 'react'
import CodeDisplay from './CodeDisplay'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function CreateUser(props) {
    const code = props.location.state.code
    const [username, setUsername] = useState('')
    const [swipe, setSwipe] = useState(false)
    const [groupId, setGroupId] = useState('')
    const [matchNum, setMatchNum] = useState(0)

    async function getGroupId(){
         //get the group id by passing the group code to the backend
         try{
         const res = await Axios.get(`/api/groups`)
             const id = res.data.filter(group => group.name ===`${code}`)
             setGroupId(id[0].id)
         } catch(err){console.log(err)}
    }
    useEffect(() => {
        getGroupId()
    },[code])

    const createUser = (group_id) => {
        console.log('create user called')
        Axios.post(`/api/groups/${group_id}/users`, {username: username})
        .then(res => {
            setSwipe(!swipe)
        })
        .catch(err => console.log(err))
    }

    const updateGroup = (group_id) => {
        Axios.put(`/api/groups/${group_id}`, {name: code, match_number: matchNum})
        .then(res => console.log(res))
        .catch(err=> console.log(err))
    }

    async function handleSubmit(e){
        e.preventDefault()
        updateGroup(groupId)
        createUser(groupId)
    }

    return (
        <div>
            <CodeDisplay code={code}/>
        <div style={styles.layout}>
            <h2 style={{fontSize:'80px', }}>Create a user</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={{padding:'10px'}}> Enter a username</label>
                <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                />
                <label style={{padding:'10px'}}>Enter the number of group members that need to like a restaurant before a match is created</label>
                 <select
                value={matchNum}
                onChange={(e) => setMatchNum(e.target.value)}
                style={styles.input}>
                    <option selected value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>

                <button type='submit' style={styles.button}>Start Swiping</button>
            </form>
            {swipe && <Redirect to={{
                pathname: '/Swipe',
                state: { 
                    code: code,
                    username: username,
                    groupId: groupId,
                    matchNum: matchNum,
                 }
            }}/>}
        </div>
        </div>
    )
}

const styles = {
    button: {
        padding:'15px',
        fontSize:'25px',
        backgroundColor:'#E9692C',
        borderRadius:'30px',
        border: 'none',
        margin:'30px',
        boxShadow:'2px 2px 2px 2px #e1e1e1'
    },
    form: {
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center', 
        padding:'20px', 
        width:'auto',
    },
    layout: {
        height:'80vh', 
        width:'100vw', 
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'space-around', 
        alignItems:'center',
    },
    input: {
        width:'200px', 
        height:'40px', 
        fontSize:'30px', 
        marginBottom:'20px',
    }
}