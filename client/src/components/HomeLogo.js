import React from 'react'
import ChickenTinder from './img/ChickenTinder.png'

export default function HomeLogo() {
    return (
        <div style={{
            display:'flex',
            flexDirection:'column', 
            alignItems:'center', 
            justifyContent:'center', 
            borderRadius:'20px', 
            border:'3px solid black',
            padding:'30px',
            textAlign:'center',
            }}>
            <h1 style={{margin:'40px'}}>Chicken Tinder</h1>
            <img src={ChickenTinder} style={{maxHeight:'300px'}} alt='Logo'></img>
            <p style={{margin:'40px 10px', maxWidth:'70%'}}>Don't waste time being hungry! Find out what everyone wants to eat NOW!</p>
        </div>
    )
}


