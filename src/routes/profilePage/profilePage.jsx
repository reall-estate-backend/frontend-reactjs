import "./profilePage.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { getAuthUser } from "../../helpers/apiService";
import { request } from "../../helpers/apiService";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const authUser = getAuthUser();
      if (authUser) {
        console.log(user);
        try {
          const response = await request("GET", `/api/v1/users/${authUser.id}`);
          setUser(response.data);
        } catch (err) {
          setError(err.message);
        }
      }
    };
    getUser();
  }, []);

  if (!user) {
    return <div className="loading">Loading user data...</div>;
  }

  return (
    <div className="container">
      <div className="left">
        <div style={{ paddingTop: "30px" }}>
          <div className="faq-header">
            <img
              src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&size=100`}
              alt="User Avatar"
              className="profile-avatar"
            />
            <h2 style={{ paddingLeft: "14px", fontSize: "40px" }}>
              Welcome back, {user.firstName}!
            </h2>
          </div>
          <div className="faq-content">
            <div className="faq-question">
              <input id="q1" type="checkbox" className="panel" />
              <div className="plus"></div>
              <label for="q1" className="panel-title">
                <FaUser /> <span className="label"> {" "}  </span>
                <span className="value">{user.firstName}</span>
              </label>
            </div>

            <div className="faq-question">
              <input id="q2" type="checkbox" className="panel" />
              <div className="plus"></div>
              <label for="q2" className="panel-title">
                <FaUser /> <span className="label">  {" "}</span>
                <span className="value">{user.lastName}</span>
              </label>
            </div>

            <div className="faq-question">
              <input id="q3" type="checkbox" className="panel" />
              <div className="plus"></div>
              <label for="q3" className="panel-title">
                <FaEnvelope /> <span className="label">  {" "}</span>
                <span className="value">{user.email}</span>
              </label>
            </div>

            <div className="faq-question">
              <input id="q4" type="checkbox" className="panel" />
              <div className="plus"></div>
              <label for="q4" className="panel-title">
                <FaPhone /> <span className="label"> {" "}</span>
                <span className="value">{user.phone}</span>
              </label>
            </div>

            <div className="faq-question">
              <input id="q4" type="checkbox" className="panel" />
              <div className="plus"></div>
              <label for="q4" className="panel-title">
                <Link to={`/UpdateProfile/${user.id}`}>
                  <button className="updateButton">Update Profile</button>
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="right">
        <img src="bg.png" alt="Profile" />
      </div>
    </div>
  );
}

export default ProfilePage;
