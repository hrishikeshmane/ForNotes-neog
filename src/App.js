import "./App.css";
import Header from "./Header";
import Main from "./Main";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Archives from "./Archives";
import Search from "./Search";
import Filter from "./Filter";
import { Snackbar } from "@mui/material";
import nextId from "react-id-generator";

function App() {
  const [searchField, setSearchField] = useState(null);
  const [view, setView] = useState("grid");
  const [openFilter, setOpenFilter] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  async function setUser() {
    try {
      await setDoc(
        doc(db, "Notes", sessionStorage.getItem("email")),
        {
          username: sessionStorage.getItem("email"),
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
      setOpenSnackbar(true);
    }
  }

  useEffect(() => {
    // set user data in session storage
    sessionStorage.setItem("uid", user?.user?.uid);
    sessionStorage.setItem("email", user?.user?.email);
    sessionStorage.setItem("displayName", user?.user?.displayName);
    sessionStorage.setItem("photoURL", user?.user?.photoURL);

    //Make entry for new user in db
    setUser();
  }, [user]);

  if (user) {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="grid-container">
            <Header
              view={view}
              setView={setView}
              setSearchField={setSearchField}
              setOpenFilter={setOpenFilter}
            />
            <Routes>
              <Route
                path="/"
                exact
                element={<Main view={view} setView={setView} />}
              />
              <Route
                path="/archives"
                exact
                element={<Archives view={view} setView={setView} />}
              />
              <Route
                path="/search"
                exact
                element={<Search view={view} searchField={searchField} />}
              />
            </Routes>

            <Filter openFilter={openFilter} setOpenFilter={setOpenFilter} />
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              message={`Error adding document`}
              key={nextId("snackbar-")}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <div className="App">
      <div className="grid-container">
        <div className="signin-container">
          {loading ? (
            <h4 className="signin-loading">Loading...</h4>
          ) : error ? (
            <p className="signin-loading">Error: {error.message}</p>
          ) : (
            <button
              className="signin-button"
              onClick={() => signInWithGoogle()}
            >
              Sign In with Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
