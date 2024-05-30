import React, { useEffect, useState } from 'react';
import image from '../assets/signin_bg.jpg';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [VerifyPassword, setVerifyPassword] = useState("");
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
      if (registerPassword !== VerifyPassword) {
        setErrorMessage("Passwords do not match!");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      setErrorMessage("");
      navigate('/');
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setErrorMessage('Password should be at least 6 characters!');
      } else {
        setErrorMessage(error.message)
      }
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

  const handleLoginPage = (e) => {
    e.preventDefault();
    navigate('/login');
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
      <div className="container my-4" style={{ width: "400px", backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '20px', borderRadius: '10px' }}>
        <div className="text-center mb-4">
          <div className="text-light" style={{ fontSize: "30px", fontWeight: "bold" }}>
            <a href='/' style={{ textDecoration: "none", cursor: "pointer" }}>InThe<span className='text-danger'>Now</span></a>
          </div>
        </div>
        <form className="login-page">
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
              <input
                className="form-control mb-3"
                type={showRegisterPassword ? "text" : "password"}
                name="VerifyPassword"
                placeholder="Verify Password"
                value={VerifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
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
              {errorMessage && <p className="text-danger px-2 fw-bold bg-light rounded">{errorMessage}</p>}
              <button onClick={register} className="btn btn-primary w-100" type="submit">Sign Up</button>
            </div>
            <div className="">
              <p>already have an account? <a onClick={handleLoginPage} style={{cursor:"pointer", textDecoration:"underline"}}>sign in!</a></p>
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