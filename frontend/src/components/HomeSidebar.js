import React from 'react'
import { useState } from 'react'

const HomeSidebar = ({ projects }) => {
    const [sidebar, setSidebar] = useState(true)
    var element = (
        <button className='close-sidebar' onClick={e => setSidebar(true)}>All Projects</button>
    )

    if (sidebar) {
        element = (
            <div className="home-sidebar">
                {
                    projects.map(e => {
                        return (
                            <div key={e._id} className='home-sidebar-element'>
                                <p>Project: {e.name}</p>
                                <p>Details: {e.desc}</p>
                                <p>Based From: {e.location}</p>
                            </div>
                        )
                    })
                }
                <button className='close-sidebar' onClick={e => setSidebar(false)}>
                    Close
                </button>
            </div>
        )
    }

    return element
}

export default HomeSidebar
