import React from "react";
import "./app.scss";
import axios from "axios";

function App() {
  const [travelStories, setTravelStories] = React.useState([]);
  const [formValues, setFormValues] = React.useState({});

  React.useEffect(() => {
    getTravelStories();
  }, []);

  async function getTravelStories() {
    const response = await axios.get("http://localhost:5000/");

    setTravelStories(response.data);
  }

  async function saveTravelStory(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });

      await axios.post("http://localhost:5000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log("an err occured==>>", err);
    }

    getTravelStories();
  }

  return (
    <div className="container">
      <form onSubmit={saveTravelStory}>
        <label htmlFor="story-title">Title</label>
        <input
          id="story-title"
          type="text"
          value={formValues.title}
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
        />

        <label htmlFor="story-country">Country</label>
        <input
          id="story-country"
          type="text"
          value={formValues.country}
          onChange={(e) =>
            setFormValues({ ...formValues, country: e.target.value })
          }
        />

        <label htmlFor="story-city">City</label>
        <input
          id="story-city"
          type="text"
          value={formValues.city}
          onChange={(e) =>
            setFormValues({ ...formValues, city: e.target.value })
          }
        />

        <label htmlFor="story-date">Date</label>
        <input
          id="story-date"
          type="text"
          value={formValues.date}
          onChange={(e) =>
            setFormValues({ ...formValues, date: e.target.value })
          }
        />

        <label htmlFor="story-description">Description</label>
        <textarea
          id="story-description"
          type="text"
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
        />

        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setFormValues({ ...formValues, img: e.target.files[0] });
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
