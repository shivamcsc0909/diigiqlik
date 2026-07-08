import React from "react";

const Sidebar = ({ categories, trending, tags }) => {
  return (
    <aside className="blog-sidebar">
      <section className="sidebar-card">
        <h4>Categories</h4>
        <ul>
          {categories.map((item) => (
            <li key={item.name}>
              <span>{item.name}</span>
              <strong>{item.count}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="sidebar-card">
        <h4>Trending Posts</h4>
        <div className="trending-list">
          {trending.map((item) => (
            <article key={item.title} className="trending-item">
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <h5>{item.title}</h5>
                <small>{item.date}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sidebar-card">
        <h4>Quick Links</h4>
        <div className="tag-list">
          {tags.map((tag) => (
            <button type="button" key={tag} className="tag-btn">
              #{tag}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
