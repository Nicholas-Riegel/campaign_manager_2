import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function CharacterUpdate({charactersArray, handleUpdateCharacter, campaignsArray}) {
    
    const params = useParams()
    const initialState = {
        name: '',
        campaignIds: []
    };
    
    const [character, setCharacter] = useState(initialState)
    

    // this is necessary to handle the case where the user refreshes the page; otherwise sometimes they get blank screen becase 'character' is not set
    useEffect(() => {
        const selectedCharacter = charactersArray.find(character => character._id === params.characterId);
        setCharacter(selectedCharacter);
    }, [charactersArray, campaignsArray, params.characterId]);
    
    // this is necessary to handle the case where the user refreshes the page; otherwise sometimes they get blank screen becase 'character' is not set
    if (!character) {
        return <p>Loading...</p>;
    }

    const handleChange = (e) => {
        setCharacter({...character, [e.target.name]: e.target.value})
    }
    
    const handleCheckboxChange = (event) => {
        
        const campaignId = event.target.value;
        const isChecked = event.target.checked;
        
        setCharacter(prevCharacter => {
            const newCampaignIds = isChecked
            ? [...prevCharacter.campaignIds, campaignId]
            : prevCharacter.campaignIds.filter(id => id !== campaignId);
            return {
                ...prevCharacter,
                campaignIds: newCampaignIds
            };
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateCharacter(character)
        setCharacter(initialState)
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Character Name:</label>
                <input 
                    type="text"
                    name='name'
                    id='name'
                    onChange={handleChange}
                    value={character.name} />
                <br />
                <fieldset>
                    <legend>Select Campaigns:</legend>
                    {campaignsArray.map((campaign, i) => (
                        <div key={i}>
                        <label>
                            <input 
                                type="checkbox" 
                                value={campaign._id}
                                checked={character.campaignIds.includes(campaign._id)}
                                onChange={handleCheckboxChange}/>
                            {campaign.name}
                        </label>
                        </div>
                    ))}
                    </fieldset>
                <br />
                <button type='submit'>Update</button>
            </form>
        </>
    )
}


export default CharacterUpdate