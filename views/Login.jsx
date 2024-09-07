export default function Login() {
    return (
      <div className="wrapper">
        <form action="">
          <h1>DramaKu</h1>
  
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <i className="bx bxs-user"></i>
          </div>
  
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className="bx bxs-lock"></i>
          </div>
  
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
  
          <div className="button">
          <button type="submit" className="btn">Login</button>
          <button type="submit" className="btn">Sign In with Google <i className="bx bxl-google"></i></button>
          </div>
  
          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register Now</a>
            </p>
          </div>
        </form>
      </div>
    );
}