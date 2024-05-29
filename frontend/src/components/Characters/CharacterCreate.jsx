import { useState } from 'react'

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
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default CharacterCreate