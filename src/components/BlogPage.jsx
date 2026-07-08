import React, { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import BlogCard from "./BlogCard";
import Sidebar from "./Sidebar";
import CategoryTabs from "./CategoryTabs";

const initialPosts = [
  {
    id: 1,
    title: "10 Best Practices for Building Scalable MERN Stack Applications",
    excerpt:
      "Learn the top best practices for developing scalable and efficient MERN stack applications that grow with your business.",
    author: "James Smith",
    date: "April 30, 2024",
    category: "Product Updates",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: 2,
    title: "How DigiQlik Improved Client Onboarding by 40%",
    excerpt:
      "Discover how DigiQlik enhanced its client onboarding process, increasing efficiency and satisfaction.",
    author: "Sarah Johnson",
    date: "April 12, 2024",
    category: "Case Studies",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: 3,
    title: "Latest Features and Updates: What’s New in DigiQlik?",
    excerpt:
      "Stay up-to-date with the latest product improvements and features we released this month.",
    author: "Michael Brown",
    date: "April 5, 2024",
    category: "Product Updates",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Using React with Tailwind CSS",
    excerpt:
      "A practical walkthrough for developers who want to build high-performance React UIs with Tailwind.",
    author: "Aisha Patel",
    date: "March 23, 2024",
    category: "Tips & Guides",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: 5,
    title: "How to Optimize Your Web App Performance",
    excerpt:
      "Performance tuning strategies that deliver measurable speed improvements and better UX.",
    author: "Rachel Cole",
    date: "April 1, 2024",
    category: "News",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=70",
  },
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () => ["All", "Product Updates", "Tips & Guides", "Case Studies", "News"],
    [],
  );

  const filteredPosts = useMemo(() => {
    let posts = [...initialPosts];

    if (activeCategory !== "All") {
      posts = posts.filter((post) => post.category === activeCategory);
    }

    if (searchValue.trim()) {
      const lowerSearch = searchValue.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerSearch) ||
          post.excerpt.toLowerCase().includes(lowerSearch) ||
          post.author.toLowerCase().includes(lowerSearch),
      );
    }

    return posts;
  }, [activeCategory, searchValue]);

  const postsPerPage = 4;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const displayPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  useEffect(() => {
    gsap.from(".blog-hero", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    gsap.from(".blog-card", {
      opacity: 0,
      y: 18,
      duration: 0.55,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0.1,
    });
  }, [activeCategory, searchValue, currentPage]);

  const categoryStats = useMemo(
    () =>
      categories
        .filter((c) => c !== "All")
        .map((c) => ({
          name: c,
          count: initialPosts.filter((p) => p.category === c).length,
        })),
    [categories],
  );

  const trending = initialPosts.slice(0, 3).map((post) => ({
    title: post.title,
    date: post.date,
    thumbnail: post.image,
  }));

  const tags = [
    "Design",
    "Development",
    "Performance",
    "Strategy",
    "Case Study",
  ];

  return (
    <section className="blog-page">
      <div className="container blog-hero">
        <h1>From Our Blog</h1>
        <p>
          Insights, tips, and updates from the DigiQlik team to help level up
          your digital strategy.
        </p>
        <div className="blog-search">
          <input
            type="text"
            placeholder="Search blog..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="container blog-layout">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1);
          }}
        />

        <div className="blog-grid">
          <div className="blog-left">
            <div className="blog-cards">
              {displayPosts.length > 0 ? (
                displayPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))
              ) : (
                <div className="no-results">
                  <p>No posts match your filter. Try another keyword.</p>
                </div>
              )}
            </div>

            <div className="pagination">
              {Array.from({ length: Math.max(totalPages, 1) }).map((_, idx) => (
                <button
                  key={idx}
                  className={
                    currentPage === idx + 1 ? "page-btn active" : "page-btn"
                  }
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <Sidebar categories={categoryStats} trending={trending} tags={tags} />
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
