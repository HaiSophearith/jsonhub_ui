import React, { useState } from "react";

function ProjectCard({ title, body }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleFavoriteClick() {
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{body}</p>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </div>
  );
}

export default ProjectCard;
