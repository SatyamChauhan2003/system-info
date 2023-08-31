import React from "react";
import { useDataContext } from "../context/dataContext";

const List = () => {
  const { item } = useDataContext();
  return (
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
                    <div className="row my-3">
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
  );
};

export default List;
