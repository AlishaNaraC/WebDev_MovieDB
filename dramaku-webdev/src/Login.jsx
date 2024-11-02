import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Login() {
    const [values, setValues] = useState({
      username: '',
      password: ''
    })

    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        });

        const jsonData = await response.json();

        if (response.ok) {
          navigate(`/`);
        } else if(response.status === 403){
          alert("Your account has been suspended.")
        } else {
          alert(jsonData.error || 'Login failed');
        }

      } catch (err) {
        alert('Error: ' + err.message);
      }
    };

    const handleGoogleSuccess = async (response) => {
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
          navigate(`/login`);
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
        <form onSubmit={handleLogin}>
          <h1>DramaKu</h1>
  
          <div className="input-box">
            <input type="text" placeholder="Username" onChange={e => setValues({...values, username: e.target.value})} required />
            <i className="bx bxs-user"></i>
          </div>
  
          <div className="input-box">
            <input type="password" placeholder="Password" onChange={e => setValues({...values, password: e.target.value})} required />
            <i className="bx bxs-lock"></i>
          </div>
  
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link>Forgot Password?</Link>
          </div>
  
          <div className="button">
          <button type="submit" className="btn">Login</button>
          <div className="google-login">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
            />
          </div>
          </div>
  
          <div className="register-link">
            <p>
              Don't have an account? <Link to={"/Register"}>Register Now</Link>
            </p>
          </div>
        </form>
      </div>
      </GoogleOAuthProvider>
    );
}

export default Login;