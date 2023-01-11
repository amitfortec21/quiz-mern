import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signUpUser(formData);
    };

    const signUpUser = async (data) => {
        const res = await axios.post(`http://localhost:7000/user/signup`, data)
        .then(res => {alert(res.data.message); navigate(`/home`);})
        .catch(err => {alert(err.response.data.message)});
    };

  return (
    <>
        <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="text-center my-3">Signup</h1>
                        <form action="" method="post" onSubmit={handleSubmit}>
                        <div className="mb-3">
                                <label htmlFor="name" className="form-label">Enter Name</label>
                                <input type="text" className="form-control" name="name" id="name" placeholder="Enter your name" onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email" onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Enter password</label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="Enter your password" onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">Enter mobile number</label>
                                <input type="tel" className="form-control" name="mobile" id="mobile" placeholder="Enter your mobile number" onChange={handleInputChange} required />
                            </div>
                            <div className="d-flex flex-column">
                                <button className="btn btn-dark fw-bold" type="submit">Signup</button>
                                <Link to="/signin" className="text-dark text-decoration-none" >Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </>
  )
}
