import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());

// Use environment variable for API key
const apiKey = process.env.API_KEY;

// Route to fetch the schedule of UFC events
app.get('/api/ufc-events', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.sportsdata.io/v3/mma/scores/json/Schedule/UFC/2024`,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey
        }
      }
    );
    
    // Filter events to only include those in the future
    const today = new Date();
    const futureEvents = response.data.filter(event => new Date(event.DateTime) >= today);

    res.json(futureEvents.map(event => ({
      EventId: event.EventId,
      Name: event.Name,
      DateTime: event.DateTime,
      Venue: event.Venue, // Ensure this field exists
      Location: event.Location, // Ensure this field exists
      OfficialUFCLink: event.OfficialUFCLink // Ensure this field exists
    })));
  } catch (error) {
    console.error('Error fetching UFC events:', error);
    res.status(500).json({ error: 'Failed to fetch UFC events' });
  }
});

// Route to fetch details of a specific event by eventid
app.get('/api/ufc-event/:eventid', async (req, res) => {
  const { eventid } = req.params;
  try {
    const response = await axios.get(
      `https://api.sportsdata.io/v3/mma/scores/json/Event/${eventid}`,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey
        }
      }
    );

    const event = response.data;

    // Extract relevant details from the event
    res.json({
      Name: event.Name,
      DateTime: event.DateTime,
      Venue: event.Venue, // Ensure this field exists
      Location: event.Location, // Ensure this field exists
      Fighters: event.Fighters, // Ensure this field exists
      BettingOdds: event.BettingOdds // Ensure this field exists
    });
  } catch (error) {
    console.error(`Error fetching UFC event ${eventid}:`, error);
    res.status(500).json({ error: `Failed to fetch UFC event ${eventid}` });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
