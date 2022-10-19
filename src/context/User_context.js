import React, { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; //jab single jagah use karna ho tab bas iska use kar sakte hen context caret carne ki zarurat nahi he

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();
  const [myUser, setMyUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [usersPicture, setUsersPicture] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setUserName(user.given_name);
      setUsersPicture(user.picture);
      setUserLastName(user.family_name);
      setMyUser(user);
    } else {
      setMyUser(false);
    }
  }, [isAuthenticated]);
  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        myUser,
        userName,
        usersPicture,
        userLastName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
