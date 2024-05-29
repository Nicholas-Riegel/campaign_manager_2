import { useNavigate, useParams } from "react-router-dom";
import './CampaignShow.css';

function CampaignShow({ campaignsArray, charactersArray, handleDeleteCampaign }) {

  const navigate = useNavigate();
  const params = useParams();

  // Find the campaign that matches the id in the URL
  const selectedCampaign = campaignsArray.find(campaign => campaign._id === params.campaignId);

  // If the campaign hasn't been found yet, return a loading message (super important because otherwise page will be blank on reload)
  if (!selectedCampaign) {
    return <p>Loading...</p>;
  }

  // Filter the characters array to only include characters that are in the selected campaign
  const campaignCharacters = charactersArray.filter(character => selectedCampaign.campaignCharacters.includes(character._id));

  return (
    <div id="campaign-show-wrapper">
      <div id="campaign-show-container">
        <h1>Campaign: {selectedCampaign.campaignName}</h1>
        <h1>System: {selectedCampaign.campaignSystem}</h1>
              <legend>Characters:</legend>
              <ul>
                {campaignCharacters.map((character, i) => (
                  <li key={i}>{character.characterName}</li>
                ))}
              </ul>
            <div className="button-group">
              <button type="button" onClick={() => handleDeleteCampaign(selectedCampaign._id)}>Delete</button>
              <button type="button" onClick={() => navigate(`/campaign/${selectedCampaign._id}/edit`)}>Edit</button>
            </div>
      </div>
    </div>
  );
}

export default CampaignShow;
