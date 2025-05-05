import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { createEvent } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const CreateEvent = () => {
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setError(null);
      await createEvent(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div style={{ fontSize: '50px', marginBottom: '20px' }}>🔒</div>
        <h3 style={{ color: 'var(--primary-dark)', marginBottom: '10px' }}>Authentication Required</h3>
        <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>You must be logged in to create an event</p>
        <Link to="/login" className="btn">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 className="page-header">Create New Event</h1>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="card" style={{ padding: '30px' }}>
        <EventForm onSubmit={handleSubmit} buttonText="Create Event" />
      </div>
    </div>
  );
};

export default CreateEvent;
