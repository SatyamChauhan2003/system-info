import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useDataContext } from "./context/dataContext";

const App = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const deviceID = navigator.userAgent;

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { submitData } = useDataContext();
  const { item, isLoading } = useDataContext();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  const handleData = async (e) => {
    e.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    let item = { deviceID, capturedImage, latitude, longitude };
    try {
      let result = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });
      result = await result.json();
      localStorage.setItem("system-info", JSON.stringify(result));
    } catch (error) {}
  };
  if (isLoading === true) {
    alert("User information saved successfully");
  }

  return (
    <>
      <div className="container mt-3 border border-2 border-secondary">
        <div className="row">
          <h3 className="d-flex justify-content-center my-2 border border-top-0 border-2">
            User Information
          </h3>
          <div className="col-md-4">
            {/*Device camera*/}

            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-75 mt-4"
            />
            <br />
            <button onClick={handleData} className="mx-7 btn btn-primary">
              Capture Photo
            </button>
          </div>
          <div className="col-md-2 mt-4 ">
            {capturedImage && <img src={capturedImage} alt="Captured" />}
          </div>
        </div>

        {/*Device ID */}

        <div className="row mt-4 my-1">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <h5>Device ID</h5>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <p>{deviceID}</p>
          </div>
        </div>

        {/*Device Location */}

        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <h5>Lat</h5>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <p>{latitude}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <h5>Log</h5>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <p>{longitude}</p>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="btn"
            className="btn btn-outline-primary px-5 my-2 py-2"
            onClick={() =>
              submitData(deviceID, capturedImage, latitude, longitude)
            }
          >
            Save
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="container border border-2 border-secondary my-4 ">
        <h4 className="py-2 border border-start-0 border-end-0 border-top-0 border-2 d-flex justify-content-center">
          User List
        </h4>
        {item &&
          item.map((item) => {
            return (
              <>
                <div key={item}>
                  <div className="row my-3">
                    <div className="col-md-4">
                      <img
                        src={item.capturedImage}
                        alt="user_profile"
                        className="w-50"
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="row">
                        <div className="col-md-2">
                          <h5>Device ID :</h5>
                        </div>
                        <div className="col-md-5">{item.deviceID}</div>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <h5>Lat :</h5>
                        </div>
                        <div className="col-md-5">{item.latitude}</div>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <h5>Log :</h5>
                        </div>
                        <div className="col-md-5">{item.longitude}</div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default App;
