import React from 'react';

export const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
    <circle cx="12" cy="12" r="12" fill="#1877F2" className="icon-bg" />
    <path d="M15.36 12H13v7.54h-3.13V12H8.38v-2.61h1.49V7.67c0-2.07 1-3.32 3.4-3.32h2.24v2.54h-1.42c-1.04 0-1.09.4-1.09 1.13v1.37h2.5L15.36 12z" fill="#FFF" />
  </svg>
);

export const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" className={className} style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
    <defs>
      <radialGradient id={`ig-grad-${size}`} cx="30%" cy="100%" r="100%">
        <stop offset="0%" stopColor="#FEDA77"/>
        <stop offset="25%" stopColor="#F58529"/>
        <stop offset="50%" stopColor="#DD2A7B"/>
        <stop offset="75%" stopColor="#8134AF"/>
        <stop offset="100%" stopColor="#515BD4"/>
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="1024" height="1024" rx="230" fill={`url(#ig-grad-${size})`} className="icon-bg" />
    <rect x="230" y="230" width="564" height="564" rx="140" stroke="#FFF" strokeWidth="65"/>
    <circle cx="512" cy="512" r="135" stroke="#FFF" strokeWidth="65"/>
    <circle cx="680" cy="344" r="45" fill="#FFF"/>
  </svg>
);

export const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
    <circle cx="12" cy="12" r="12" fill="#25D366" className="icon-bg" />
    <path d="M12.04 5.92c-3.12 0-5.65 2.53-5.65 5.65 0 1 .26 1.96.72 2.76L6 18l3.77-1.11c.78.42 1.68.66 2.62.66 3.12 0 5.65-2.53 5.65-5.65S15.16 5.92 12.04 5.92zm3.1 8.2c-.14.4-.8.76-1.14.8-.35.04-.84.14-2.84-.66-2.42-1-3.95-3.48-4.07-3.64-.12-.16-.96-1.3-.96-2.48s.62-1.76.84-2 .5-.26.66-.26c.16 0 .32 0 .46.02.16 0 .38-.06.6.48.24.56.76 1.86.82 1.98.06.12.1.28 0 .44-.1.16-.16.26-.32.44-.16.18-.34.42-.48.56-.16.18-.34.38-.14.72.2.34.88 1.46 1.9 2.36 1.3 1.16 2.38 1.54 2.72 1.7.34.16.54.14.74-.08.2-.22.86-1 .1 1.28.24.28.46.36.72.48.26.12.38.16.54.12.16-.04.46-.2.62-.4s.16-.4.12-.44c-.06-.06-.2-.08-.46-.22z" fill="#FFF"/>
  </svg>
);

export const LinkedInIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
    <circle cx="12" cy="12" r="12" fill="#0A66C2" className="icon-bg" />
    <path d="M8.2 17.5H5.8V9.7H8.2v7.8zM7 8.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm11 8.9h-2.4v-4.1c0-1 0-2.2-1.4-2.2-1.4 0-1.6 1.1-1.6 2.1v4.2h-2.4V9.7h2.3v1h.1c.3-.6 1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.4z" fill="#FFF"/>
  </svg>
);

export const MailIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
    <circle cx="12" cy="12" r="12" fill="#EA4335" className="icon-bg" />
    <path d="M17 8H7c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm-1 2l-4 2.5L8 10V9l4 2.5L16 9v1z" fill="#FFF"/>
  </svg>
);

export const GithubIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
    <circle cx="12" cy="12" r="12" fill="#181717" className="icon-bg" />
    <path fillRule="evenodd" clipRule="evenodd" d="M12 5.5c-3.58 0-6.5 2.92-6.5 6.5 0 2.87 1.86 5.3 4.44 6.16.33.06.45-.14.45-.31v-1.1c-1.8.39-2.18-.87-2.18-.87-.3-.75-.72-.96-.72-.96-.58-.4.04-.39.04-.39.65.05.99.66.99.66.57.98 1.5.7 1.87.53.06-.41.22-.7.4-.86-1.44-.16-2.96-.72-2.96-3.2 0-.71.25-1.29.67-1.74-.07-.16-.29-.82.06-1.72 0 0 .54-.17 1.77.66a6.1 6.1 0 0 1 3.22 0c1.23-.83 1.77-.66 1.77-.66.35.9.13 1.56.07 1.72.42.45.67 1.03.67 1.74 0 2.49-1.52 3.03-2.96 3.2.23.2.43.58.43 1.16v1.73c0 .18.12.38.45.31A6.5 6.5 0 0 0 18.5 12c0-3.58-2.92-6.5-6.5-6.5z" fill="#FFF"/>
  </svg>
);

export const GlobeIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
    <circle cx="12" cy="12" r="12" fill="#8B5CF6" className="icon-bg" />
    <path d="M12 4.5A7.5 7.5 0 1 0 19.5 12 7.5 7.5 0 0 0 12 4.5zm0 1.5c1.47 0 2.8.52 3.86 1.39l-2.05 2.05V8.5h-1.5v2h-1.5v-2H9.86l-2.05-2.05A6.5 6.5 0 0 1 12 6zm-5.18 2.65l1.86 1.86A4.5 4.5 0 0 0 7.5 12h-1.5a6.01 6.01 0 0 1 .82-3.35zM6 12h1.5a4.5 4.5 0 0 0 1.18 3.01l-1.86 1.86A6.01 6.01 0 0 1 6 12zm6 6c-1.47 0-2.8-.52-3.86-1.39l2.05-2.05v.94h1.5v-2h1.5v2h.95l2.05 2.05A6.5 6.5 0 0 1 12 18zm5.18-2.65l-1.86-1.86A4.5 4.5 0 0 0 16.5 12h1.5a6.01 6.01 0 0 1-.82 3.35zM18 12h-1.5a4.5 4.5 0 0 0-1.18-3.01l1.86-1.86A6.01 6.01 0 0 1 18 12z" fill="#FFF"/>
  </svg>
);
