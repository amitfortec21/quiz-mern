import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AdminSignIn() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser(formData);
    };

    const signInUser = async (data) => {
        const res = await axios.post(`http://localhost:7000/admin/`, data)
        .then(res => {alert(res.data.message); console.log(res); navigate(`/adminhome`);})
        .catch(err => {alert(err.response.data.message)});
    };

  return (
    <>
        <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="text-center my-3">Admin Login</h1>
                        <form action="" method="post" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email" onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Enter password</label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="Enter your password" onChange={handleInputChange} required />
                            </div>
                            <div className="d-flex flex-column">
                                <button className="btn btn-dark fw-bold" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </>
  )
}
