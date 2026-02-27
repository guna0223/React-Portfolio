import "../css/MyLocation.css";

function MyLocation({ onClose }) {
  const defaultLocation = "BTM 1st Stage, Bengaluru, Karnataka, India";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3888.810208054715!2d77.6094444!3d12.9199167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU1JzExLjciTiA3N8KwMzYnMzQuMCJF!5e0!3m2!1sen!2sin!4v1772216545317!5m2!1sen!2sin";

  return (
    <div className="radar-container">
      <button className="radar-close-btn" onClick={onClose} aria-label="Close location panel">
        ✕
      </button>
      
      <div className="radar-location-display">
        <div className="radar-marker">
          <div className="radar-waypoint">
            <div className="radar-waypoint-inner"></div>
          </div>
          <div className="radar-pulse"></div>
          <div className="radar-pulse-2"></div>
          <div className="radar-scan"></div>
        </div>
        
        <div className="location-text-container">
          <h3 className="location-label">MY LOCATION</h3>
          <p className="location-city">{defaultLocation}</p>
        </div>
      </div>

      <div className="map-container">
        <iframe
          src={mapEmbedUrl}
          title="My Location - BTM 1st Stage, Bengaluru"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default MyLocation;
