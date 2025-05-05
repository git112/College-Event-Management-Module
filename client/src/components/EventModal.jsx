import { format } from 'date-fns';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{event.title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {event.imageUrl ? (
            <img
              src={`http://localhost:5000${event.imageUrl}`}
              alt={event.title}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                marginBottom: '24px',
                borderRadius: 'var(--border-radius)'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '200px',
              background: `linear-gradient(135deg, var(--primary-light), var(--primary-dark))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '80px',
              marginBottom: '24px',
              borderRadius: 'var(--border-radius)'
            }}>
              {getEventTypeIcon(event.eventType)}
            </div>
          )}

          <div style={{
            marginBottom: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
            padding: '20px',
            backgroundColor: '#f8f9ff',
            borderRadius: 'var(--border-radius)'
          }}>
            <div>
              <p style={{ fontSize: '18px', marginBottom: '8px' }}>
                <strong>Date</strong>
              </p>
              <p>{formattedDate}</p>
            </div>
            <div>
              <p style={{ fontSize: '18px', marginBottom: '8px' }}>
                <strong>Location</strong>
              </p>
              <p>{event.location}</p>
            </div>
            <div>
              <p style={{ fontSize: '18px', marginBottom: '8px' }}>
                <strong>Type</strong>
              </p>
              <p>{event.eventType}</p>
            </div>
            <div>
              <p style={{ fontSize: '18px', marginBottom: '8px' }}>
                <strong>Organizer</strong>
              </p>
              <p>{event.organizer.username}</p>
            </div>
          </div>

          <div>
            <h3 style={{
              color: 'var(--primary-dark)',
              marginBottom: '16px',
              fontSize: '22px',
              position: 'relative',
              paddingBottom: '10px'
            }}>
              Description
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '50px',
                height: '3px',
                background: 'var(--primary-color)',
                borderRadius: '2px'
              }}></span>
            </h3>
            <p style={{ lineHeight: '1.7', color: 'var(--text-light)' }}>{event.description}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
