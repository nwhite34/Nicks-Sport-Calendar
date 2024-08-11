import React, { useState, useEffect } from "react";
import axios from "axios";

const ContentPageOne = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/ufc-events');
      console.log('Fetched events:', response.data); // Debugging line
      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setError('Unexpected data structure');
      }
    } catch (err) {
      setError('Failed to load UFC events');
      console.error('Error fetching events:', err); // Debugging line
    }
  };

  const fetchEventDetails = async (eventid) => {
    try {
      const response = await axios.get(`/api/ufc-event/${eventid}`);
      console.log('Fetched event details:', response.data); // Debugging line
      setSelectedEvent(response.data);
      setSelectedEventId(eventid); // Set the selected event ID
    } catch (err) {
      setError('Failed to load UFC event details');
      console.error('Error fetching event details:', err); // Debugging line
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const isPastDate = (date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming UFC Events</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="w-full max-w-3xl space-y-4">
        {events.length > 0 ? (
          events
            .filter(event => !isPastDate(event.DateTime)) // Filter out past events
            .map((event) => (
              <li
                key={event.EventId}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 flex flex-col"
              >
                <div>
                  <h2 className="text-xl font-semibold">{event.Name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">Date: {new Date(event.DateTime).toLocaleDateString()}</p>
                  <button
                    onClick={() => fetchEventDetails(event.EventId)}
                    className="mt-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 dark:hover:bg-blue-400 transition duration-300"
                  >
                    View Details
                  </button>
                </div>

                {selectedEventId === event.EventId && selectedEvent && (
                  <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex-grow">
                    <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                    <p className="text-lg mb-2">Name: {selectedEvent.Name}</p>
                    <p className="text-lg mb-2">Date: {new Date(selectedEvent.DateTime).toLocaleDateString()}</p>
                    <p className="text-lg mb-2">Venue: {selectedEvent.Venue}</p>
                    <p className="text-lg mb-2">Location: {selectedEvent.Location}</p>
                    <p className="text-lg mb-2">Betting Odds:</p>
                    <ul className="list-disc pl-5">
                      {selectedEvent.BettingOdds && selectedEvent.BettingOdds.map((odds, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-400">
                          {odds.FighterName}: {odds.Odds}
                        </li>
                      ))}
                    </ul>
                    <p className="text-lg mb-2">Fight Card:</p>
                    <ul className="list-disc pl-5">
                      {selectedEvent.Fighters && selectedEvent.Fighters.map(fighter => (
                        <li key={fighter.Id} className="text-gray-600 dark:text-gray-400">
                          {fighter.Name} vs {fighter.Opponent}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="https://www.ufc.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 dark:hover:bg-blue-400 transition duration-300"
                    >
                      View on UFC Official Website
                    </a>
                  </div>
                )}
              </li>
            ))
        ) : (
          <p>No events found.</p>
        )}
      </ul>
    </div>
  );
};

export default ContentPageOne;
