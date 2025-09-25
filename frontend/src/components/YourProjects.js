import React, { useEffect, useState } from 'react'
import api from '../axios'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const YourProjects = () => {
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                const projsRes = await api.get(`/projects/user/${localStorage.getItem('userid')}`)
                setProjects(projsRes.data)
                console.log(projsRes)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [])

    return (
        <div>
            <h1 className='yph1'>Your Projects</h1>
            {loading && <Loading />}
            <div className='your-projects'>
                {
                    projects.map(e => {
                        return (
                            <button className='project-card' onClick={x => navigate(`/project-details/${e._id}`)}>
                                <h3>{e.name}</h3>
                                <h4>{e.desc}</h4>
                                <p>Completed: {e.completed ? 'Yes' : 'No'}</p>
                                <p>Location: {e.location}</p>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default YourProjects
