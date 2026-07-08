import React from "react";
import { ArrowRight } from "lucide-react";

export const FeaturedBlogCard = ({ post }) => {
  if (!post) return null;
  return (
    <article 
      className="blog-featured-card animate-post" 
      style={{ backgroundImage: `url(${post.image})` }}
    >
      <div className="featured-overlay"></div>
      <div className="featured-content">
        <span className="blog-category-badge">{post.category}</span>
        <h3 className="featured-title">{post.title}</h3>
        <p className="featured-excerpt">{post.excerpt}</p>
        <button className="btn btn-primary featured-btn">
          READ MORE <ArrowRight size={16} style={{ marginLeft: '4px' }} />
        </button>
      </div>
    </article>
  );
};

const SmallBlogCard = ({ post }) => {
  if (!post) return null;
  return (
    <article className="blog-small-card animate-post">
      <div className="small-image-wrapper">
        <img src={post.image} alt={post.title} className="small-image" />
      </div>
      <div className="small-content">
        <span className="blog-category-text">{post.category}</span>
        <h4 className="small-title">{post.title}</h4>
        <p className="small-excerpt">{post.excerpt}</p>
      </div>
    </article>
  );
};

export default SmallBlogCard;
