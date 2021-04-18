import React from "react";
import axios from "../../util/axios";
import { scroller } from "react-scroll";
import "./form.scss";
import domain from "../../util/domain";

// components
import Loader from "../loader/Loader";

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [charLeft, setCharLeft] = React.useState(340);
  const [maxChar] = React.useState(340);

  async function saveTravelStory(e) {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("img", imageData);

      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });

      setIsLoading(true);

      await axios.post(`${domain}/api/travel-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log("an err occured==>>", err);
    }
    setCharLeft(340);
    setIsLoading(false);
    scrollToElement("posts");
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

  const scrollToElement = (element) => {
    scroller.scrollTo(element, {
      duration: 1000,
      delay: 50,
      smooth: true,
      offset: 1000,
    });
  };

  const handleWordCount = (e) => {
    const charCount = e.target.value.length;
    const charLeft = maxChar - charCount;
    setCharLeft(charLeft);
  };

  const handleTextAreaOnChange = (e) => {
    handleWordCount(e);
    setFormValues({ ...formValues, description: e.target.value });
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="container form-container">
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
              maxLength="340"
              // placeholder="Tell us details about your trip"
              value={formValues.description}
              onChange={(e) => handleTextAreaOnChange(e)}
              required
            />
            <label htmlFor="story-description">
              Tell us details about your trip...
            </label>
          </div>
          <p className="char-left">Characters left: {charLeft}/340</p>

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
    </React.Fragment>
  );
}

export default Form;
