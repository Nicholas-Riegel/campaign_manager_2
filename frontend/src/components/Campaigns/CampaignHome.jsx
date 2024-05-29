import { useNavigate } from 'react-router-dom';
import './CampaignHome.css'

function CampaignHome({campaignsArray}) {

    const Navigate = useNavigate()

    return (
      <div id='campaign-home-wrapper'>
            <h1>Campaigns</h1>
            <ul>
                {campaignsArray.map((campaign, i)=>(
                    <li key={i} onClick={()=>Navigate(`/campaign/${campaign._id}`)}>{campaign.campaignName}</li>
                ))}
            </ul>
            <button onClick={()=>Navigate('/campaign/new')}>Create New Campaign</button>
      </div>
    )
  }
  
  export default CampaignHome