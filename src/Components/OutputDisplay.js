import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/fontawesome-free-solid";
import { OutputItem } from "./OutputItem";
import { getDatabase, ref as dbRef, get } from "firebase/database";

export const OutputDisplay = () => {
  let mainKey;
  const { uniqueKey } = useParams();
  if (uniqueKey === "0") {
    mainKey = "54557797";
  } else {
    mainKey = uniqueKey;
  }
  const [output, setOutput] = useState([]);
  const [staticInfo, setStaticInfo] = useState(null);
  const [allOutputData, setAllOutputData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const allOutputRef = dbRef(db, `output/${mainKey}`);
    get(allOutputRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setAllOutputData(snapshot.val());
        } else {
          console.log(`No data available for this key: ${mainKey}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [mainKey]);

  useEffect(() => {
    if (allOutputData === null) return;
    const transformData = (obj) => {
      const cleanedObj = {};
      for (const key in obj) {
        if (key === `static`) continue;
        cleanedObj[obj[key].counter] = {
          ...obj[key],
          title: key,
        };
      }
      let i = 0;
      const arr = [];
      console.log(cleanedObj);
      while (true) {
        if (typeof cleanedObj[i] === "undefined") break;
        arr.push({
          imgSrc: cleanedObj[i].url,
          title: cleanedObj[i].title,
          bodyText: cleanedObj[i].data,
          unique: i,
        });
        i++;
      }
      return {
        data: arr,
        static: obj.static,
      };
    };
    setOutput(transformData(allOutputData).data);
    setStaticInfo(transformData(allOutputData).static);
  }, [allOutputData]);

  return (
    <div className="output-container">
      <div className="output-header">
        <div className="back-button">
          <button
            className="btn btn-danger"
            onClick={() => {
              const url = new URL(`http://127.0.0.1/progressdisplay`);
              url.searchParams.append(`data`, JSON.stringify(staticInfo));
              navigate(url.pathname + url.search);
            }}
            style={{
              width: "100px",
              height: "50px",
              fontSize: "150%",
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div className="output-header-content">
          <h2 className="text-center">{`Results and Conclusion`}</h2>
        </div>
      </div>
      <div className="output-content">
        <div className="accordion" id="accordionParent">
          {output.map(({ imgSrc, title, bodyText, unique }) => (
            <OutputItem
              imgSrc={imgSrc}
              title={title}
              bodyText={bodyText}
              unique={unique}
              key={unique}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
