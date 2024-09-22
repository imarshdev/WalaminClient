import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import delivery from "../assets/delivery.gif";
import ride from "../assets/ride.png";
import scheduled from "../assets/scheduled.png";
import "../css/signin.css";
import { useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native-web";
function SignUp() {
  return (
    <main class="signup_page-center">
      <article class="sign-up">
        <h2 class="sign-up__title">Get started</h2>
        <p class="sign-up__subtitle">
          Start creating the best possible user experience for you.
        </p>
        <form class="sign-up-form form" action="" method="">
          <label class="form-label-wrapper">
            <p class="form-label">Name</p>
            <input
              class="form-input"
              type="text"
              placeholder="Enter your name"
              required
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">Contact</p>
            <input
              class="form-input"
              type="tel"
              placeholder="Enter your Contact"
              required
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">Email</p>
            <input
              class="form-input"
              type="email"
              placeholder="Enter your email"
              required
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">Password</p>
            <input
              class="form-input"
              type="password"
              placeholder="Enter your password"
              required
            />
          </label>
          <label class="form-checkbox-wrapper">
            <input class="form-checkbox" type="checkbox" required />
            <span class="form-checkbox-label">
              <span>Remember me next time</span>
            </span>
          </label>
          <TouchableOpacity>
            <Link to="/signup2">
              <button class="form-btn primary-default-btn transparent-btn">
                <span>Sign up</span>
              </button>
            </Link>
          </TouchableOpacity>
        </form>
      </article>
    </main>
  );
}

export function SignUp2() {
  const [visible, setVisible] = useState(false);
  return (
    <main class="page-center1">
      <KeyboardAvoidingView>
        <Sidebar
          style={{
            backgroundColor: "#fff",
            width: "100%",
            placeContent: "start",
            height: "70dvh",
            padding: "20px",
            boxSizing: "border-box",
            borderRadius: "20px 20px 0 0",
          }}
          visible={visible}
          onHide={() => setVisible(false)}
          position="bottom"
        >
          <h2>Schedule Ride</h2>
          <br />
          <p class="form-label">Pick-up location</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Destination</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Stops, if any</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Time of pick-up</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Map</p>
        </Sidebar>
      </KeyboardAvoidingView>
      <h3
        class="sign-up__title"
        style={{ textAlign: "start", paddingTop: "50px" }}
      >
        Good Morning Mansur.
      </h3>
      <article class="sign-up">
        <TouchableOpacity>
          <form
            onClick={() => setVisible(true)}
            class="sign-up-form form"
            style={{ marginBottom: "10px", padding: "10px 20px" }}
          >
            <img src={scheduled} style={{ width: "4rem" }} />
            <p style={{ padding: 0 }} class="form-label">
              Plan your daily Commute / Scheduled rides
            </p>
          </form>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link to="/home">
            <form
              class="sign-up-form form"
              style={{ marginBottom: "10px", padding: "10px 20px" }}
            >
              <img src={ride} style={{ width: "4rem" }} />
              <p style={{ padding: 0 }} class="form-label">
                Order single ride
              </p>
            </form>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link to="/home">
            <form
              class="sign-up-form form"
              style={{ marginBottom: "10px", padding: "10px 20px" }}
            >
              <img src={delivery} style={{ width: "4rem" }} />
              <p style={{ padding: 0 }} class="form-label">
                Delivery Services
              </p>
            </form>
          </Link>
        </TouchableOpacity>
      </article>
      <TouchableOpacity>
        <div>
          <Card title="Simple Card">
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
        </div>
      </TouchableOpacity>
    </main>
  );
}
export default SignUp;
