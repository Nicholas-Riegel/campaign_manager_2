
function Show({selectedCampaign, handleDelete, selectPage}) {
    return (
      <>
          <h1>{selectedCampaign.name}</h1>
          <h2>{selectedCampaign.system}</h2>
          <button onClick={()=>handleDelete(selectedCampaign._id)}>Delete</button>
          <button onClick={()=>selectPage('edit')}>Edit</button>
      </>
    )
  }
  
  export default Show