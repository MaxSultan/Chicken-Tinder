import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from "axios"

export default function JoinGroup(props) {
    const [user, setUser] = useState("");
    const [groupCode, setGroupCode] = useState("");
    const [groupId, setGroupId] = useState("")
    const [swipe, setSwipe] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        getGroupId();
        if(groupCode.match(/#[0-9][0-9][0-9][0-9][0-9][0-9]/) === null) {
            alert('Code was the wrong format. Please check your code and try again')
            return 
        } 
        if (groupId === '') return 
        setSwipe(!swipe)
    }

    const getGroupId = () => {
        Axios.get(`/api/groups/`)
        .then( (res) => {
           const groupObj = res.data.filter(group => group.name === `${groupCode}`);
           console.log(groupObj)
           if(groupObj.length > 0) {
            setGroupId(groupObj[0].id)
            addUser(groupObj[0].id);
            setSwipe(!swipe)
            } else {
                alert('Your code did not match a known group code') 
               return;
            }
        })
        .catch(err => console.log(err))
    }

    const addUser = (group_id) => {
        Axios.post(`api/groups/${group_id}/users`, {username: user})
        .then((res) => console.log('user added:', res.data))
        .catch( (err) => console.log(err))
    }

    return (
        <div style={styles.format}>
            <h1 style={{fontSize:'80px', margin:'20px'}}>Join Group</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label>Input your username: </label>
                    <input 
                        value={user}
                        required 
                        onChange={(e) => setUser(e.target.value)}
                        style={styles.input}
                        />
                <label>Input your 6 digit group code inlude the hashtag: </label>
                <input 
                    pattern={`#[0-9][0-9][0-9][0-9][0-9][0-9]`}
                    required 
                    value={groupCode} 
                    onChange={(e) => setGroupCode(e.target.value)}
                    style={styles.input}
                    />
                <button style={styles.button} type="submit">Start Swiping!</button>
            </form>
            {swipe && <Redirect to={{
                pathname: '/Swipe',
                state: { 
                    code: groupCode,
                    username: user,
                    groupId: groupId,
                 }
            }}/>}
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
    format: {
        height: '80vh',
        width:'100vw',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    form: {
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center',
        justifyContent:'space-around',
        minHeight:'300px',
    },
    input: {
        width:'200px', 
        height:'40px', 
        fontSize:'30px', 
        margin:'20px',
    }
}
