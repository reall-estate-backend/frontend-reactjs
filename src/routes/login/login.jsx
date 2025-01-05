import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { request } from "../../helpers/apiService"; 
import { setAuthHeader } from "../../helpers/apiService"; 
import { setAuthUser } from "../../helpers/apiService"; 

function Login() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  }); 
 
  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request('POST', '/api/v1/users/login', formData);  
      setAuthHeader(response.data.token); 
      setAuthUser(response.data);

      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          /> 
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>} 
          <button type="submit">Login</button>
          <Link to="/register">{"Don't"} have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
    </div>
  );
}

export default Login;
