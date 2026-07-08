import React from 'react';
import { Users, CheckCircle, Star, Award } from 'lucide-react';

const impactStats = [
  {
    icon: <Users size={32} />,
    value: '100+',
    label: 'Clients',
    sublabel: 'Businesses transformed'
  },
  {
    icon: <CheckCircle size={32} />,
    value: '965+',
    label: 'Projects Completed',
    sublabel: 'Successful deliveries'
  },
  {
    icon: <Star size={32} />,
    value: '98%',
    label: 'Client Satisfaction',
    sublabel: 'Average rating'
  },
  {
    icon: <Award size={32} />,
    value: '9+',
    label: 'Years Experience',
    sublabel: 'Industry expertise'
  }
];

const Impact = () => {
  return (
    <section className="impact-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Our Impact</span>
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Proven track record of delivering exceptional results
          </p>
        </div>

        <div className="impact-grid">
          {impactStats.map((stat, index) => (
            <div className="impact-card card" key={index}>
              <div className="impact-icon-wrapper">
                {stat.icon}
              </div>
              <h3 className="impact-value text-gradient">{stat.value}</h3>
              <div className="impact-label">{stat.label}</div>
              <p className="impact-sublabel">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
