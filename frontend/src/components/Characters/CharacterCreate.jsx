import { useState } from 'react'

function CharacterCreate({handleCreateCharacter}) {

    const initialState = {
        name: '',
        description: ''
    }

    const [character, setCharacter] = useState(initialState)

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
                <label htmlFor="name">Character Name:</label>
                <input 
                    type="text"
                    name='name'
                    id='name'
                    onChange={handleChange}
                    value={character.name} />
                <br />
                <label htmlFor="class">Character Class:</label>
                <input 
                    type="text"
                    name='class'
                    id='class'
                    onChange={handleChange}
                    value={character.class} />
                <br />
                <label htmlFor="race">Character Race:</label>
                <input 
                    type="text"
                    name='race'
                    id='race'
                    onChange={handleChange}
                    value={character.race} />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default CharacterCreate