import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const EventForm = ({ event, onSubmit, buttonText = 'Submit' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    eventType: 'Academic',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? format(new Date(event.date), 'yyyy-MM-dd') : '',
        location: event.location || '',
        eventType: event.eventType || 'Academic',
        image: null
      });

      if (event.imageUrl) {
        setImagePreview(`http://localhost:5000${event.imageUrl}`);
      }
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Event Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter event title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Describe your event"
          required
        ></textarea>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventType">Event Type</label>
          <select
            id="eventType"
            name="eventType"
            className="form-control"
            value={formData.eventType}
            onChange={handleChange}
            required
          >
            <option value="Academic">Academic</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Workshop">Workshop</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          className="form-control"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter event location"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">
          Event Image
          <span style={{ color: 'var(--text-light)', fontSize: '14px', marginLeft: '8px', fontWeight: 'normal' }}>
            (Optional)
          </span>
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className="form-control"
          onChange={handleImageChange}
          accept="image/*"
          style={{ padding: '8px' }}
        />
        <small style={{ color: 'var(--text-light)', display: 'block', marginTop: '6px' }}>
          Recommended image size: 1200 x 600 pixels
        </small>
      </div>

      {imagePreview && (
        <div className="form-group">
          <label>Image Preview</label>
          <div style={{
            border: '1px solid #e0e0ff',
            borderRadius: 'var(--border-radius)',
            padding: '10px',
            backgroundColor: '#fcfcff'
          }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: '100%',
                maxHeight: '250px',
                objectFit: 'cover',
                borderRadius: 'calc(var(--border-radius) - 4px)'
              }}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn"
        style={{ marginTop: '20px', minWidth: '150px' }}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default EventForm;
