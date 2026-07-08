import React, { useRef, useEffect } from 'react';
import { Award, Calendar } from 'lucide-react';
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  GlobeIcon,
  LinkedInIcon,
  MailIcon,
} from './ColorIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Team.css';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const teamSectionRef = useRef(null);
  const ownerRef = useRef(null);
  const employeeCardsRef = useRef([]);

  useEffect(() => {
    const teamSection = teamSectionRef.current;

    gsap.fromTo(
      teamSection,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamSection,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    if (ownerRef.current) {
      gsap.fromTo(
        ownerRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ownerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (employeeCardsRef.current.length) {
      gsap.fromTo(
        employeeCardsRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(0.4)',
          scrollTrigger: {
            trigger: teamSection,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const teamMembers = [
    {
      name: 'Shekhar Katiyar',
      role: 'Founder & CEO',
      expertise: 'Performance Marketing Expert',
      experience: '8 Years',
      image: '/shekharkatiyar.jpeg',
      description:
        'Shekhar is the visionary force behind DigiQlik. With 8+ years of mastering performance marketing, he combines data-driven strategies with creative storytelling to help brands scale exponentially. His leadership inspires innovation and excellence.',
      social: {
        linkedin: 'https://www.linkedin.com/in/digital-shekhar/',
        mail: 'mailto:shekhar.katiyar@digiqlik.com',
      },
    },
    {
      name: 'Rishabh Katiyar',
      role: 'Graphic Designer',
      expertise: 'Creative Visual Designer',
      experience: '4 Years',
      image: '/rishabh.jpeg',
      description:
        'Rishabh turns ideas into visual masterpieces. With 4 years of design experience, he crafts compelling brand identities, engaging UI elements, and pixel-perfect graphics that leave lasting impressions across all platforms.',
      social: {
        instagram: 'https://www.instagram.com/_rishabhkatiyar_10/',
        mail: 'mailto:rishabh.katiyar@digiqlik.com',
      },
    },
    {
      name: 'Shivam Pandey',
      role: 'Senior Software Developer',
      expertise: 'Full-Stack Engineer',
      experience: '5 Years',
      image: '/shivampandey.jpeg',
      description:
        'Shivam is a coding architect with 5 years of experience building robust, scalable web applications. His expertise in React, Node.js, and cloud infrastructure ensures seamless performance and cutting-edge solutions.',
      social: {
        facebook: 'https://www.facebook.com/profile.php?id=100084498817201',
        github: 'https://github.com/shivamcsc0909',
        linkedin: 'https://www.linkedin.com/in/shivampandey-tech/',
        portfolio: 'https://shivam-portfolio-pandey.netlify.app/',
        instagram: 'https://www.instagram.com/its_shivampandey__/?hl=en',
        email: 'mailto:shivampandeyyuyu@gmail.com',
      },
    },
    {
      name: 'Pawan',
      role: 'Production Lead',
      expertise: 'Project & Production Manager',
      experience: '6 Years',
      image: '/pawan.png',
      description:
        'Pawan is the backbone of project delivery. With 6 years of production management, he coordinates cross-functional teams, optimizes workflows, and ensures every project is delivered on time with exceptional quality.',
      social: {
        instagram: 'https://www.instagram.com/prabhakar_katiyar_/',
        mail: 'mailto:pawan.katiyar@digiqlik.com',
      },
    },
  ];

  const owner = teamMembers[0];
  const employees = teamMembers.slice(1);

  const handleImageError = (e, name) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?background=1e293b&color=fff&bold=true&size=400&name=${encodeURIComponent(
      name
    )}`;
  };

  const renderEmployeeSocial = (member) => {
    if (member.name === 'Shivam Pandey') {
      return (
        <div className="team-social colorful">
          <a
            href={member.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link facebook"
            title="Facebook"
          >
            <FacebookIcon size={30} className="color-icon" />
          </a>
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link github"
            title="GitHub"
          >
            <GithubIcon size={30} className="color-icon" />
          </a>
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link linkedin"
            title="LinkedIn"
          >
            <LinkedInIcon size={30} className="color-icon" />
          </a>
          <a
            href={member.social.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link portfolio"
            title="Portfolio"
          >
            <GlobeIcon size={30} className="color-icon" />
          </a>
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link instagram"
            title="Instagram"
          >
            <InstagramIcon size={30} className="color-icon" />
          </a>
          <a href={member.social.email} className="social-link email" title="Email">
            <MailIcon size={30} className="color-icon" />
          </a>
        </div>
      );
    }

    return (
      <div className="team-social colorful">
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link linkedin"
            title="LinkedIn"
          >
            <LinkedInIcon size={28} className="color-icon" />
          </a>
        )}
        {member.social.instagram && (
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link instagram"
            title="Instagram"
          >
            <InstagramIcon size={28} className="color-icon" />
          </a>
        )}
        {member.social.mail && (
          <a href={member.social.mail} className="social-link email" title="Email">
            <MailIcon size={28} className="color-icon" />
          </a>
        )}
      </div>
    );
  };

  return (
    <section id="team-section" className="team-section" ref={teamSectionRef}>
      <div className="container team-container">
        <div className="team-header">
          <span className="section-tag team-tag">Meet The Minds</span>
          <h2 className="section-title team-title">
            Our Leadership <span className="text-gradient">Tree</span>
          </h2>
          <p className="section-subtitle team-subtitle">
            A passionate collective of creators, strategists, and technologists — united to bring your vision to life.
          </p>
        </div>

        <div className="owner-section" ref={ownerRef}>
          <div className="owner-image-wrapper">
            <img
              src={owner.image}
              alt={owner.name}
              onError={(e) => handleImageError(e, owner.name)}
              className="owner-image"
              loading="lazy"
              decoding="async"
            />
            <div className="founder-badge">Founder</div>
          </div>

          <div className="owner-details">
            <h3 className="owner-name">{owner.name}</h3>
            <p className="owner-role">{owner.role}</p>

            <div className="owner-meta">
              <span className="meta-item">
                <Award size={16} />
                {owner.expertise}
              </span>
              <span className="meta-item">
                <Calendar size={16} />
                {owner.experience} of Excellence
              </span>
            </div>

            <p className="owner-description">{owner.description}</p>

            <div className="owner-social team-social colorful">
              {owner.social.linkedin && (
                <a
                  href={owner.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                  title="LinkedIn"
                >
                  <LinkedInIcon size={34} className="color-icon" />
                </a>
              )}
              {owner.social.mail && (
                <a href={owner.social.mail} className="social-link email" title="Email">
                  <MailIcon size={34} className="color-icon" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="employees-section">
          <h3 className="employees-heading">Our Core Team</h3>

          <div className="team-grid">
            {employees.map((member, idx) => (
              <article
                key={member.name}
                className="employee-card"
                ref={(el) => (employeeCardsRef.current[idx] = el)}
              >
                <div className="employee-image-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => handleImageError(e, member.name)}
                    className="employee-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="employee-card-content">
                  <h4 className="employee-name">{member.name}</h4>
                  <p className="employee-role">{member.role}</p>

                  <div className="employee-tags">
                    <span className="employee-tag expertise">
                      <Award size={12} /> {member.expertise}
                    </span>
                    <span className="employee-tag experience">
                      <Calendar size={12} /> {member.experience}
                    </span>
                  </div>

                  <p className="employee-description">{member.description}</p>
                  {renderEmployeeSocial(member)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;