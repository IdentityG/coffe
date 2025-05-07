'use client';

import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaCoffee } from 'react-icons/fa';

// Create a custom icon using React Icons (rendered to HTML)
const createCustomIcon = (color = '#D4A24E') => {
  // Create a custom div element with the icon
  const customIcon = L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      color: ${color}; 
      font-size: 32px; 
      filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
      display: flex;
      align-items: center;
      justify-content: center;
      ">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M192 0C85.97 0 0 85.97 0 192c0 77.41 26.97 99.03 172.3 309.7c9.531 13.77 29.91 13.77 39.44 0C357 291 384 269.4 384 192C384 85.97 298 0 192 0zM192 272c-44.18 0-80-35.82-80-80S147.8 112 192 112s80 35.82 80 80S236.2 272 192 272z"></path>
      </svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  
  return customIcon;
};

// Custom marker component with animation
const AnimatedMarker = ({ position, project, isActive, setActiveMarker }) => {
  // Create different colored icons based on project type
  const getIconColor = () => {
    switch(project.type) {
      case 'Education': return '#D4A24E'; // caramel
      case 'Infrastructure': return '#3B82F6'; // blue
      case 'Agriculture': return '#10B981'; // green
      case 'Processing': return '#8B5CF6'; // purple
      case 'Community': return '#EF4444'; // red
      default: return '#D4A24E'; // default caramel
    }
  };

  return (
    <Marker 
      position={position} 
      icon={createCustomIcon(isActive ? '#6B4226' : getIconColor())}
      eventHandlers={{
        click: () => setActiveMarker(project.id),
        mouseover: () => setActiveMarker(project.id),
        mouseout: () => setActiveMarker(null)
      }}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-serif font-bold text-coffee-dark">{project.name}</h3>
          <p className="text-sm text-caramel">{project.region}</p>
          <div className="flex items-center gap-1 text-xs text-coffee-light mt-1">
            <FaCoffee />
            <span>{project.type}</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

const Map = ({ projects, activeMarker, setActiveMarker }) => {
  const markersRef = useRef(null);

  return (
    <MapContainer 
      center={[10, 0]} 
      zoom={2} 
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <div ref={markersRef}>
        {projects.map((project) => (
          <AnimatedMarker
            key={project.id}
            position={project.position}
            project={project}
            isActive={activeMarker === project.id}
            setActiveMarker={setActiveMarker}
          />
        ))}
      </div>
    </MapContainer>
  );
};

export default Map;