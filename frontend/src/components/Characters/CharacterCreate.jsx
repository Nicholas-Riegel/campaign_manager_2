import { useState } from 'react'
import './CharacterCreate.css'

function CharacterCreate({handleCreateCharacter}) {

    const initialState = {
        characterName: '',
        characterClass: '',
        characterRace: '',
        characterCampaigns: [] // not used at the moment: for future implementation
    }

    const [character, setCharacter] = useState(initialState)

    // handle changes to the input fields
    const handleChange = (e) => {
        setCharacter(prevCharacter => ({...prevCharacter, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateCharacter(character)
        setCharacter(initialState)
    }

    return (
        <div id='character-create-wrapper'>
            <div id="character-create-div">
            <h1>Create a New Character</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="characterName">Character Name:</label>
                <input 
                    type="text"
                    name='characterName'
                    id='characterName'
                    onChange={handleChange}
                    value={character.characterName} />
                <label htmlFor="characterClass">Character Class:</label>
                <input 
                    type="text"
                    name='characterClass'
                    id='characterClass'
                    onChange={handleChange}
                    value={character.characterClass} />
                <label htmlFor="characterRace">Character Race:</label>
                <input 
                    type="text"
                    name='characterRace'
                    id='characterRace'
                    onChange={handleChange}
                    value={character.characterRace} />
                <button type='submit'>Submit</button>
            </form>
            </div>
        </div>
    )
}

export default CharacterCreate