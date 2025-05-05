import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { getEvent, updateEvent } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const EditEvent = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvent(id);
        setEvent(data);

        if (user && data.organizer._id !== user._id) {
          navigate('/');
        }
      } catch (err) {
        setError('Failed to fetch event');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEvent();
    } else {
      setLoading(false);
    }
  }, [id, user, navigate]);

  const handleSubmit = async (formData) => {
    try {
      setError(null);
      await updateEvent(id, formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update event');
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div style={{ fontSize: '50px', marginBottom: '20px' }}>🔒</div>
        <h3 style={{ color: 'var(--primary-dark)', marginBottom: '10px' }}>Authentication Required</h3>
        <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>You must be logged in to edit an event</p>
        <Link to="/login" className="btn">Sign In</Link>
      </div>
    );
  }

  if (loading) return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ fontSize: '50px', marginBottom: '20px' }}>🔄</div>
      <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Loading Event...</h3>
      <p style={{ color: 'var(--text-light)' }}>Please wait while we fetch the event details</p>
    </div>
  );

  if (error) return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ fontSize: '50px', marginBottom: '20px' }}>⚠️</div>
      <h3 style={{ color: 'var(--danger-color)', marginBottom: '10px' }}>Error</h3>
      <p style={{ color: 'var(--text-light)' }}>{error}</p>
    </div>
  );

  if (!event) return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ fontSize: '50px', marginBottom: '20px' }}>🔍</div>
      <h3 style={{ color: 'var(--primary-dark)', marginBottom: '10px' }}>Event Not Found</h3>
      <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>The event you're looking for doesn't exist or has been removed</p>
      <Link to="/" className="btn">Back to Events</Link>
    </div>
  );

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 className="page-header">Edit Event</h1>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="card" style={{ padding: '30px' }}>
        <EventForm event={event} onSubmit={handleSubmit} buttonText="Update Event" />
      </div>
    </div>
  );
};

export default EditEvent;
