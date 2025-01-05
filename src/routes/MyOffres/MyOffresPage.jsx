import MyList from "../../components/MyOffresList/MyList";
import "./MyOffresPage.scss";
import { Link } from "react-router-dom";

function MyOffresPage() {
  return (
    <div className="details">
      <div className="wrapper" >
        <div
          className="title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{fontSize: "45px" }}>My Offers</h1>
          <Link to="/AddOffre">
            <button
              style={{
                backgroundColor: "#fece51",
                color: "black",
                fontSize: "16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                maxWidth: "200px",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f0b600";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#fece51";
                e.target.style.transform = "scale(1)";
              }}
              onFocus={(e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "0 0 5px rgba(254, 206, 81, 0.7)";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
              }}
            >
              Create New Post
            </button>
          </Link>
        </div>
        <hr  style={{ margin: "5px" }}/>
        <MyList />
      </div>
    </div>
  );
}

export default MyOffresPage;
