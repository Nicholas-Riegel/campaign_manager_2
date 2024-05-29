import { useNavigate } from 'react-router-dom';
import './CharacterHome.css'

function CharacterHome({charactersArray}) {

    const Navigate = useNavigate()

    return (
      <div id='character-home-wrapper'>
        <div id="character-home-div">
            <h1>Characters</h1>
            <ul>
                {charactersArray.map((character, i)=>(
                    <li key={i} onClick={()=>Navigate(`/character/${character._id}`)}>{character.characterName}</li>
                ))}
            </ul>
          <button onClick={()=>Navigate('/character/new')}>Create New Character</button>
        </div>
      </div>
    )
  }
  
  export default CharacterHome