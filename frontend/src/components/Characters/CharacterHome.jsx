import { useNavigate } from 'react-router-dom';

function CharacterHome({charactersArray}) {

    const Navigate = useNavigate()

    return (
      <>
          <ul>
              {charactersArray.map((character, i)=>(
                  <li key={i} onClick={()=>Navigate(`/character/${character._id}`)}>{character.characterName}</li>
              ))}
          </ul>
          <button onClick={()=>Navigate('/character/new')}>Create New Character</button>
      </>
    )
  }
  
  export default CharacterHome