import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import { getEvents, deleteEvent } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleView = (event) => {
    setSelectedEvent(event);
  };

  const handleEdit = (event) => {
    navigate(`/edit-event/${event._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(event => event._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete event');
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
      <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Loading Events...</h3>
      <p style={{ color: 'var(--text-light)' }}>Please wait while we fetch the latest events</p>
    </div>
  );

  if (error) return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
      <h3 style={{ color: 'var(--danger-color)', marginBottom: '10px' }}>Error</h3>
      <p style={{ color: 'var(--text-light)' }}>{error}</p>
    </div>
  );

  return (
    <div className="container">
      

      <div className="search-container">
        <input
          type="text"
          placeholder="Search events by title, location or type..."
          className="form-control"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h3 style={{ color: 'var(--text-light)', marginBottom: '10px' }}>No events found</h3>
          <p style={{ color: 'var(--text-light)' }}>Try adjusting your search or check back later for new events</p>
        </div>
      ) : (
        <div className="event-grid">
          {filteredEvents.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;
