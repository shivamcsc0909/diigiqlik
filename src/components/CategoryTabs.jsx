import React from "react";

const CategoryTabs = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="category-tabs">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`tab-btn ${activeCategory === category ? "active" : ""}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
