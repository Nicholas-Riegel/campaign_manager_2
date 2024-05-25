import { useNavigate, useParams } from "react-router-dom"

function CampaignShow({charactersArray, campaignsArray, handleDeleteCharacter}) {

  const Navigate = useNavigate()
  const params = useParams()

  const selectedCharacter = charactersArray.find(character => character._id === params.characterId)
  
  if (!selectedCharacter) {
    return <p>Loading...</p>;
  }

  const characterCampaigns = selectedCharacter.campaignIds.map(campaignId => campaignsArray.find(campaign => campaign._id === campaignId))
  
  return (
    <>
      <h1>Character: {selectedCharacter.name}</h1>
      <h2>Campaigns:</h2>
        <ul>
        {characterCampaigns.map((campaign, i) => (
          <li key={i}>{campaign.name}</li>
        ))}
        </ul>
      <button onClick={()=>handleDeleteCharacter(selectedCharacter._id)}>Delete</button>
      <button onClick={()=>Navigate(`/character/${selectedCharacter._id}/edit`)}>Edit</button>
    </>
  )
}
  
  export default CampaignShow