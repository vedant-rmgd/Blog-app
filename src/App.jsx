import "./App.css";
import { useState, useEffect } from "react";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { setAllSavedPosts } from "./store/postSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
          const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
          dispatch(setAllSavedPosts(saved));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-400">
      
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      
    </div>
  ) : null;
}

export default App;
