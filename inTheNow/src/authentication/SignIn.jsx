import React, { useEffect, useState } from 'react';
import image from '../assets/signin_bg.jpg';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const register = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(userCredential);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
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

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div style={{ 
      maxHeight: "100vh", 
      backgroundImage: `url(${image})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      color: '#fff' 
    }} loading="slow">
      <div className="container my-4" style={{ width: "400px", backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '20px', borderRadius: '10px' }}>
        <div className="text-center mb-4">
          <div className="text-light" style={{ fontSize: "30px", fontWeight: "bold" }}>
            <a href='/' style={{ textDecoration: "none", cursor: "pointer" }}>InThe<span className='text-danger'>Now</span></a>
          </div>
        </div>
        <form className="login-page">
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="section my-4">
            <h3 className="text-center text-danger mb-4">Sign Up</h3>
            <div className="form-group">
              <input
                className="form-control mb-3"
                type="email"
                name="registerEmail"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
              <input
                className="form-control mb-3"
                type={showRegisterPassword ? "text" : "password"}
                name="registerPassword"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <div className="form-check mb-3">
                <input 
                  type="checkbox"
                  className='form-check-input'
                  id="showRegisterPassword"
                  checked={showRegisterPassword}
                  onChange={() => setShowRegisterPassword(!showRegisterPassword)}
                />
                <label className="form-check-label" htmlFor="showRegisterPassword">Show Password</label>
              </div>
              <button onClick={register} className="btn btn-primary w-100" type="submit">Sign Up</button>
            </div>
          </div>

          <div className="text-center text-light fw-bold fs-5 mb-4">OR</div>

          <div className="section my-4">
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
          </div>
          {user && (
            <div className="text-center my-4">
              <h4 className="text-light">User Logged In: {user.email}</h4>
              <button onClick={logout} className="btn btn-danger">Sign Out</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
