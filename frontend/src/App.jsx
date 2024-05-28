import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import * as campaignService from './services/campaignService'
import * as characterService from './services/characterService'

import NavBar from "./components/NavBar/NavBar"
import HomePage from './components/Home/HomePage'

import CampaignHome from './components/Campaigns/CampaignHome'
import CampaignCreate from './components/Campaigns/CampaignCreate'
import CampaignShow from './components/Campaigns/CampaignShow'
import CampaignUpdate from "./components/Campaigns/CampaignUpdate"

import CharacterHome from './components/Characters/CharacterHome'
import CharacterCreate from './components/Characters/CharacterCreate'
import CharacterShow from './components/Characters/CharacterShow'
import CharacterUpdate from './components/Characters/CharacterUpdate'

function App() {

  const Navigate = useNavigate()

  const [campaignsArray, setCampaignsArray] = useState([])
  const [charactersArray, setCharactersArray] = useState([])

  // CAMPAIGN FUNCTIONS

  const getAllCampaigns = async () => {
    const allCampaigns = await campaignService.index()
    setCampaignsArray(allCampaigns)
  }

  const handleCreateCampaign = async (campaign) => {
    await campaignService.create(campaign)
    getAllCampaigns()
    Navigate('/campaigns')
  }
  
  const handleDeleteCampaign = async (campaignId) => {
    await campaignService.deleteCampaign(campaignId)
    await getAllCampaigns()
    Navigate('/campaigns')
  }
  
  const handleUpdateCampaign = async (campaign) => {
    await campaignService.updateCampaign(campaign, campaign._id)
    await getAllCampaigns()
    Navigate(`/campaign/${campaign._id}`)
  }
  
  // CHARACTER FUNCTIONS

  const getAllCharacters = async () => {
    const allCharacters = await characterService.index()
    setCharactersArray(allCharacters)
  }

  const handleCreateCharacter = async (character) => {
    await characterService.create(character)
    await getAllCharacters()
    Navigate('/characters')
  }
  
  const handleDeleteCharacter = async (characterId) => {
    await characterService.deleteCharacter(characterId)
    await getAllCharacters()
    Navigate('/characters')
  }
  
  const handleUpdateCharacter = async (character) => {
    await characterService.updateCharacter(character, character._id)
    await getAllCharacters()
    Navigate(`/character/${character._id}`)
  }
  
  useEffect(()=>{
    getAllCampaigns()
    getAllCharacters()
  }, [])
  
  return (
    <>
      <NavBar/>
      <Routes>

        {/* HOME ROUTE */}
        <Route path='/' element={<HomePage/>}/>

        {/* CAMPAIGN ROUTES */}
        <Route path='/campaigns' element={<CampaignHome {...{campaignsArray}}/>}/>
        <Route path='/campaign/new' element={<CampaignCreate {...{ charactersArray, handleCreateCampaign}}/>}/>
        <Route path='/campaign/:campaignId' element={<CampaignShow {...{campaignsArray, charactersArray, handleDeleteCampaign}}/>}/>
        <Route path='/campaign/:campaignId/edit' element={<CampaignUpdate {...{campaignsArray, charactersArray, handleUpdateCampaign}}/>}/>
        
        {/* CHARACTER ROUTES */}
        <Route path='/characters' element={<CharacterHome {...{charactersArray}}/>}/>
        <Route path='/character/new' element={<CharacterCreate {...{handleCreateCharacter, campaignsArray}}/>}/>
        <Route path='/character/:characterId' element={<CharacterShow {...{charactersArray, campaignsArray, handleDeleteCharacter}}/>}/>
        <Route path='/character/:characterId/edit' element={<CharacterUpdate {...{charactersArray, campaignsArray, handleUpdateCharacter}}/>}/>

      </Routes>
    </>
  )
}

export default App
