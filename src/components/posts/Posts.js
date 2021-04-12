import React from "react";
import "./posts.scss";

function Posts({
  item: {
    title,
    country,
    city,
    date,
    description,
    cloudinary_secure_url,
    cloudinary_public_id,
  },
  toggleModal,
}) {
  return (
    <div className="post-container">
      <img className="post-image" src={cloudinary_secure_url} alt={title} />

      <div className="text-container">
        <h1>{title}</h1>
        <div className="subtitle-box">
          <h4>
            <span>Country: </span> <br />
            {country}
          </h4>
          <h4>
            <span>City: </span>
            <br />
            {city}
          </h4>
          <h4>
            <span>Year:</span> <br />
            {date}
          </h4>
        </div>

        <p>
          <span>About this experience: </span> <br />
          {description}
        </p>

        <button
          className="btn-primary btn-delete"
          onClick={() => toggleModal(cloudinary_public_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Posts;
