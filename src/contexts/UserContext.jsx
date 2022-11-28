import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserContextProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const history = useNavigate();

  const checkToken = async () => {
    const { data } = await axios.get("/isUserAuth", {
      headers: {
        " x-access-token": localStorage.getItem("token"),
      },
    });

    

    if (data.isLoggedIn) {
      setActiveUser(data)
    }
    // .then((data) =>
    //   data.isLoggedIn
    //     ? history.pushState("/dashboard")
    //     : history.pushState("/")
    // );
    console.log(data);
  };


  const signIn = async (user) => {
    const { data } = await axios.post("/login", user);
    
    console.log(data);
    localStorage.setItem("token", data.token);
    checkToken()
  };

  const signUp = async (user) => {
    const { data } = await axios.post("/register", user);
    localStorage.setItem("token", data.token);

    console.log(data);

  };
  console.log(localStorage.getItem("token"));

  const signOut = () => {
    localStorage.removeItem("token");
    setActiveUser(null)
  };

  useEffect(() => {
    checkToken();
  }, [localStorage]);

  return (
    <UserContext.Provider
      value={{
        activeUser,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
