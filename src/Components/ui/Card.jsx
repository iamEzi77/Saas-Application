export default function Card({ className = "", children }) {
  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {children}
    </div>
  );
}