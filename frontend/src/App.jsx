import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as campaignService from './services/campaignService';
import NavBar from "./components/NavBar/NavBar";
import Home from './components/Home/Home';
import CreateCampaign from './components/CreateCampaign/CreateCampaign';
import Show from './components/Show/Show';
import Update from "./components/Update/Update";
import CreatePlace from './components/CreatePlace/CreatePlace';
import CreateCharacter from './components/CreateCharacter/CreateCharacter';
import Campaigns from './components/Campaigns/Campaigns';
import Characters from './components/Characters/Characters';
import Places from './components/Places/Places';

function App() {
  const [campaignList, setCampaignList] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState({});

  const getAllCampaigns = async () => {
    try {
      const allCampaigns = await campaignService.indexCampaigns();
      setCampaignList(allCampaigns);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCharacters = async () => {
    try {
      const allCharacters = await campaignService.indexCharacters();
      setCharacters(allCharacters);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPlaces = async () => {
    try {
      const allPlaces = await campaignService.indexPlaces();
      setPlaces(allPlaces);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCampaigns();
    getAllCharacters();
    getAllPlaces();
  }, []);

  const handleCreateCampaign = async (campaign) => {
    try {
      await campaignService.createCampaign(campaign);
      getAllCampaigns();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleDeleteCampaign = async (campaignId) => {
    try {
      await campaignService.deleteCampaign(campaignId);
      getAllCampaigns();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateCampaign = async (campaign) => {
    try {
      await campaignService.updateCampaign(campaign, campaign._id);
      getAllCampaigns();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns campaignList={campaignList} handleSelectCampaign={setSelectedCampaign} handleCreate={handleCreateCampaign} handleEditCampaign={handleEditCampaign} handleDeleteCampaign={handleDeleteCampaign} characters={characters} places={places} />} />
          <Route path="/characters" element={<Characters characters={characters} />} />
          <Route path="/places" element={<Places places={places} />} />
          <Route path="/dice" element={<div><h2>Dice</h2></div>} />
          <Route path="/notes" element={<div><h2>Notes</h2></div>} />
          <Route path="/create" element={<CreateCampaign handleCreate={handleCreateCampaign} characters={characters} places={places} />} />
          <Route path="/createPlace" element={<CreatePlace />} />
          <Route path="/createCharacter" element={<CreateCharacter />} />
          <Route path="/show" element={<Show selectedCampaign={selectedCampaign} handleDeleteCampaign={handleDeleteCampaign} />} />
          <Route path="/edit" element={<Update handleUpdateCampaign={handleUpdateCampaign} selectedCampaign={selectedCampaign} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
