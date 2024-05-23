import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateCampaign from '../CreateCampaign/CreateCampaign';

function Campaigns({ campaignList, handleSelectCampaign, handleCreate, handleEditCampaign, handleDeleteCampaign, characters, places }) {
  const navigate = useNavigate();

  const handleEdit = (campaign) => {
    handleEditCampaign(campaign);
    navigate('/edit');
  };

  return (
    <div>
      <h2>Campaigns</h2>
      <ul>
        {campaignList.map((campaign) => (
          <li key={campaign._id}>
            <div>
              <span onClick={() => handleSelectCampaign(campaign)}>
                {campaign.name} - {campaign.system}
              </span>
              <button onClick={() => handleEdit(campaign)}>Edit</button>
              <button onClick={() => handleDeleteCampaign(campaign._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <CreateCampaign handleCreate={handleCreate} characters={characters} places={places} />
    </div>
  );
}

export default Campaigns;
