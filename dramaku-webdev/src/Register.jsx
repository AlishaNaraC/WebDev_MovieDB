export default function Register() {
    return (
      <div className="wrapper">
        <h1>Register</h1>
        <form>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
          </div>
  
          <div className="input-box">
            <input type="email" placeholder="Email" required />
          </div>
  
          <div className="input-box">
            <input type="password" placeholder="Password" required />
          </div>
  
          <button type="submit" className="btn">Register</button>
          
          <button type="submit" className="btn">Sign In with Google</button>
        </form>
      </div>
    );
  }