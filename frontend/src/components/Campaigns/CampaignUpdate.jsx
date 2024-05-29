import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CampaignUpdate.css';

function CampaignUpdate({ campaignsArray, charactersArray, handleUpdateCampaign }) {

    const params = useParams();
    const initialState = {
        campaignName: '',
        campaignSystem: '',
        campaignCharacters: []
    };

    const [campaign, setCampaign] = useState(initialState);

    // This useEffect hook sets the campaign object when there are changes to campaignsArray, charactersArray, or the campaignId in the URL.
    useEffect(() => {
        const selectedCampaign = campaignsArray.find(campaign => campaign._id === params.campaignId);
        setCampaign(selectedCampaign);
    }, [campaignsArray, charactersArray, params.campaignId]);

    // Handle the case where the user refreshes the page; return a loading message if the campaign is not set.
    if (!campaign) {
        return <p>Loading...</p>;
    }

    // Handle changes to the input fields
    const handleChange = (e) => {
        setCampaign({ ...campaign, [e.target.name]: e.target.value });
    }

    // Handle changes to the checkbox inputs
    const handleCheckboxChange = (event) => {
        const characterId = event.target.value;
        const isChecked = event.target.checked;

        setCampaign(prevCampaign => {
            const newCharacterIds = isChecked
                ? [...prevCampaign.campaignCharacters, characterId]
                : prevCampaign.campaignCharacters.filter(id => id !== characterId);
            return {
                ...prevCampaign,
                campaignCharacters: newCharacterIds
            };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateCampaign(campaign);
        setCampaign(initialState);
    }

    return (
        <div id='campaign-update-wrapper'>
            <div id="campaign-update-div">
                <h1>Update Campaign</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="campaignName">Campaign Name:</label>
                    <input 
                        className='text-input'
                        type="text"
                        name='campaignName'
                        id='campaignName'
                        onChange={handleChange}
                        value={campaign.campaignName} />
                    <label htmlFor="campaignSystem">Campaign System:</label>
                    <input 
                        className='text-input'
                        type="text"
                        name='campaignSystem'
                        id='campaignSystem'
                        onChange={handleChange}
                        value={campaign.campaignSystem} />
                    <fieldset className='checkbox-fieldset'>
                        <legend>Select Characters:</legend>
                        {charactersArray.map((character, i) => (
                            <div key={i} className="checkbox-container">
                                <label className='checkbox-label'>
                                    <input 
                                        className='checkbox-input'
                                        type="checkbox" 
                                        value={character._id}
                                        checked={campaign.campaignCharacters.includes(character._id)}
                                        onChange={handleCheckboxChange} />
                                    {character.characterName}
                                </label>
                            </div>
                        ))}
                    </fieldset>
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default CampaignUpdate;
