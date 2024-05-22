import { useState } from 'react'

function Create({handleCreate}) {

    const [campaign, setCampaign] = useState({
        name: '',
        system: ''
    })

    const handleChange = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreate(campaign)
        setCampaign({
            name: '',
            system: ''
        })
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

export default Create