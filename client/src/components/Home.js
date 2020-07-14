import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import HomeLogo from './HomeLogo'



export default function Home(props) {
    const [groupCode, setGroupCode] = useState('')
    const [addingUser, setAddingUser] = useState(false)
    const [joiningGroup, setJoiningGroup] = useState(false)

    const generateCode = () => {
        return `#${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`
    }

    const createAGroup = () => {
        console.log('create group')
        const code = generateCode()
        console.log(code)
        Axios.post('api/groups', {name: code })
        .then(res => {
            setGroupCode(res.data.name)
            setAddingUser(true)
        })
        .catch(err => console.log(err))
    }

    return (
        <div style={{height:'100vh',width:'100vw', display:'flex',justifyContent:'space-around', alignItems:'center'}}>
            <div style={{ width:'70vw', display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                <HomeLogo/>
                <div style={{height:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <button style={styles.button} onClick={() => createAGroup()}>Create a Group</button>
                    {addingUser && <Redirect to={{
                    pathname: '/CreateUser',
                    state: { code: groupCode, }
                }}/>}
                {joiningGroup && <Redirect to={{
                    pathname: '/JoinGroup',
                    state: { code: groupCode, }
                }}/>}
                    <button style={styles.button} onClick={() => setJoiningGroup(!joiningGroup)}>Join Group</button>
                </div>
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
    }
}

