import React from 'react';
import { Star } from 'lucide-react';

const LogoCard = ({ company }) => {
  const renderLogo = () => {
    switch (company.name) {
      case "Google":
        return (
          <div className="logo-google" style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </div>
        );
      case "HubSpot":
        return (
          <div className="logo-hubspot" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', backgroundColor: '#ff7a59', borderRadius: '12px', color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>
            H
          </div>
        );
      case "Clutch":
        return <div className="logo-clutch" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>Clutch</div>;
      case "Trustpilot":
        return (
          <div className="logo-trustpilot" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem', fontWeight: 800, color: '#1a1a1a' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', backgroundColor: '#00b67a', color: 'white', borderRadius: '6px' }}>
              <Star size={18} fill="white" strokeWidth={0} />
            </div>
            Trustpilot
          </div>
        );
      default:
        return <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{company.name}</div>;
    }
  };

  return (
    <div className="marquee-card">
      <div className="marquee-card-logo">
        {renderLogo()}
      </div>
      {company.text && <div className="marquee-card-text">{company.text}</div>}
      {company.rating && (
        <div className="marquee-card-rating">
          {[...Array(company.rating)].map((_, i) => (
            <Star key={i} size={16} fill="#FBBC05" strokeWidth={0} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LogoCard;
