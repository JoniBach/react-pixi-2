import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserContextProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [dynamicPageTitle, setDynamicPageTitle] =
    useState("welcome to gridiak");
  const checkToken = async () => {
    const { data } = await axios.get("/isUserAuth", {
      headers: {
        " x-access-token": localStorage.getItem("token"),
      },
    });

    if (data.isLoggedIn) {
      setActiveUser(data);
    }
  };

  const signIn = async (user) => {
    const { data } = await axios.post("/login", user);
    localStorage.setItem("token", data.token);
    console.log(data);
    return data;
  };

  const signUp = async (user) => {
    const { data } = await axios.post("/register", user);

    checkToken();
    return data;
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setActiveUser(null);
    alert("user signed out");

    checkToken();
    return true;
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        activeUser,
        signUp,
        signIn,
        signOut,
        dynamicPageTitle: dynamicPageTitle.replace(
          "$name",
          activeUser?.username
        ),
        setDynamicPageTitle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
