import { useNavigate, useParams } from "react-router-dom"

function CampaignShow({charactersArray, handleDeleteCharacter}) {

  const Navigate = useNavigate()
  const params = useParams()

  const selectedCharacter = charactersArray.find(character => character._id === params.characterId)
  
  if (!selectedCharacter) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Character: {selectedCharacter.characterName}</h1>
      <p>Class: {selectedCharacter.characterClass}</p>
      <p>Race: {selectedCharacter.characterRace}</p>
      <button onClick={()=>handleDeleteCharacter(selectedCharacter._id)}>Delete</button>
      <button onClick={()=>Navigate(`/character/${selectedCharacter._id}/edit`)}>Edit</button>
    </>
  )
}
  
  export default CampaignShow