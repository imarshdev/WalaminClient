import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import "../css/signin.css";
import { TouchableOpacity } from "react-native-web";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Signin() {
  const { userData, setUserData } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [contact, setContact] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [loading, setLoading] = useState(false);
  const contactRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const navigate = useNavigate();
  const handlePhoneChange = () => {
    const phoneNumberInput = contactRef.current.value;
    if (phoneNumberInput.startsWith("+256") && phoneNumberInput.length === 13) {
      setContact(phoneNumberInput);
      setError("");
      setStep(2);
    } else if (
      phoneNumberInput.startsWith("7") &&
      phoneNumberInput.length === 9
    ) {
      setContact("+256" + phoneNumberInput);
      setError("");
      setStep(2);
    } else if (
      phoneNumberInput.startsWith("07") &&
      phoneNumberInput.length === 10
    ) {
      setContact("+256" + phoneNumberInput.slice(1));
    } else {
      setError("Enter valid phone number");
    }
  };
  const handleUsernameChange = () => {
    const FirstName = firstNameRef.current.value;
    const LastName = lastNameRef.current.value;

    if (FirstName && LastName && contact) {
      setUserData({
        firstName: FirstName,
        lastName: LastName,
        contact: contact,
        isLoggedIn: true,
        vehicleBrand: "Bajaj",
        plateNumber: "",
        vehicleColor: "",
        isRider: false,
      });
      setLoading(true);
      setError("");
    } else {
      setError("Enter user details and phone number");
    }
  };

  useEffect(() => {
    console.log("first userdata log", userData);
    if (userData && userData.isLoggedIn === true) {
      navigate("/");
    }
  }, [userData, navigate]);

  return (
    <div className="container" style={{ justifyContent: "space-around" }}>
      {step === 1 && (
        <label className="label">
          <div className="walaminLogo">
            <span>logo</span>
          </div>
          <br />
          <p>Enter Phone Number</p>
          <div className="input-cover">
            <span>+256 </span>
            <input
              ref={contactRef}
              type="number"
              placeholder="000 000 000"
              inputMode="numeric"
              autoFocus={true}
              style={{ backgroundColor: "#eff2fb", width: "100%" }}
            />
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <br />
          <br />
          <TouchableOpacity onPress={handlePhoneChange} id="done_button">
            <p>Next</p>
          </TouchableOpacity>
        </label>
      )}
      {step === 2 && (
        <label className="label">
          <div className="walaminLogo">
            <span>logo</span>
          </div>
          <br />
          <p>First Name :</p>
          <div className="input-cover">
            <input
              ref={firstNameRef}
              type="text"
              required
              autoFocus={true}
              style={{ backgroundColor: "#eff2fb", width: "100%" }}
            />
          </div>
          <br />
          <p>Last Name :</p>
          <div className="input-cover">
            <input
              ref={lastNameRef}
              type="text"
              required
              style={{ backgroundColor: "#eff2fb", width: "100%" }}
            />
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <br />
          <TouchableOpacity onPress={handleUsernameChange} id="done_button">
            {loading ? <p>Loading...</p> : <p>Done</p>}
          </TouchableOpacity>
        </label>
      )}
      <p></p>
    </div>
  );
}

export default Signin;
