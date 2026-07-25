import "./LoadingSpinner.css";

// Creative feature: Loading Spinner
export default function LoadingSpinner({ label = "Loading your hub..." }) {
  return (
    <div className="loading-spinner">
      <span className="loading-spinner__ring" />
      <p>{label}</p>
    </div>
  );
}
