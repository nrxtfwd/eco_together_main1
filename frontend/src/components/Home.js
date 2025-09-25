import React, { createElement, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import api from '../axios.js'
import { ReactComponent as World } from '../world.svg'
import data from '../location.json'
import HomeSidebar from './HomeSidebar.js'
const Home = ({tooltip}) => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projs = await api.get('/projects')
                setProjects(projs.data)
                console.log(projs)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProjects()
    }, [])

    return (
        <div>
            <HomeSidebar projects={projects} />
            <World />
            <div className='world-key'>
                <p className='red'>Red - No Sustainability Projects</p>
                <p className='green'>Green - One or more Projects</p>
            </div>
            {
                projects.map(e => {
                    const allCountries = document.querySelectorAll('path')
                    var path = null

                    allCountries.forEach(element => {
                        // element.addEventListener('mousehover', () => {
                        //     console.log("Enter")
                        //     tooltip.innerHTML = element.getAttribute("name")
                        //     tooltip.className = "tooltip visible"
                        //     console.log(tooltip)
                        // })

                        // element.addEventListener('mouseleave', () => {
                        //     if (tooltip.innerHTML !== element.getAttribute("name")) return;
                        //     tooltip.className = "tooltip hidden"
                        // })

                        const thisPath = element.classList.forEach(x => {
                            if (x.toLowerCase() == e.location.toLowerCase()) {
                                path = element
                                return x
                            }
                        })
                    })

                    if (path) {
                        path.classList = ['selectedpath']
                    }
                })
                
            }
        </div>
    )
}

export default Home

