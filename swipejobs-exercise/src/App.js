import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/Header";
import JobCardList from "./components/JobCardList";
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

        <JobCardList workerId={profile ? profile.workerId : null} />
      </ProfileContext.Provider>
    </div>
  );
}

export default App;
