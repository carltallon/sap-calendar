
import './login.css';

function login() {
  return (

          <div id="logindiv">

            <div class="saplogodivlogin"></div>
            <h2>Sync-Calendar</h2>

              <form method="post" action="login">
                  <input type = "text"></input>
                  <input type = "text"></input>
              </form>

              <button type = "submit">Login</button>
          </div>

  );
}

export default login;
