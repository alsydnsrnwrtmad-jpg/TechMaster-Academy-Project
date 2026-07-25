import { useState, useEffect, useMemo } from "react";
import {
  Search,
  X,
  Heart,
  ExternalLink,
  Star,
  BookOpen,
  Code2,
  GraduationCap,
  Wrench,
  Sparkles,
  Share2,
  Filter,
  Check,
  Bookmark
} from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { useToast } from "../context/ToastContext.jsx";
import "./ResourcesPage.css";

const FAVORITES_STORAGE_KEY = "student_hub_favorite_resources";

const INITIAL_RESOURCES = [
  {
    id: "res-1",
    title: "MDN Web Docs",
    category: "Documentation",
    description: "The definitive reference for HTML, CSS, JavaScript, and modern Web APIs with live code examples.",
    url: "https://developer.mozilla.org",
    rating: 4.9,
    reviewsCount: 1240,
    level: "All Levels",
    tags: ["HTML", "CSS", "JavaScript", "Web API"]
  },
  {
    id: "res-2",
    title: "freeCodeCamp",
    category: "Courses",
    description: "Free interactive learning platform with full stack developer certifications, projects, and coding challenges.",
    url: "https://www.freecodecamp.org",
    rating: 4.8,
    reviewsCount: 980,
    level: "Beginner",
    tags: ["Fullstack", "Web Dev", "Algorithms"]
  },
  {
    id: "res-3",
    title: "React Official Documentation",
    category: "Documentation",
    description: "Interactive guides and deep dives into React 18+, hooks, state management, and modern component architecture.",
    url: "https://react.dev",
    rating: 4.9,
    reviewsCount: 850,
    level: "Intermediate",
    tags: ["React", "JSX", "Frontend", "Hooks"]
  },
  {
    id: "res-4",
    title: "Figma UI/UX Toolkit",
    category: "Tools",
    description: "Collaborative design & prototyping tool for building wireframes, component libraries, and interactive design tokens.",
    url: "https://www.figma.com",
    rating: 4.7,
    reviewsCount: 620,
    level: "All Levels",
    tags: ["UI/UX", "Design", "Prototyping"]
  },
  {
    id: "res-5",
    title: "You Don't Know JS Yet",
    category: "Books",
    description: "Deep dive book series dissecting JavaScript core mechanisms, scope, closures, prototypes, and async programming.",
    url: "https://github.com/getify/You-Dont-Know-JS",
    rating: 4.8,
    reviewsCount: 430,
    level: "Advanced",
    tags: ["JavaScript", "Async", "Engine", "JS Core"]
  },
  {
    id: "res-6",
    title: "Tailwind CSS Documentation",
    category: "Documentation",
    description: "Utility-first CSS framework reference for building modern, responsive user interfaces rapidly.",
    url: "https://tailwindcss.com/docs",
    rating: 4.6,
    reviewsCount: 510,
    level: "Beginner to Inter",
    tags: ["CSS", "Styling", "Utility-First"]
  }
];

const CATEGORIES = ["All", "Courses", "Documentation", "Tools", "Books"];

function CategoryIcon({ category, size = 16 }) {
  switch (category) {
    case "Courses":
      return <GraduationCap size={size} />;
    case "Documentation":
      return <Code2 size={size} />;
    case "Tools":
      return <Wrench size={size} />;
    case "Books":
      return <BookOpen size={size} />;
    default:
      return <Filter size={size} />;
  }
}

function RatingStars({ rating, reviewsCount }) {
  const fullStars = Math.floor(rating);
  return (
    <div className="resources-card__rating" title={`${rating} out of 5 stars`}>
      <div className="resources-card__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`resources-card__star ${
              star <= fullStars ? "resources-card__star--filled" : ""
            }`}
            fill={star <= fullStars ? "currentColor" : "none"}
          />
        ))}
      </div>
      <span className="resources-card__rating-val">{rating.toFixed(1)}</span>
      {reviewsCount && (
        <span className="resources-card__reviews">({reviewsCount.toLocaleString()})</span>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ["res-1", "res-3"];
    } catch (e) {
      return ["res-1", "res-3"];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favorites]);

  const toggleFavorite = (id, title) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      const updated = isFav ? prev.filter((item) => item !== id) : [...prev, id];
      if (isFav) {
        showToast(`Removed "${title}" from favorites`, "info");
      } else {
        showToast(`Saved "${title}" to your favorites! ❤️`, "success");
      }
      return updated;
    });
  };

  const handleCopyLink = (url, title) => {
    navigator.clipboard.writeText(url);
    showToast(`Link for "${title}" copied to clipboard!`, "info");
  };

  const filteredResources = useMemo(() => {
    return INITIAL_RESOURCES.filter((res) => {
      const matchesCategory =
        selectedCategory === "All" || res.category === selectedCategory;
      const matchesFavorites = !favoritesOnly || favorites.includes(res.id);
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        res.title.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.category.toLowerCase().includes(query) ||
        res.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesFavorites && matchesSearch;
    });
  }, [searchQuery, selectedCategory, favoritesOnly, favorites]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts = { All: INITIAL_RESOURCES.length };
    INITIAL_RESOURCES.forEach((res) => {
      counts[res.category] = (counts[res.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="resources-page">
      {/* Page Header */}
      <header className="resources-page__header">
        <div className="resources-page__title-box">
          <div className="resources-page__badge">
            <Sparkles size={14} /> Learning Hub
          </div>
          <h1>Learning Resources</h1>
          <p>
            Curated documentation, courses, interactive tools, and books to accelerate your development journey.
          </p>
        </div>
        <div className="resources-page__meta-stats">
          <div className="resources-stat">
            <span className="resources-stat__val">{INITIAL_RESOURCES.length}</span>
            <span className="resources-stat__lbl">Total Resources</span>
          </div>
          <div className="resources-stat">
            <span className="resources-stat__val">{favorites.length}</span>
            <span className="resources-stat__lbl">Saved Favorites</span>
          </div>
        </div>
      </header>

      {/* Control Bar: Search & Filtering */}
      <section className="resources-page__controls">
        <div className="resources-page__search-wrap">
          <Search className="resources-page__search-icon" size={18} />
          <input
            type="text"
            className="resources-page__search-input"
            placeholder="Search resources by title, topic, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="resources-page__clear-btn"
              onClick={() => setSearchQuery("")}
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="resources-page__filter-row">
          <div className="resources-page__categories">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  className={`category-btn ${isActive ? "category-btn--active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <CategoryIcon category={cat} size={14} />
                  <span>{cat}</span>
                  <span className="category-btn__count">{categoryCounts[cat] || 0}</span>
                </button>
              );
            })}
          </div>

          <button
            className={`fav-filter-btn ${favoritesOnly ? "fav-filter-btn--active" : ""}`}
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            title="Filter saved favorites"
          >
            <Heart
              size={16}
              className={favoritesOnly ? "fav-filter-btn__icon--filled" : ""}
              fill={favoritesOnly ? "currentColor" : "none"}
            />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="fav-filter-btn__badge">{favorites.length}</span>
            )}
          </button>
        </div>
      </section>

      {/* Results Count Banner */}
      <div className="resources-page__status-bar">
        <span>
          Showing <strong>{filteredResources.length}</strong> of {INITIAL_RESOURCES.length} resources
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {favoritesOnly && ` (Favorites only)`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(searchQuery || selectedCategory !== "All" || favoritesOnly) && (
          <button
            className="resources-page__reset-link"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setFavoritesOnly(false);
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="resources-grid">
          {filteredResources.map((res) => {
            const isFavorited = favorites.includes(res.id);
            return (
              <Card key={res.id} className="resources-card">
                <div className="resources-card__top">
                  <span className={`category-tag category-tag--${res.category.toLowerCase()}`}>
                    <CategoryIcon category={res.category} size={12} />
                    {res.category}
                  </span>
                  <button
                    className={`favorite-btn ${isFavorited ? "favorite-btn--active" : ""}`}
                    onClick={() => toggleFavorite(res.id, res.title)}
                    title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    aria-label="Toggle favorite"
                  >
                    <Heart
                      size={18}
                      fill={isFavorited ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="resources-card__body">
                  <h3 className="resources-card__title">{res.title}</h3>
                  <p className="resources-card__desc">{res.description}</p>
                  
                  <div className="resources-card__tags">
                    {res.tags.map((tag) => (
                      <span key={tag} className="tag-chip">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="resources-card__footer">
                  <RatingStars rating={res.rating} reviewsCount={res.reviewsCount} />

                  <div className="resources-card__actions">
                    <button
                      className="icon-action-btn"
                      onClick={() => handleCopyLink(res.url, res.title)}
                      title="Share / Copy Link"
                    >
                      <Share2 size={16} />
                    </button>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-btn"
                    >
                      <span>Visit</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <Card className="resources-page__empty">
          <div className="resources-page__empty-icon">
            <Bookmark size={40} />
          </div>
          <h3>No resources match your search</h3>
          <p>
            Try adjusting your search keywords, switching categories, or turning off the favorites filter.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setFavoritesOnly(false);
            }}
          >
            Clear All Filters
          </Button>
        </Card>
      )}
    </div>
  );
}
