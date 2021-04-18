import React, { useContext } from "react";
import axios from "../../util/axios";
import "./home.scss";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import domain from "../../util/domain";

// compoenents

import Form from "../form/Form";
import Posts from "../posts/Posts";
import Modal from "../modal/Modal";
import Hero from "../hero/Hero";
import UserContext from "../../context/UserContext";

function Home() {
  const [travelStories, setTravelStories] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [cloudId, setCloudId] = React.useState("");

  const { user } = useContext(UserContext);

  React.useEffect(() => {
    if (!user) setTravelStories([]);
    else getTravelStories();
  }, [user]);

  async function getTravelStories() {
    try {
      const response = await axios.get(`${domain}/api/travel-post`);

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
      <Hero />
      <Element name="posts">
        {user && <Form getTravelStories={getTravelStories} />}
        {!user && (
          <Link className="btn-primary" to="/register">
            Register here
          </Link>
        )}
      </Element>
      <div className="posts-container">{sortedData()}</div>
    </div>
  );
}

export default Home;
