import { useContext, useState } from "react";
import "./newMovie.css";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function NewMovie() {
  const [movie, setMovie] = useState({
    img: "",
    imgTitle: "",
    imgSm: "",
    title: "",
    desc: "",
    year: "",
    genre: "",
    duration: "",
    limit: "",
    isSeries: false,
    trailer: "",
    video: "",
  });
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("img", img);
    formData.append("imgTitle", imgTitle);
    formData.append("imgSm", imgSm);
    formData.append("trailer", trailer);
    formData.append("video", video);

    try {
      const response = await fetch("your_backend_upload_endpoint", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const urls = await response.json();

        setMovie((prev) => ({
          ...prev,
          img: urls.img,
          imgTitle: urls.imgTitle,
          imgSm: urls.imgSm,
          trailer: urls.trailer,
          video: urls.video,
        }));

        setUploaded((prev) => prev + 1);
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error during file upload", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
       
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
