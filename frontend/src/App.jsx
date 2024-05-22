import { useState, useEffect } from "react"
import * as campaignService from './services/campaignService'
import Nav from "./components/Nav/Nav"
import Home from './components/Home/Home'
import Create from './components/Create/Create'
import Show from './components/Show/Show'
import Update from "./components/Udate/Update"

function App() {

  const [campaignList, setCampaignList] = useState([])
  const [page, setPage] = useState('home')
  const [selectedCampaign, setSelectedCampaign] = useState({})

  const getAllCampaigns = async () => {
    const allCampaigns = await campaignService.index()
    setCampaignList(allCampaigns)
  }

  useEffect(()=>{
    getAllCampaigns()
  }, [])

  const selectPage = (page) => {
    setPage(page)   
  }

  const handleCreate = async (campaign) => {
    await campaignService.create(campaign)
    getAllCampaigns()
    setPage('home')
  }

  const handleSelectCampaign = (selection) => {
    setSelectedCampaign(selection)
    setPage('show')  
  }

  const handleDelete = async (campaignId) => {
    await campaignService.deleteCampaign(campaignId)
    await getAllCampaigns()
    setPage('home')
  }

  const handlePageSelection = (page) => {
    setPage(page)
  }

  const handleUpdate = async (campaign) => {
    await campaignService.updateCampaign(campaign, campaign._id)
    await getAllCampaigns()
    setPage('home')
  }

  return (
    <>
      <Nav {...{selectPage}}/>
      <h1>Campaign Management System</h1>
      {page === 'home' && <Home {...{campaignList, handleSelectCampaign}}/>}
      {page === 'create' && <Create {...{handleCreate}}/>}
      {page === 'show' && <Show {...{selectedCampaign, handleDelete, handlePageSelection}}/>}
      {page === 'edit' && <Update {...{handleUpdate, selectedCampaign}}/>}
    </>
  )
}

export default App