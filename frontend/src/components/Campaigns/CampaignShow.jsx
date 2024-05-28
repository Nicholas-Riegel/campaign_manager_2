import { useNavigate, useParams } from "react-router-dom"

function CampaignShow({campaignsArray, charactersArray, handleDeleteCampaign}) {

  const Navigate = useNavigate()
  const params = useParams()

  const selectedCampaign = campaignsArray.find(campaign => campaign._id === params.campaignId)
  
  if (!selectedCampaign) {
    return <p>Loading...</p>;
  }

  const campaignCharacters = charactersArray.filter(character => selectedCampaign.campaignCharacters.includes(character._id))

  return (
    <>
      <h1>Campaign: {selectedCampaign.campaignName}</h1>
      <h2>System: {selectedCampaign.campaignSystem}</h2>
      <h2>Characters:</h2>
        <ul>
        {campaignCharacters.map((character, i) => (
          <li key={i}>{character.characterName}</li>
        ))}
        </ul>
      <button onClick={()=>handleDeleteCampaign(selectedCampaign._id)}>Delete</button>
      <button onClick={()=>Navigate(`/campaign/${selectedCampaign._id}/edit`)}>Edit</button>
    </>
  )
}
  
  export default CampaignShow