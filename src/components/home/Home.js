import React from "react";
import axios from "axios";
import "./home.scss";

// compoenents

import Form from "../form/Form";
import Posts from "../posts/Posts";
import Modal from "../modal/Modal";

function Home() {
  const [travelStories, setTravelStories] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [cloudId, setCloudId] = React.useState("");

  React.useEffect(() => {
    getTravelStories();
  }, []);

  async function getTravelStories() {
    try {
      const response = await axios.get("http://localhost:5000/api/travel-post");

      setTravelStories(response.data);
    } catch (err) {
      console.log("an error has occured", err);
    }
  }

  function toggleModal(id) {
    setShowModal((prevShowModal) => !prevShowModal);
    if (id) {
      setCloudId(id);
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
          getTravelStories={getTravelStories}
          toggleModal={toggleModal}
        />
      );
    });
  }

  return (
    <div className="home">
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          cloudId={cloudId}
          getTravelStories={getTravelStories}
          showModal={showModal}
        />
      )}
      <Form getTravelStories={getTravelStories} />
      <div className="posts-container">{sortedData()}</div>
    </div>
  );
}

export default Home;
