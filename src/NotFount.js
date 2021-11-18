import React from 'react'
import { useLocation } from 'react-router-dom'

export default function NotFount() {
    const location = useLocation();
    document.title = ("Error");
    return (
        <div>
            {
                location.state ? <span>Sorry ☹️ this page is only available in desktop view.</span> :
                    <span>Error 404 :( this pade don't exist.</span>
            }
        </div>
    )
}
