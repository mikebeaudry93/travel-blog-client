import React, { useState, useContext, useEffect } from "react";
import domain from "../../util/domain";
import axios from "../../util/axios";
import { Link, useHistory } from "react-router-dom";
import "./MyPosts.scss";

// components
import Posts from "../../components/posts/Posts";
import Modal from "../../components/modal/Modal";

// context
import ModelContext from "../../context/ModelContext";
import UserContext from "../../context/UserContext";

const MyPosts = () => {
  const [travelStories, setTravelStories] = useState([]);
  const [cloudId, setCloudId] = React.useState("");

  const { showModal, setShowModal } = useContext(ModelContext);
  const { user } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/");
    } else {
      getTravelStories();
    }
  }, [user, history]);

  async function getTravelStories() {
    try {
      //   const response = await axios.get(`${domain}/api/all-travel-posts`);
      const response = await axios.get(`${domain}/api/travel-post`);
      setTravelStories(response.data);
    } catch (err) {
      console.log("an error has occured", err);
    }
  }

  function sortedData() {
    let sortedStories = [...travelStories];
    sortedStories = sortedStories.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedStories.map((item, i) => {
      return (
        <Posts
          key={i}
          item={item}
          userID={item.user}
          getTravelStories={getTravelStories}
          toggleModal={toggleModal}
        />
      );
    });
  }

  function toggleModal(id) {
    setShowModal((prevShowModal) => !prevShowModal);
    if (id) {
      setCloudId(id);
    }
  }

  function noPostsLeft() {
    if (travelStories.length === 0) {
      return (
        <div>
          <h2>
            You have no posts! Head to the homepage to add more to your list.
          </h2>
          <Link className="btn-primary btn-no-posts" to="/">
            Homepage
          </Link>
        </div>
      );
    }
  }

  return (
    <div>
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          cloudId={cloudId}
          getTravelStories={getTravelStories}
        />
      )}
      <div className="posts-container">{sortedData()}</div>
      <div className="no-posts-container">{noPostsLeft()}</div>
    </div>
  );
};

export default MyPosts;
