import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Contacts } from "./components/Contacts";
import { FirstScreen } from "./components/FirstScreen";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./components/NotFound";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<FirstScreen />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/contacts" element={<Contacts isAuth={isAuth} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
