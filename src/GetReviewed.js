import React from 'react'
import './App.css'
import arrow from './arrow_left_white.svg'

export default function GetReviewed() {

    document.title = ('Video Sessions');

    return (
        <div>
            <header style={{marginBottom:"50px", display:"block"}}>
                <p className="hyperLink">Video Sessions</p>
                <p>
                If you are starting out as a UI designer or you are looking to improve in your 
                current field or if you are a front end developer and want to understand the basics 
                of UI. I’d love to help.
                </p>
            </header>
            <button>
                <img className="arrow_image" src={arrow} alt="arrow"/>
                Watch my Sessions</button>

            <p style={{marginTop:"350px"}}>
                <b>
                Frequently asked questions:<br/><br/>
                1. Who can attend the session?</b><br/>
                The sessions are designed for those who are interested in developing their career 
                in the User Interface Design. No prior knowledge is required, so anyone can join.<br/><br/>
                <b>2. What would you learn in the session?</b><br/>
                The session includes a detailed understanding of the basics of user Interface design. We’ll learn it by working on a project together. I’ll be 
                sharing the required files before the session starts and will also take your doubs at the end of the sessions.<br/><br/>
                <b>3. How long will be the session?</b><br/>
                The Session will limited to the time we take to complete that project all together. Although we’ll try to take a margin of 1 hour.<br/><br/>
                <b>4. Do I need a PC for this?</b><br/>
                Yes. We wil be builing a project together on figma, while being on a zoom call. 
                So that if you’ll be having any doubts, you can just share the screen and I’ll help you out.<br/>
            </p>
        </div>
    )
}
