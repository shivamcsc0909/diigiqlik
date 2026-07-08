import React from 'react';

const LogoItem = ({ brand }) => {
  return (
    <div className="marquee-logo-card" title={brand.name}>
      <img 
        src={brand.logo} 
        alt={brand.name} 
        className="marquee-logo-img" 
      />
    </div>
  );
};

export default LogoItem;
