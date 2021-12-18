import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from "@firebase/remote-config";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/fontawesome-free-solid";
import { Card } from "./Card";
import "./CSS/ChooseApproach.css";
import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { PlusCircle } from "react-bootstrap-icons";
import { UrlDisplay } from "./UrlDisplay";
import { handlePageChange, validURL } from "./utils";

const extractName = (url) => url.split("/")[3].replaceAll("-", " ");

export const ChooseApproach = () => {
  const addToList = () => {
    // console.log(`+ clicked`);
    if (validURL(formLink) === false) {
      alert("Invalid amazon link!");
      return;
    }
    if (lastClickedTraining) {
      if (trainingLinks.includes(formLink)) {
        alert("Link already exists in list!");
        setFormLink("");
        return;
      }
      setTrainingLinks((trainLinks) => trainLinks.concat([formLink]));
    } else {
      if (testingLinks.includes(formLink)) {
        alert("Link already exists in list!");
        setFormLink("");
        return;
      }
      setTestingLinks((testLinks) => testLinks.concat([formLink]));
    }
    setFormLink("");
  };
  const [classData, setClassData] = useState({
    training: "",
    test: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    const configEvent = async () => {
      const remoteConfig = getRemoteConfig();
      const change = await fetchAndActivate(remoteConfig);

      console.log(`activated ${change}`);
      const val = getValue(remoteConfig, "reviewzon_online");
      console.log(val);
      const url = JSON.parse(val._value)["backend_url"];
      await fetch(`${url}/online`)
        .then((_res) => setIsDisabled(false))
        .catch((err) => {
          setIsDisabled(true);
          // console.error(err);
          console.log("this got triggered");
        });
    };
    configEvent();
  }, []);

  const [trainingLinks, setTrainingLinks] = useState([]);
  const [testingLinks, setTestingLinks] = useState([]);
  const [lastClickedTraining, setLastClickedTraining] = useState(false);
  const [formLink, setFormLink] = useState("");
  const navigate = useNavigate();
  const manual = {
    text: "Create dataset by downloading reviews from Amazon",
    title: "Online Dataset",
  };
  const localTop = {
    text: "Use a local dataset (Automotive Reviews - 20,473 entries)",
    title: "Local Dataset",
  };
  const localBottom = {
    text: "Use a local dataset (Musical Instrument Reviews - 250 entries)",
    title: "Local Dataset",
  };
  const handleChange = (e) => {
    const data = e.target.id;
    const category = data.split("-")[0];
    if (category === "training") {
      setClassData({
        ...classData,
        training: data.split("-")[2],
      });
      setLastClickedTraining(true);
    } else if (category === "test") {
      setClassData({
        ...classData,
        test: data.split("-")[2],
      });
      setLastClickedTraining(false);
    }
    console.log(`clicked ${data}`);
  };
  return (
    <div
      className="container"
      style={{
        paddingTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          width: "97vw",
        }}
        className="header-box"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            className="btn btn-danger"
            onClick={() => {
              navigate("/");
            }}
            style={{
              width: "5rem",
              height: "2.5rem",
              fontSize: "150%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>

        <h2 className="text-center main-heading" style={{ fontSize: "35px" }}>
          Choose Analysis Methodology
        </h2>
      </div>
      <div className="square-grid" onChange={handleChange}>
        <h4 className="text-center">Choose training set</h4>
        <Card
          classes={classData}
          text={localTop.text}
          title={localTop.title}
          name="training-set"
          mode="automatic"
          settingsDisabled={true}
          isDisabled={false}
        />
        <Card
          classes={classData}
          text={manual.text}
          title={manual.title}
          name="training-set"
          mode="manual"
          settingsDisabled={false}
          setCogClicked={() => {
            setLastClickedTraining(true);
          }}
          isDisabled={isDisabled}
        />
        <div className="buttons-next">
          <button
            className="btn btn-success"
            style={{ width: "100px", height: "50px", fontSize: "150%" }}
            onClick={() =>
              handlePageChange(
                classData,
                trainingLinks,
                testingLinks,
                navigate,
                isDisabled
              )
            }
          >
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <hr
          style={{
            gridColumnStart: 1,
            gridColumnEnd: -1,
          }}
        />
        <h4 className="text-center">Choose test set</h4>
        <Card
          classes={classData}
          text={localBottom.text}
          title={localBottom.title}
          name="test-set"
          mode="automatic"
          settingsDisabled={true}
          isDisabled={false}
        />
        <Card
          classes={classData}
          text={manual.text}
          title={manual.title}
          name="test-set"
          mode="manual"
          settingsDisabled={false}
          setCogClicked={() => setLastClickedTraining(false)}
          isDisabled={isDisabled}
        />
      </div>
      <Modal
        id="configModal"
        title="Select training configurations"
        extra_text="Paste your amazon link here and hit the plus button to add it to the dataset!"
      >
        <div>
          <div className=" ">
            <form
              className="form-group buttonIn"
              onSubmit={(e) => {
                e.preventDefault();
                addToList();
              }}
            >
              <input
                type="url"
                className="form-control"
                id="test-link"
                placeholder="https://www.amazon.in/example-product"
                value={formLink}
                onChange={(e) => setFormLink(e.currentTarget.value)}
              />
              <PlusCircle
                className="inside-button"
                style={{ backgroundColor: "white" }}
                onClick={addToList}
              />
            </form>
            <hr className="modal-hr" />
            {lastClickedTraining
              ? trainingLinks.map((link) => (
                  <UrlDisplay
                    url={extractName(link)}
                    key={link}
                    close={() => {
                      setTrainingLinks((links) =>
                        links.filter((li) => li !== link)
                      );
                    }}
                  />
                ))
              : testingLinks.map((link) => (
                  <UrlDisplay
                    url={extractName(link)}
                    key={link}
                    close={() => {
                      setTestingLinks((links) =>
                        links.filter((li) => li !== link)
                      );
                    }}
                  />
                ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
