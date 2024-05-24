import {useState} from 'react'
import {useParams} from 'react-router-dom'

function CampaignUpdate({campaignsArray, handleUpdateCampaign}) {

    const params = useParams()
    const selectedCampaign = campaignsArray.find(campaign => campaign._id === params.campaignId)
    
    const [campaign, setCampaign] = useState(selectedCampaign)

    
    const handleChange = (e) => {
        setCampaign({...campaign, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateCampaign(campaign)
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

export default CampaignUpdate