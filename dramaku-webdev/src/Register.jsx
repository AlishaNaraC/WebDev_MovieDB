import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Register() {
    const [values, setValues] = useState({
      username: '',
      email: '',
      password: ''
    })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        const jsonData = await response.json();
  
        if (response.ok) {
          navigate(`/login`);
        } else {
          alert(jsonData.error || 'Registration failed');
        }
  
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }; 
    
    const handleGoogleSuccess = async (response) => {
      console.log('Google response:', response);
      try {
        const res = await fetch('http://localhost:5000/google-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: response.credential }),
        });

        const jsonData = await res.json();

        if (res.ok) {
          localStorage.setItem('token', jsonData.token);
          navigate(`/`);
        } else {
          alert(jsonData.error || 'Google Sign-In failed');
        }
      } catch (err) {
        alert('Error: ' + err.message);
      }
    };

    const handleGoogleFailure = () => {
      alert('Google Sign-In failed. Please try again.');
    };

    return (
      <GoogleOAuthProvider clientId="657909247330-nhrl53bu2i9co8fqqhhd97qp7vridlbc.apps.googleusercontent.com">
      <div className="wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="text" placeholder="Username" onChange={e => setValues({...values, username: e.target.value})} required />
          </div>
  
          <div className="input-box">
            <input type="email" placeholder="Email" onChange={e => setValues({...values, email: e.target.value})} required />
          </div>
  
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Password"
              minLength={8} 
              title='Password must be at least 8 characters long'
              onChange={e => setValues({...values, password: e.target.value})} 
              required 
            />
          </div>
  
          <button type="submit" className="btn">Register</button>
          <div className="google-login">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
            />
          </div>
        </form>
      </div>
      </GoogleOAuthProvider>
    );
  }

export default Register;