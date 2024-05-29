import { useNavigate, useParams } from "react-router-dom"
import './CharacterShow.css'

function CampaignShow({charactersArray, handleDeleteCharacter}) {

  const Navigate = useNavigate()
  const params = useParams()

  // find the character in the charactersArray that has the same ID as the characterId in the URL
  const selectedCharacter = charactersArray.find(character => character._id === params.characterId)
  
  // this is necessary to handle the case where the user refreshes the page; otherwise sometimes they get blank screen becase 'selectedCharacter' is not set
  if (!selectedCharacter) {
    return <p>Loading...</p>;
  }

  return (
    <div id="character-show-wrapper">
      <div id="character-show-container">
        <h1>Character: {selectedCharacter.characterName}</h1>
        <p>Class: {selectedCharacter.characterClass}</p>
        <p>Race: {selectedCharacter.characterRace}</p>
        <div id="button-container">
          <button onClick={()=>handleDeleteCharacter(selectedCharacter._id)}>Delete</button>
          <button onClick={()=>Navigate(`/character/${selectedCharacter._id}/edit`)}>Edit</button>
        </div>
      </div>
    </div>
  )
}
  
  export default CampaignShow