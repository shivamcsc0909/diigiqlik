import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LogoItem from './LogoItem';
import './TrustedMarquee.css';

const brands = [
  { name: "KIA", logo: "/kia.png"},
  { name: "Kotak Mahindra Bank", logo: "/kotak.png" },
  { name: "MMTCPAMP", logo: "/mmtc.png" },
  { name: "Amplifon", logo: "/amplifon.png" },
  { name: "Godrej aer", logo: "/godrej.png" },
  { name: "Bisleri", logo: "/bisleri.png" },
  { name: "DS Group", logo: "/dsgroup.png" },
  { name: "With Clarity", logo: "/withclarity.png" },
  { name: "M3M", logo: "/m3m.png" },
  { name: "MRJB Group", logo: "/mrjb.png" },
  { name: "Subh Sankalp", logo: "/subh sankalp.png" },
  { name: "Norton", logo: "/norton.png" },
  { name: "Trustpilot", logo: "/trustpilot.png" },
  { name: "Clutch", logo: "/clutch.png" },
  { name: "Google Reviews", logo: "/greview.png" },
  { name: "Inbound Marketing", logo: "/inbound.png" },
  { name: "Google partners", logo: "/google.svg" }
];

const TrustedMarquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Move left to right: Start at -50% and animate to 0%
    const anim = gsap.fromTo(
      marquee,
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 35, // Adjust speed based on number of items
        repeat: -1,
      }
    );

    const handleMouseEnter = () => anim.pause();
    const handleMouseLeave = () => anim.play();

    marquee.addEventListener('mouseenter', handleMouseEnter);
    marquee.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      anim.kill();
      marquee.removeEventListener('mouseenter', handleMouseEnter);
      marquee.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="trusted-section">
      <div className="container">
        <h2 className="trusted-title">
          Trusted & <span className="text-gradient">Supported By</span>
        </h2>
        
        <div className="marquee-container">
          <div className="marquee-fade marquee-fade-left"></div>
          <div className="marquee-fade marquee-fade-right"></div>
          
          <div className="marquee-content" ref={marqueeRef}>
            {/* First sequence */}
            <div className="marquee-track">
              {brands.map((brand, index) => (
                <LogoItem key={`track1-${index}`} brand={brand} />
              ))}
            </div>
            {/* Cloned sequence for infinite seamless loop */}
            <div className="marquee-track" aria-hidden="true">
              {brands.map((brand, index) => (
                <LogoItem key={`track2-${index}`} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedMarquee;
