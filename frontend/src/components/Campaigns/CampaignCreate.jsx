import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CampaignCreate({handleCreateCampaign}) {

    const Navigate = useNavigate()

    const initialState = {
        name: '',
        system: ''
    }

    const [campaign, setCampaign] = useState(initialState)

    const handleChange = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateCampaign(campaign)
        setCampaign(initialState)
        Navigate('/campaigns')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Campaign Name:</label>
                <input 
                    type="text"
                    name='name'
                    id='name'
                    onChange={handleChange}
                    value={campaign.name} />
                <label htmlFor="system">Campaign Description:</label>
                <input 
                    type="text"
                    name='system'
                    id='system'
                    onChange={handleChange}
                    value={campaign.system} />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default CampaignCreate