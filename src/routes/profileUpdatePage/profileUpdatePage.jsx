import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./profileUpdatePage.scss";
import { request } from "../../helpers/apiService"; 


function ProfileUpdatePage() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const { userId } = useParams(); 
  const navigate = useNavigate();

    const getUser = async () => {
      try {
        const response = await request("GET", `/api/v1/users/${userId}`);
         setUser(response.data);
      } catch (err) {
        setError(err.message);
      } 
    };

      useEffect(() => {
        getUser();
      }, [userId]); 



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...user, id: userId };
      console.log("Sending user data:", updatedUser);
      const response = await request("PUT", `/api/v1/users`, updatedUser);
      if (response && response.status === 202) {
        console.log("User profile updated successfully.");
        navigate('/profile'); 
      } else {
        throw new Error('Failed to update user profile.');
      }
    } catch (error) {
      console.error("Error during profile update:", error.response?.data || error.message);
    }
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
