import { useNavigate } from 'react-router-dom';

function CampaignHome({campaignsArray}) {

    const Navigate = useNavigate()

    return (
      <>
          <ul>
              {campaignsArray.map((campaign, i)=>(
                  <li key={i} onClick={()=>Navigate(`/campaign/${campaign._id}`)}>{campaign.name}</li>
              ))}
          </ul>
          <button onClick={()=>Navigate('/campaign/new')}>Create New Campaign</button>
      </>
    )
  }
  
  export default CampaignHome