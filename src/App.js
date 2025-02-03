// import "./App.css";
// import SideBar from "./components/Sidebar/SideBar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
// import Messages from "./pages/Messages";
// import FileManager from "./pages/FileManager";
// import Analytics from "./pages/Analytics";
// import Order from "./pages/Order";
// import Saved from "./pages/Saved";
// import Setting from "./pages/Setting";
// import Distributor from "./pages/Distributor";

// function App() {
//   return (
//     <Router>
//       <SideBar>
//         <Routes>
//         <Route path="/" element={<LoginPage />} />
//           <Route path="/Dashboard" element={<Dashboard />} />
//           <Route path="/users/distributor" element={<Distributor />} />
//           <Route path="/messages" element={<Messages />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/file-manager" element={<FileManager />} />
//           <Route path="/order" element={<Order />} />
//           <Route path="/saved" element={<Saved />} />
//           <Route path="/settings" element={<Setting />} />

//           <Route path="*" element={<> not found</>} />
//         </Routes>
//       </SideBar>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import Distributor from "./pages/Distributor";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Callback function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <SideBar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/users/distributor" element={<Distributor />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/file-manager" element={<FileManager />} />
            <Route path="/order" element={<Order />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="*" element={<>Not found</>} />
          </Routes>
        </SideBar>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<>Not found</>} />
        </Routes>
      )}
    </Router>
  );
}

export default App;