import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './FirebaseConfig';

export default function SignIn() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);

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
    } catch (error) {
      console.log(error.message);
    }
  }

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(userCredential);
    } catch (error) {
      console.log(error.message);
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
    <div className="container my-4" style={{ width: "500px" }}>
      <form className="login-page">
        <div className="section my-5">
          <h3 className="text-center text-danger mb-4">Register User</h3>
          <div className="form-group">
            <input
              className="form-control mb-3"
              type="email"
              name="registerEmail"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              className="form-control mb-3"
              type="password"
              name="registerPassword"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button onClick={register} className="btn btn-primary w-100" type="submit">Sign Up</button>
          </div>
        </div>

        <div className="section my-5">
          <h3 className="text-center text-danger mb-4">Login</h3>
          <div className="form-group">
            <input
              className="form-control mb-3"
              type="email"
              name="loginEmail"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              className="form-control mb-3"
              type="password"
              name="loginPassword"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={login} className="btn btn-success w-100" type="submit">Login</button>
          </div>
        </div>

        {user && (
          <div className="text-center my-5">
            <h4>User Logged In: {user.email}</h4>
            <button onClick={logout} className="btn btn-danger">Sign Out</button>
          </div>
        )}
      </form>
    </div>
  );
}
