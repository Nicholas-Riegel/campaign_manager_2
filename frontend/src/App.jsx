import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import * as campaignService from './services/campaignService'
import NavBar from "./components/NavBar/NavBar"
import HomePage from './components/Home/HomePage'
import CampaignHome from './components/Campaigns/CampaignHome'
import CampaignCreate from './components/Campaigns/CampaignCreate'
import CampaignShow from './components/Campaigns/CampaignShow'
import CampaignUpdate from "./components/Campaigns/CampaignUpdate"

function App() {

  const Navigate = useNavigate()

  const [campaignsArray, setCampaignsArray] = useState([])

  const getAllCampaigns = async () => {
    const allCampaigns = await campaignService.index()
    setCampaignsArray(allCampaigns)
  }

  useEffect(()=>{
    getAllCampaigns()
  }, [])

  const handleCreateCampaign = async (campaign) => {
    await campaignService.create(campaign)
    getAllCampaigns()
  }

  const handleDeleteCampaign = async (campaignId) => {
    await campaignService.deleteCampaign(campaignId)
    await getAllCampaigns()
    Navigate('/campaigns')
  }

  const handleUpdateCampaign = async (campaign) => {
    await campaignService.updateCampaign(campaign, campaign._id)
    await getAllCampaigns()
    Navigate('/campaigns')
  }

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        
        <Route path='/campaigns' element={<CampaignHome {...{campaignsArray}}/>}/>
        <Route path='/campaign/new' element={<CampaignCreate {...{handleCreateCampaign}}/>}/>
        <Route path='/campaign/:campaignId' element={<CampaignShow {...{campaignsArray, handleDeleteCampaign}}/>}/>
        <Route path='/campaign/:campaignId/edit' element={<CampaignUpdate {...{campaignsArray, handleUpdateCampaign}}/>}/>

      </Routes>
    </>
  )
}

export default App