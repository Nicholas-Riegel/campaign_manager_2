import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

function CharacterUpdate({charactersArray, handleUpdateCharacter, campaignsArray}) {
    
    const params = useParams()
    const initialState = {
        characterName: '',
        characterClass: '',
        characterRace: '',
        characterCampaigns: [] // not used at the moment: for future implementation
    };
    
    const [character, setCharacter] = useState(initialState)
    

    // This useEffect hook is used to set the character object when there are any changes to the campaignsArray or charactersArray or the campaignId in the URL. This is necessary to handle the case where the user refreshes the page; otherwise sometimes they get blank screen becase 'character' is not set.
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
    
    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateCharacter(character)
        setCharacter(initialState)
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="characterName">Character Name:</label>
                <input 
                    type="text"
                    name='characterName'
                    id='characterName'
                    onChange={handleChange}
                    value={character.characterName} />
                <br />
                <label htmlFor="characterClass">Character Class:</label>
                <input 
                    type="text"
                    name='characterClass'
                    id='characterClass'
                    onChange={handleChange}
                    value={character.characterClass} />
                <br />
                <label htmlFor="characterRace">Character Race:</label>
                <input 
                    type="text"
                    name='characterRace'
                    id='characterRace'
                    onChange={handleChange}
                    value={character.characterRace} />
                <br />
                <button type='submit'>Update</button>
            </form>
        </>
    )
}


export default CharacterUpdate