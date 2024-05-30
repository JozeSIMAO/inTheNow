import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from './FirebaseConfig'
import image from '../assets/signin_bg.jpg'

export default function Login() {

    const navigate = useNavigate();
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleSignUpPage = (e) => {
        e.preventDefault();
        navigate('/SignIn');
    }

    const login = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
          console.log(userCredential);
          setErrorMessage("");
          navigate('/');
        } catch (error) {
          setErrorMessage('Wrong credentials or user not found');
        }
    }

  return (
    <div style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column', 
        color: '#fff' 
      }} loading="slow">
        <div className="section my-4" style={{ width: "400px", backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '20px', borderRadius: '10px' }}>
        <div className="text-center mb-4">
          <div className="text-light" style={{ fontSize: "30px", fontWeight: "bold" }}>
            <a href='/' style={{ textDecoration: "none", cursor: "pointer" }}>InThe<span className='text-danger'>Now</span></a>
          </div>
        </div>
            <h3 className="text-center text-danger mb-4">Login</h3>
            <div className="form-group">
              <input
                className="form-control mb-3"
                type="email"
                name="loginEmail"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                className="form-control mb-3"
                type={showLoginPassword ? "text" : "password"}
                name="loginPassword"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <div className="form-check mb-3">
                <input 
                  type="checkbox"
                  className='form-check-input'
                  id="showLoginPassword"
                  checked={showLoginPassword}
                  onChange={() => setShowLoginPassword(!showLoginPassword)}
                />
                <label className="form-check-label" htmlFor="showLoginPassword">Show Password</label>
              </div>
              <button onClick={login} className="btn btn-success w-100" type="submit">Login</button>
            </div>
            <div className="mt-2">
              <a style={{cursor:"pointer", textDecoration:"underline"}} onClick={handleSignUpPage}>create an acccount</a>
            </div>
        </div>
    </div>
  )
}
