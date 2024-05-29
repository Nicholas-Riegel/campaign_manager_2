# Campaign Manager Backend

This is the backend code for a Campaign Manager application. It provides API endpoints for managing campaigns and characters using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/campaign-manager-backend.git
   ```

2. Install the dependencies:

   ```bash
   cd campaign-manager-backend
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

   ```
   PORT=3000
   MONGO_URI=your-mongodb-uri
   ```

   Replace `your-mongodb-uri` with the connection URI for your MongoDB database.

## Usage

1. Start the server:

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:3000`.

2. Use an API testing tool like Postman to interact with the API endpoints.

## API Endpoints

The following API endpoints are available:

### Campaigns

- `GET /api/campaigns`: Get all campaigns
- `GET /api/campaigns/:id`: Get a single campaign by ID
- `POST /api/campaigns`: Create a new campaign
- `PUT /api/campaigns/:id`: Update a campaign
- `DELETE /api/campaigns/:id`: Delete a campaign

### Characters

- `GET /api/characters`: Get all characters
- `POST /api/characters`: Create a new character
- `PUT /api/characters/:id`: Update a character
- `DELETE /api/characters/:id`: Delete a character

## Database Schema

The application uses the following database schema:

### Campaign Schema

- `campaignName` (String, required): The name of the campaign
- `campaignSystem` (String, required): The system used for the campaign
- `campaignCharacters` (Array of ObjectId, ref: 'Character'): The characters associated with the campaign

### Character Schema

- `characterName` (String, required): The name of the character
- `characterClass` (String, required): The class of the character
- `characterRace` (String, required): The race of the character
- `characterCampaign` (ObjectId, ref: 'Campaign', default: null): The campaign associated with the character



## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).