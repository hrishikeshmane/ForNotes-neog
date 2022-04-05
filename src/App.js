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

function App() {
  const [searchField, setSearchField] = useState(null);
  const [view, setView] = useState("grid");
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

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
