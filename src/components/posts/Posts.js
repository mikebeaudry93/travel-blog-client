import React, { useState, useContext } from "react";
import "./posts.scss";
import axios from "../../util/axios";
import domain from "../../util/domain";

// icons
import { IoMdThumbsUp } from "react-icons/io";
import { IoMdThumbsDown } from "react-icons/io";

// context
import ModelContext from "../../context/ModelContext";
import UserContext from "../../context/UserContext";

function Posts({
  item: {
    title,
    country,
    city,
    date,
    description,
    cloudinary_secure_url,
    cloudinary_public_id,
    likes,
    _id,
  },
  userID,
  toggleModal,
}) {
  const [data, setData] = useState(likes);

  const { setShowDeleteModal, setShowModalContext } = useContext(ModelContext);
  const { user } = useContext(UserContext);

  const toggleDeleteModal = () => {
    toggleModal(cloudinary_public_id);
    setShowDeleteModal(true);
    setShowModalContext(false);
  };

  // function checkIfAlreadyLiked(id) {
  //   data.find((item) => {
  //     if (item === id) {
  //       return data;
  //     } else {
  //     }
  //   });
  // }

  async function likePost() {
    try {
      const res = await axios.put(`${domain}/api/like`, {
        headers: { "Content-Type": "application/json" },
        _id,
      });
      console.log(res.data.likes);
      setData(res.data.likes);
    } catch (err) {
      console.log(err);
    }
  }

  async function unlikePost() {
    try {
      const res = await axios.put(`${domain}/api/unlike`, {
        headers: { "Content-Type": "application/json" },
        _id,
      });

      setData(res.data.likes);
    } catch (err) {
      console.log(err);
    }
  }

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

        <div className="icons-container">
          {data.includes(user) ? (
            <div className="likes-box">
              <p className="likes-user"> {data.length} likes</p>
              <IoMdThumbsUp size="3rem" className="react-icons thmbs-up" />
            </div>
          ) : (
            <div className="likes-box">
              <p> {data.length} likes</p>

              <IoMdThumbsUp
                size="3rem"
                className="react-icons"
                onClick={likePost}
              />
            </div>
          )}

          <IoMdThumbsDown
            size="3rem"
            className="react-icons"
            onClick={unlikePost}
          />
        </div>

        {user === userID && (
          <button
            className="btn-primary btn-delete"
            onClick={toggleDeleteModal}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Posts;
