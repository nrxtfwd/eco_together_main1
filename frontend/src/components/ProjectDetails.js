import React, { useEffect, useState } from 'react'
import data from '../location.json'
import toast from 'react-hot-toast'
import api from '../axios'
import { useNavigate, useParams } from 'react-router-dom'
import filter from '../filter.js'

const ProjectDetails = () => {
    const params = useParams()
    const [changed, setChanged] = useState(false)
    const [country, setCountry] = useState('Albania')
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        completed: false,
        location: 'Albania'
    })

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get(`/project/${params['project-id']}`)
                setFormData(res.data)
            } catch (error) {
                console.log(error)
                toast.error("Failed to get project!")
            }
        }

        fetch()
    }, [])

    const navigate = useNavigate()

    const handleDelete = async (e) => {

        try {
            const newProject = await api.delete(`/project/${params['project-id']}`)
            navigate('/projects')
            toast.success("Project successfully deleted!")
            console.log(newProject)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        formData.name = filter(formData.name)
        formData.desc = filter(formData.desc)

        try {
            const newProject = await api.put(`/project/${params['project-id']}`, {
                ...formData,
                "userid": localStorage.getItem("userid")
            })
            navigate('/projects')
            toast.success("Project successfully updated!")
            console.log(newProject)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='project-container'>
            <div className='create-project'>
                <form onSubmit={handleSubmit}>
                    <h2>Project Details</h2>
                    <span>Project Title</span>
                    <input 
                        type="text"
                        placeholder="Enter a title for your project..."
                        value={formData.name}
                        onChange={e => setFormData(p => {
                            setChanged(true)
                            return {
                                ...p,
                                name: e.target.value
                            }
                        })}
                    />

                    <span>Project Description</span>
                    <textarea 
                        placeholder="Whats ur project about?"
                        value={formData.desc}
                        onChange={e => setFormData(p => {
                            setChanged(true)
                            return {
                                ...p,
                                desc: e.target.value
                            }
                        })}
                    />

                    <div className='checkbox-div'>
                        <span>Completed</span>
                        <input 
                            type="checkbox"
                            className='checkbox'
                            value={formData.completed}
                            onChange={e => setFormData(p => {
                                setChanged(true)
                                return {
                                    ...p,
                                    completed: e.target.value
                                }
                            })}
                        />
                    </div>

                    <span>Project Location</span>
                    <select
                        value={formData.location}
                        onChange={e => {
                            setChanged(true)
                            setFormData(p => {
                                return {
                                    ...p,
                                    location: e.target.value
                                }
                            })
                        }}
                    >
                        {data.ref_country_codes.map(e => {
                            return (
                                <option value={e.country}>{e.country}</option>
                            )
                        })}
                    </select>

                    {
                        changed && (
                            <button className='submit'>Save Changes</button>
                        )
                    }
                </form>
            </div>
            
            <button className='delete' onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ProjectDetails
