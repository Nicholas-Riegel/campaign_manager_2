import { useNavigate, useParams } from "react-router-dom"

function CampaignShow({campaignsArray, handleDeleteCampaign}) {

  const Navigate = useNavigate()
  const params = useParams()

  const selectedCampaign = campaignsArray.find(campaign => campaign._id === params.campaignId)
  
  return (
    <>
      <h1>Campaign: {selectedCampaign.name}</h1>
      <h2>System: {selectedCampaign.system}</h2>
      <button onClick={()=>handleDeleteCampaign(selectedCampaign._id)}>Delete</button>
      <button onClick={()=>Navigate(`/campaign/${selectedCampaign._id}/edit`)}>Edit</button>
    </>
  )
}
  
  export default CampaignShow