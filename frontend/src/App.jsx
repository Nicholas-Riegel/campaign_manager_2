import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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
import Dice from './components/Dice/Dice';
import Notes from './components/Notes/Notes';

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

  const handleEditCampaign = (navigate, campaign) => {
    setSelectedCampaign(campaign);
    navigate('/edit'); // Navigate to edit page
  };

  const handleDeleteCampaign = async (campaignId) => {
    try {
      await campaignService.deleteCampaign(campaignId);
      getAllCampaigns();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateCampaign = async (navigate, campaign) => {
    try {
      await campaignService.updateCampaign(campaign, campaign._id);
      getAllCampaigns();
      navigate('/campaigns'); // Navigate back to campaigns list after updating
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
          <Route 
            path="/campaigns" 
            element={
              <CampaignWrapper 
                campaignList={campaignList} 
                handleCreate={handleCreateCampaign} 
                handleEditCampaign={handleEditCampaign} 
                handleDeleteCampaign={handleDeleteCampaign} 
                characters={characters} 
                places={places} 
              />
            } 
          />
          <Route path="/characters" element={<Characters characters={characters} />} />
          <Route path="/places" element={<Places places={places} />} />
          <Route path="/dice" element={<Dice />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/create" element={<CreateCampaign handleCreate={handleCreateCampaign} characters={characters} places={places} />} />
          <Route path="/createPlace" element={<CreatePlace />} />
          <Route path="/createCharacter" element={<CreateCharacter />} />
          <Route 
            path="/show" 
            element={
              <Show 
                selectedCampaign={selectedCampaign} 
                handleDeleteCampaign={handleDeleteCampaign} 
              />
            } 
          />
          <Route 
            path="/edit" 
            element={
              <UpdateWrapper 
                handleUpdateCampaign={handleUpdateCampaign} 
                selectedCampaign={selectedCampaign} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

const CampaignWrapper = (props) => {
  const navigate = useNavigate();
  
  return (
    <Campaigns 
      {...props} 
      handleEditCampaign={(campaign) => props.handleEditCampaign(navigate, campaign)} 
    />
  );
};

const UpdateWrapper = (props) => {
  const navigate = useNavigate();

  return (
    <Update 
      {...props} 
      handleUpdateCampaign={(campaign) => props.handleUpdateCampaign(navigate, campaign)} 
    />
  );
};

export default App;
