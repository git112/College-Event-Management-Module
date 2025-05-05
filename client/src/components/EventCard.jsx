import { useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../context/AuthContext';

const EventCard = ({ event, onView, onEdit, onDelete }) => {
  const { user } = useContext(AuthContext);
  const isOrganizer = user && event.organizer._id === user._id;

  const formattedDate = format(new Date(event.date), 'MMMM dd, yyyy');

  const getEventTypeIcon = (type) => {
    switch(type) {
      case 'Academic': return '📚';
      case 'Cultural': return '🎭';
      case 'Sports': return '🏆';
      case 'Workshop': return '🔧';
      default: return '📅';
    }
  };

  return (
    <div className="card event-card">
      {event.imageUrl ? (
        <img
          src={`http://localhost:5000${event.imageUrl}`}
          alt={event.title}
          className="event-image"
        />
      ) : (
        <div className="event-image" style={{
          background: `linear-gradient(135deg, var(--primary-light), var(--primary-dark))`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '80px'
        }}>
          {getEventTypeIcon(event.eventType)}
        </div>
      )}

      <div className="event-body">
        <h3 className="event-title">{event.title}</h3>
        <div className="event-details">
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Type:</strong> {event.eventType}</p>
        </div>
      </div>

      <div className="event-footer">
        <button
          className="btn"
          onClick={() => onView(event)}
        >
          View Details
        </button>
        {isOrganizer && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => onEdit(event)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(event._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
