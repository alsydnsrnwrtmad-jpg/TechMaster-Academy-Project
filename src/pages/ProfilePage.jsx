import { useState, useEffect } from "react";
import {
  User,
  Edit3,
  Flame,
  Trophy,
  CheckCircle2,
  Lock,
  Plus,
  X,
  Sparkles,
  BookOpen,
  Clock,
  CheckSquare,
  Award,
  GraduationCap,
  Code,
  Check,
  Rocket,
  NotebookPen,
  Compass
} from "lucide-react";
import * as Icons from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { useToast } from "../context/ToastContext.jsx";
import defaultAchievements from "../data/achievements.js";
import "./ProfilePage.css";

const PROFILE_STORAGE_KEY = "student_hub_user_profile";

const DEFAULT_PROFILE = {
  name: "Nour El-Din",
  role: "Computer Science Student & Full-Stack Dev",
  bio: "Passionate about building modern web applications, interactive interfaces, and mastering full-stack software development. Currently honing React and UI/UX architecture.",
  avatarInitials: "NE",
  skills: [
    "React.js",
    "JavaScript (ES6+)",
    "CSS3 & Glassmorphism",
    "Vite",
    "Node.js",
    "Git & GitHub",
    "REST APIs",
    "UI/UX Design"
  ],
  streak: 14,
  progress: 78,
  studyHours: 48,
  completedTasks: 32
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [newSkillInput, setNewSkillInput] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error("Failed to save profile to localStorage", e);
    }
  }, [profile]);

  const handleOpenEditModal = () => {
    setFormData(profile);
    setNewSkillInput("");
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const skill = newSkillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast("Name cannot be empty!", "warning");
      return;
    }
    setProfile(formData);
    setIsEditModalOpen(false);
    showToast("Profile updated successfully! ✨", "success");
  };

  const unlockedCount = defaultAchievements.filter((a) => a.unlocked).length;

  return (
    <div className="profile-page">
      {/* Profile Cover & Header Card */}
      <Card className="profile-header-card">
        <div className="profile-header-card__banner">
          <div className="profile-header-card__banner-badge">
            <GraduationCap size={14} /> Student Profile
          </div>
        </div>

        <div className="profile-header-card__content">
          <div className="profile-header-card__avatar-wrap">
            <div className="profile-header-card__avatar">
              <span>{profile.name.split(" ").map((n) => n[0]).join("").toUpperCase() || "ST"}</span>
            </div>
            <div className="profile-header-card__status-dot" title="Active & Learning" />
          </div>

          <div className="profile-header-card__info">
            <div className="profile-header-card__row">
              <div>
                <h1 className="profile-header-card__name">{profile.name}</h1>
                <p className="profile-header-card__role">{profile.role}</p>
              </div>

              <Button
                variant="primary"
                className="profile-header-card__edit-btn"
                onClick={handleOpenEditModal}
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </Button>
            </div>

            <p className="profile-header-card__bio">{profile.bio}</p>

            <div className="profile-header-card__tags">
              <span className="profile-badge">
                <Sparkles size={12} /> TechMaster Academy
              </span>
              <span className="profile-badge profile-badge--accent">
                <Award size={12} /> Phase 2 Student
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Widgets Grid */}
      <div className="profile-stats-grid">
        {/* Daily Streak Counter */}
        <Card className="stat-widget stat-widget--streak">
          <div className="stat-widget__header">
            <div className="stat-widget__icon-box stat-widget__icon-box--flame">
              <Flame size={24} className="flame-animated" />
            </div>
            <span className="stat-widget__badge">Top Learner</span>
          </div>
          <div className="stat-widget__body">
            <h3 className="stat-widget__val">{profile.streak} Days</h3>
            <p className="stat-widget__lbl">Daily Study Streak 🔥</p>
            <p className="stat-widget__desc">
              Consistent daily activity! Keep logging in and studying to maintain your streak.
            </p>
          </div>
        </Card>

        {/* Course Progress */}
        <Card className="stat-widget stat-widget--progress">
          <div className="stat-widget__header">
            <div className="stat-widget__icon-box stat-widget__icon-box--primary">
              <Trophy size={24} />
            </div>
            <span className="stat-widget__badge">{profile.progress}% Complete</span>
          </div>
          <div className="stat-widget__body">
            <h3 className="stat-widget__val">{profile.progress}%</h3>
            <p className="stat-widget__lbl">Semester Progress 🚀</p>
            <div className="profile-progress-bar">
              <div
                className="profile-progress-bar__fill"
                style={{ width: `${profile.progress}%` }}
              />
            </div>
            <p className="stat-widget__desc">
              You are on track to finish Phase 2 ahead of deadline!
            </p>
          </div>
        </Card>

        {/* Quick Stats Summary */}
        <Card className="stat-widget stat-widget--summary">
          <div className="stat-widget__header">
            <div className="stat-widget__icon-box stat-widget__icon-box--accent">
              <Code size={24} />
            </div>
            <span className="stat-widget__badge">Metrics</span>
          </div>
          <div className="stat-widget__metrics-row">
            <div className="metric-item">
              <Clock size={16} className="metric-item__icon" />
              <div>
                <span className="metric-item__val">{profile.studyHours}h</span>
                <span className="metric-item__lbl">Study Time</span>
              </div>
            </div>
            <div className="metric-item">
              <CheckSquare size={16} className="metric-item__icon" />
              <div>
                <span className="metric-item__val">{profile.completedTasks}</span>
                <span className="metric-item__lbl">Completed Tasks</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Layout: Skills & Achievements */}
      <div className="profile-sections-grid">
        {/* Skills Tags List */}
        <Card className="profile-section-card">
          <div className="profile-section-card__header">
            <div className="profile-section-card__title">
              <Code size={18} className="icon-primary" />
              <h2>Skills & Competencies</h2>
            </div>
            <span className="skills-count-badge">{profile.skills.length} Skills</span>
          </div>

          <div className="skills-list">
            {profile.skills.map((skill) => (
              <span key={skill} className="skill-chip">
                <Sparkles size={12} className="skill-chip__sparkle" />
                {skill}
              </span>
            ))}
          </div>
        </Card>

        {/* Achievements List */}
        <Card className="profile-section-card">
          <div className="profile-section-card__header">
            <div className="profile-section-card__title">
              <Trophy size={18} className="icon-amber" />
              <h2>Achievements & Badges</h2>
            </div>
            <span className="achievements-count-badge">
              {unlockedCount} of {defaultAchievements.length} Unlocked
            </span>
          </div>

          <div className="achievements-grid">
            {defaultAchievements.map((ach) => {
              const IconComponent = Icons[ach.icon] || Award;
              return (
                <div
                  key={ach.id}
                  className={`achievement-card ${
                    ach.unlocked ? "achievement-card--unlocked" : "achievement-card--locked"
                  }`}
                >
                  <div className="achievement-card__icon-wrapper">
                    <IconComponent size={20} />
                  </div>
                  <div className="achievement-card__info">
                    <div className="achievement-card__title-row">
                      <h4>{ach.title}</h4>
                      {ach.unlocked ? (
                        <CheckCircle2 size={16} className="achievement-card__check" />
                      ) : (
                        <Lock size={14} className="achievement-card__lock" />
                      )}
                    </div>
                    <p>{ach.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="profile-modal-overlay" onClick={handleCloseEditModal}>
          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="profile-modal__header">
              <h3>Edit Profile</h3>
              <button
                className="profile-modal__close-btn"
                onClick={handleCloseEditModal}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="profile-modal__form">
              <div className="profile-modal__field">
                <label htmlFor="profile-name">Full Name</label>
                <input
                  id="profile-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="profile-modal__field">
                <label htmlFor="profile-role">Role / Major</label>
                <input
                  id="profile-role"
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value }))
                  }
                  required
                  placeholder="e.g. Computer Science Student"
                />
              </div>

              <div className="profile-modal__field">
                <label htmlFor="profile-bio">Bio</label>
                <textarea
                  id="profile-bio"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Tell us a little bit about yourself..."
                />
              </div>

              {/* Skills Tag Management */}
              <div className="profile-modal__field">
                <label>Manage Skills</label>
                <div className="profile-modal__skill-tags">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="modal-skill-chip">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        title={`Remove ${skill}`}
                        aria-label={`Remove ${skill}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="profile-modal__add-skill-row">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="Add a new skill (e.g., Python)..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddSkill(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="add-skill-btn"
                    onClick={handleAddSkill}
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>

              <div className="profile-modal__actions">
                <Button type="button" variant="ghost" onClick={handleCloseEditModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  <Check size={16} /> Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
