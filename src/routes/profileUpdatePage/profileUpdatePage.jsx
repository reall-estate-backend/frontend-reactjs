import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import "./profileUpdatePage.scss";

function ProfileUpdatePage() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const { userId } = useParams(); // Récupérer l'ID de l'utilisateur depuis l'URL
  const navigate = useNavigate();


  useEffect(() => {
    if (userId) {
      console.log("Fetching user with ID:", userId);
      UserService.getUserById(userId)
          .then((response) => {
            if (response.data) {
              setUser(response.data);
              console.log("User data fetched:", response.data);
            } else {
              console.log("No user data found for the given ID");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
    } else {
      console.log("No userId provided");
    }
  }, [userId]);


  useEffect(() => {
    console.log("User state has been updated:", user);
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.updateUser(user)
        .then((response) => {
          navigate('/profile');
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
  };

  return (
      <div className="profileUpdatePage">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Update Your Details and Stay Connected</h1>
            <div className="row">
              <div className="item">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={handleChange}
                />
              </div>

              <div className="item">
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={user.firstName}
                    onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="item">
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={user.lastName}
                    onChange={handleChange}
                />
              </div>

              <div className="item">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="item">
                <label htmlFor="phone">Phone Number</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={user.phone}
                    onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit">Update</button>
          </form>

        </div>
      </div>
  );
}

export default ProfileUpdatePage;
