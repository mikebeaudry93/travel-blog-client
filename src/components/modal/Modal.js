import React, { useContext } from "react";
import "./modal.scss";
import axios from "../../util/axios";
import domain from "../../util/domain";

// context
import ModelContext from "../../context/ModelContext";

function Modal({ toggleModal, cloudId, getTravelStories }) {
  const [successModal, setSuccessModal] = React.useState(false);

  const {
    showModalContext,
    showDeleteModal,
    setShowDeleteModal,
    showModal,
    emailForModal,
  } = useContext(ModelContext);

  async function deletePost(e) {
    e.preventDefault();
    try {
      await axios.delete(`${domain}/api/travel-post/${cloudId}`);
      setShowDeleteModal(false);
      setSuccessModal(true);
      getTravelStories();
      setTimeout(() => {
        toggleModal();
      }, 3000);
    } catch (err) {
      console.log("an error has occured", err);
    }
  }

  return (
    <div className="modal-container">
      <div className="delete-modal">
        {successModal && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="white"
              enableBackground="new 0 0 50 50"
              id="Layer_1"
              version="1.0"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
            >
              <polyline
                className="path"
                fill="none"
                points="20,6 9,17 4,12"
                stroke="#73bbe0"
                strokeMiterlimit="10"
                strokeWidth="1.5"
              />
            </svg>
            <p className="success-msg">Success!</p>
          </div>
        )}

        {showModalContext && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="white"
              enableBackground="new 0 0 50 50"
              id="Layer_1"
              version="1.0"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
            >
              <polyline
                className="path"
                fill="none"
                points="20,6 9,17 4,12"
                stroke="#73bbe0"
                strokeMiterlimit="10"
                strokeWidth="1.5"
              />
            </svg>
            <p className="success-msg">Welcome {emailForModal}!</p>
          </div>
        )}

        {showDeleteModal && showModal && (
          <div>
            <p>Are you sure you want to delete this post?</p>
            <button
              onClick={(e) => deletePost(e)}
              className="btn-primary yes-btn"
            >
              Yes
            </button>
            <button onClick={toggleModal} className="btn-primary cancel-btn">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
