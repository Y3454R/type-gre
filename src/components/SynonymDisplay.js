import "./SynonymDisplay.css";

export default function SynonymDisplay({ synonym }) {
  return (
    <div className="synonym-card">
      <p className="synonym-value">{synonym || ""}</p>
    </div>
  );
}
