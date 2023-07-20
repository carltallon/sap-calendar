
import './login.css';


function login() {
  return (
          <div id="logindiv">

            <div class = "saplogodivlogin"></div>
            
            <h2>Sync-Calendar</h2>

              <form method="post" action="login">
                  <input placeholder = "Username" class = "logintext" required type = "text"></input>
                  <input placeholder = "Password" class = "logintext" required type = "text"></input>
              </form>

              <button class = "loginbutton" type = "submit">Login</button>

              <h3>Don't have an account? <a href = "/register">Register here</a></h3>
            
          </div>
  );
}

export default login;
