import React, { createContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/Header";
import { getUserProfile } from "./API";
export const ProfileContext = createContext({});

function App() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getUserProfile().then((res) => {
      setProfile(res);
    });
  }, []);

  return (
    <div className="App">
      <ProfileContext.Provider value={profile}>
        <AppHeader />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />s
        </header>
      </ProfileContext.Provider>
    </div>
  );
}

export default App;
