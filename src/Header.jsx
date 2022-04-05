import "./Header.css";
import { Avatar, InputBase, Paper } from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const Header = ({ view, setView, setSearchField }) => {
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut(auth);
  };

  function toggleView() {
    setView(view === "grid" ? "list" : "grid");
  }
  return (
    <header>
      <h2 className="header-logo" onClick={() => navigate("/")}>
        Fornotes
      </h2>

      <div className="search-field">
        <Paper
          component="form"
          sx={{
            p: "0px 4px",
            display: "flex",
            alignItems: "center",
            minWidth: 100,
            width: "70%",
            marginInline: "auto",
            height: 30,
            backgroundColor: "#ffffff34",
          }}
        >
          <InputBase
            onClick={() => navigate("/search")}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            onChange={(e) => setSearchField(e.target.value)}
          />
          <SearchIcon />
        </Paper>
      </div>

      <div className="header-action">
        <button className="toggle-button" onClick={() => navigate("/archives")}>
          <ArchiveOutlinedIcon className="view-toggle" />
        </button>
        <button className="toggle-button" onClick={toggleView}>
          {view === "grid" ? (
            <GridViewRoundedIcon className="view-toggle" />
          ) : (
            <TableRowsIcon className="view-toggle" />
          )}
        </button>
        <Avatar
          sx={{ cursor: "pointer" }}
          onClick={signOutHandler}
          src={sessionStorage.photoURL}
          alt={sessionStorage.displayName}
        />
      </div>
    </header>
  );
};

export default Header;
