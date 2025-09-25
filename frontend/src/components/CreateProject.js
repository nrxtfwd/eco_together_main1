import React, { useState } from 'react'
import data from '../location.json'
import toast from 'react-hot-toast'
import api from '../axios'
import { useNavigate } from 'react-router-dom'
import filter from '../filter.js'

const CreateProject = () => {
    const [country, setCountry] = useState('Albania')
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        completed: false,
        location: 'Albania'
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Submit attempt")

        if (!formData.name || !formData.desc || !formData.location) {
            toast.error("All fields need to be filled!")
            console.log("Validation checked!")
            return;
        }

        formData.name = filter(formData.name)
        formData.desc = filter(formData.desc)

        try {
            const newProject = await api.post(`/project/${localStorage.getItem('userid')}`, {
                ...formData,
                "userid": localStorage.getItem("userid")
            })
            navigate('/projects')
            console.log(newProject)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='create-project'>
            <form onSubmit={handleSubmit}>
                <h2>Create A Project</h2>
                <span>Project Title</span>
                <input 
                    type="text"
                    placeholder="Enter a title for your project..."
                    value={formData.name}
                    onChange={e => setFormData(p => {
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
                        return {
                            ...p,
                            desc: e.target.value
                        }
                    })}
                />

                <span>Project Location</span>
                <select
                    value={formData.location}
                    onChange={e => {
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

                <button className='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateProject
