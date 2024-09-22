import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import "../css/home.css"
import { KeyboardAvoidingView } from "react-native-web";

function Home() {
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [visibleBottom2, setVisibleBottom2] = useState(false);
  return (
    <div className="home">
      <KeyboardAvoidingView>
        <Sidebar
          className="details"
          visible={visibleBottom}
          position="bottom"
          onHide={() => setVisibleBottom(false)}
        >
          <h2>Order Ride</h2>
          <p class="form-label">Destination</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Pickup Location</p>
          <InputText style={{ width: "100%" }} />
          <br />
          <br />
          <button>Order</button>
        </Sidebar>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView>
        <Sidebar
          className="details"
          visible={visibleBottom2}
          position="bottom"
          onHide={() => setVisibleBottom2(false)}
        >
          <h2>Deliver Item(s)</h2>
          <p class="form-label">Destination</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Pickup Location</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Item to deliver bulk</p>
          <InputText style={{ width: "100%" }} />
          <br />
          <br />
          <button>Order</button>
        </Sidebar>
      </KeyboardAvoidingView>
      <div className="map">
        <p>Good Morning Mansur</p>
      </div>
      <div className="details">
        <button onClick={() => setVisibleBottom(true)}>
          <p>Order Ride</p>
        </button>
        <br /><br />
        <button onClick={() => setVisibleBottom2(true)}>
          <p>Delivery Service</p>
        </button>
      </div>
    </div>
  );
}

export default Home;
