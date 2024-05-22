
function Home({campaignList, handleSelectCampaign}) {
    return (
      <>
          <ul>
              {campaignList.map((campaign, i)=>(
                  <li key={i} onClick={()=>handleSelectCampaign(campaign)}>{campaign.name}</li>
              ))}
          </ul>
      </>
    )
  }
  
  export default Home