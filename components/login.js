
import './login.css';


function login() {
  return (
    <div class="wrapper">

      
      <div class="particle elem1 anim-delay1"></div>
      <div class="particle elem2 anim-delay5"></div>
      <div class="particle elem3 anim-delay3"></div>
      <div class="particle elem4 anim-delay8"></div>
      <div class="particle elem5 anim-delay9"></div>
      <div class="particle elem6 anim-delay2"></div>
      <div class="particle elem7 anim-delay4"></div>
      <div class="particle elem8 anim-delay3"></div>
      <div class="particle elem9 anim-delay10"></div>
      <div class="particle elem8 anim-delay11"></div>
      <div class="particle elem1 anim-delay14"></div>
      <div class="particle elem17 anim-delay18"></div>
      <div class="particle elem16 anim-delay9"></div>
      <div class="particle elem9 anim-delay10"></div>
      <div class="particle elem18 anim-delay11"></div>
      <div class="particle elem13 anim-delay16"></div>
      <div class="particle elem18 anim-delay6"></div>


          <div id="logindiv">

            <div class = "saplogodivlogin"></div>
            
            <h2>WhereAmIAt</h2>
            <div>
              <form method="post" action="login">
                  <input placeholder = "Username" class = "logintext" required type = "text"></input>
                  <input placeholder = "Password" class = "logintext" required type = "text"></input>
              </form>

              <button class = "loginbutton" type = "submit">Login</button>

              <h3>Don't have an account? <a href = "/register">Register here</a></h3>
            </div>

            
            </div>
          </div>
  );
}

export default login;
