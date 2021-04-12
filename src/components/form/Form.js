import React from "react";
import axios from "axios";
import "./form.scss";
import image from "../../assets/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg";

function Form({ getTravelStories }) {
  const [formValues, setFormValues] = React.useState({
    title: "",
    country: "",
    city: "",
    date: "",
    description: "",
  });
  const [imageData, setImageData] = React.useState("");
  const [images, setFile] = React.useState("");

  async function saveTravelStory(e) {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("img", imageData);

      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });

      await axios.post("http://localhost:5000/api/travel-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log("an err occured==>>", err);
    }

    resetFormFields();
    getTravelStories();
  }

  // async function updateTravelStory(e) {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append("img", imageData);
  //     Object.keys(formValues).forEach((key) => {
  //       formData.append(key, formValues[key]);
  //     });

  //     await axios.put("http://localhost:5000/api/travel-post/")
  //   } catch (err) {
  //     console.log("an err occured==>>", err);
  //   }
  // }

  const handleFileChange = (e) => {
    setImageData(e.target.files[0]);
    setFile(e.target.value);
  };

  function resetFormFields() {
    setFormValues({
      title: "",
      city: "",
      country: "",
      date: "",
      description: "",
    });
    setFile("");
  }

  return (
    <div>
      <div className="container form-container">
        <div className="black-container"></div>
        <img className="bg-image" src={image} alt="background" />
        <h1>Travel Logger</h1>
        <h2>
          <span>Customize</span> your Travel Experience
        </h2>
        <p className="form-p-text">
          Document your favourite travel experiences and never forget them
          again. Logging them will not only bring back great memories but also
          help you remeber all the details when you want to share them. Bring
          back that nostalgic feeling of being on a beach in the middle of
          nowhere, or hiking up an immeasurable mountain in the valleys of
          British Columbia. Remeber the beauty of our planet and share your
          stories so that everyone can appreciate what the world has to offer.
        </p>
        <form onSubmit={saveTravelStory}>
          <div className="input-container">
            <input
              className="text-input"
              id="story-title"
              type="text"
              value={formValues.title}
              onChange={(e) =>
                setFormValues({ ...formValues, title: e.target.value })
              }
              required
            />
            <label htmlFor="story-title">Title</label>
          </div>

          <div className="input-container">
            <input
              className="text-input"
              id="story-country"
              type="text"
              value={formValues.country}
              onChange={(e) =>
                setFormValues({ ...formValues, country: e.target.value })
              }
              required
            />
            <label htmlFor="story-country">Country</label>
          </div>

          <div className="input-container">
            <input
              className="text-input"
              id="story-city"
              type="text"
              value={formValues.city}
              onChange={(e) =>
                setFormValues({ ...formValues, city: e.target.value })
              }
              required
            />
            <label htmlFor="story-city">City</label>
          </div>

          <div className="input-container">
            <input
              className="text-input"
              id="story-date"
              type="text"
              value={formValues.date}
              onChange={(e) =>
                setFormValues({ ...formValues, date: e.target.value })
              }
              required
            />
            <label htmlFor="story-date">Date</label>
          </div>

          <div className="input-container">
            <textarea
              id="story-description"
              type="text"
              rows="10"
              cols="50"
              // placeholder="Tell us details about your trip"
              value={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
              required
            />
            <label htmlFor="story-description">
              Tell us details about your trip...
            </label>
          </div>

          <label htmlFor="image" className="image-label">
            Image
          </label>
          <input
            id="image"
            name="file"
            value={images}
            type="file"
            onChange={handleFileChange}
            required
          />

          <button className="btn-primary btn-form" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
