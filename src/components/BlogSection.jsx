import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CategoryTabs from "./CategoryTabs";
import SmallBlogCard, { FeaturedBlogCard } from "./BlogCard";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: "10 SEO Trends to Watch in 2025",
    excerpt: "Naye search algorithms aur user intent ke hisaab se apni strategy kaise banayein – practical tips, examples aur action steps.",
    author: "James Smith",
    date: "April 30, 2024",
    category: "SEO",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: 2,
    title: "How to Maximize Your PPC ROI",
    excerpt: "Smart bidding, negative keywords aur landing page testing ke proven tips.",
    author: "Sarah Johnson",
    date: "April 12, 2024",
    category: "PPC",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: 3,
    title: "The Power of Local SEO for Small Businesses",
    excerpt: "Local listings aur review management se footfall kaise badhayein.",
    author: "Michael Brown",
    date: "April 5, 2024",
    category: "Local SEO",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: 4,
    title: "Content Systems That Scale",
    excerpt: "Repeating content workflows aur repurposing se productivity kaise badhe.",
    author: "Aisha Patel",
    date: "March 23, 2024",
    category: "Content",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: 5,
    title: "Technical SEO Checklist for Developers",
    excerpt: "Crawling, indexing aur performance optimizations - jo devs ko pata hona chahiye.",
    author: "Rachel Cole",
    date: "April 1, 2024",
    category: "Dev",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=70",
  },
];

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "SEO", "PPC", "Local SEO", "Content", "Dev"];
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  // Divide into featured (1st) and the rest
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const smallPosts = filteredPosts.length > 1 ? filteredPosts.slice(1, 5) : []; // Up to 4 small cards

  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(
      el.querySelectorAll(".animate-fade-in"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".animate-post");
    
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.95, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, [activeCategory]);

  return (
    <section id="blog" className="blog-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header text-center animate-fade-in">
          <span className="section-tag">Insights & Updates</span>
          <h2 className="section-title">Latest Blogs</h2>
        </div>

        <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {filteredPosts.length > 0 ? (
          <div className="blog-layout-grid" ref={gridRef}>
            <div className="blog-layout-featured">
              <FeaturedBlogCard post={featuredPost} />
            </div>
            
            {smallPosts.length > 0 && (
              <div className="blog-layout-small-grid">
                {smallPosts.map((post) => (
                  <SmallBlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="no-results-message text-center w-100">
            <p>No posts available in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
