import { useState, useEffect } from "react";
import * as campaignService from './services/campaignService';
import Nav from "./components/Nav/Nav";
import Home from './components/Home/Home';
import Create from './components/Create/Create';
import Show from './components/Show/Show';
import Update from "./components/Update/Update";
import CreatePlace from './components/CreatePlace/CreatePlace'; // Assuming these components exist
import CreateCharacter from './components/CreateCharacter/CreateCharacter'; // Assuming these components exist

function App() {
  const [campaignList, setCampaignList] = useState([]);
  const [page, setPage] = useState('home');
  const [selectedCampaign, setSelectedCampaign] = useState({});
  const [places, setPlaces] = useState([]);
  const [characters, setCharacters] = useState([]);

  const getAllCampaigns = async () => {
    const allCampaigns = await campaignService.indexCampaigns();
    setCampaignList(allCampaigns);
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  const selectPage = (page) => {
    setPage(page);
  };

  const handleCreateCampaign = async (campaign) => {
    await campaignService.createCampaign(campaign);
    getAllCampaigns();
    setPage('home');
  };

  const handleCreatePlace = async (place) => {
    await campaignService.createPlace(place);
    setPlaces([...places, place]);
    setPage('home');
  };

  const handleCreateCharacter = async (character) => {
    await campaignService.createCharacter(character);
    setCharacters([...characters, character]);
    setPage('home');
  };

  const handleSelectCampaign = (selection) => {
    setSelectedCampaign(selection);
    setPage('show');
  };

  const handleDeleteCampaign = async (campaignId) => {
    await campaignService.deleteCampaign(campaignId);
    await getAllCampaigns();
    setPage('home');
  };

  const handleUpdateCampaign = async (campaign) => {
    await campaignService.updateCampaign(campaign, campaign._id);
    await getAllCampaigns();
    setPage('home');
  };

  return (
    <>
      <Nav {...{ selectPage }} />
      <h1>Campaign Management System</h1>
      {page === 'home' && <Home {...{ campaignList, handleSelectCampaign, selectPage }} />}
      {page === 'create' && <Create {...{ handleCreateCampaign }} />}
      {page === 'createPlace' && <CreatePlace {...{ handleCreatePlace }} />}
      {page === 'createCharacter' && <CreateCharacter {...{ handleCreateCharacter }} />}
      {page === 'show' && <Show {...{ selectedCampaign, handleDeleteCampaign, selectPage }} />}
      {page === 'edit' && <Update {...{ handleUpdateCampaign, selectedCampaign }} />}
    </>
  );
}

export default App;
