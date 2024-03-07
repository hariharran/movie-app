import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.css";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "Movies" ? "Series" : "Movies"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
           
          </select>
        </div>
      )}
      {content && content.img && ( 
        <>
          <img src={content.img} alt="" />
          <div className="info">
            {content.imgTitle && <img src={content.imgTitle} alt="" />}
            <div className="content">
            <div>
              {content.year && <span className="year">{content.year}</span>}
              </div>
              <div>|</div>
            <div>
              {content.limit && <span className="limit">{content.limit}</span>}
              </div>
                <div>|</div>
            <div>{content.genre && <span className="type">{content.genre}</span>}</div>
            </div>
            {content.desc && <span className="desc">{content.desc}</span>}
            <div className="buttons">
              <button className="play">
                <PlayArrow />
                  <a href={content.video} target="_blank">
                      play
                  </a>
              </button>
              <button className="more">
                <InfoOutlined />
                <span>Info</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
