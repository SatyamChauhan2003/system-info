import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/dataReducer";

const dataContext = createContext();

const getLocalStorageData = () => {
  let localCartData = localStorage.getItem("system");

  const parseData = JSON.parse(localCartData);
  if (!Array.isArray(parseData)) return [];
  return parseData;
};
const initialState = {
  item: getLocalStorageData(),
  isLoading: false,
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitData = (deviceID, capturedImage, latitude, longitude) => {
    dispatch({
      type: "USER_LIST",
      payload: { deviceID, capturedImage, latitude, longitude },
    });
  };

  return (
    <dataContext.Provider
      value={{
        ...state,
        submitData,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

const useDataContext = () => {
  return useContext(dataContext);
};

export { DataProvider, useDataContext };
