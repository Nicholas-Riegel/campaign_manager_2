import {useState} from 'react'

function Update({handleUpdate, selectedCampaign}) {

    const [campaign, setCampaign] = useState(selectedCampaign)
    
    const handleChange = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdate(campaign)
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
                <label htmlFor="system">Campaign System:</label>
                <input 
                    type="text"
                    name='system'
                    id='system'
                    onChange={handleChange}
                    value={campaign.system} />
                <button type='submit'>Update</button>
            </form>
        </>
    )
}

export default Update