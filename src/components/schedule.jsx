import { useState } from "react";
import "../css/schedule.css";
import { BottomSheet } from "react-spring-bottom-sheet";

export default function ScheduleRide() {
  const [step, setStep] = useState(1);
  const [focused, setFocused] = useState(false);
  return (
    <div className="container">
      {step === 1 && (
        <div className="step-container">
          <BottomSheet
            snapPoints={({ maxHeight, minHeight }) => [
              focused ? maxHeight / 1.05 : minHeight,
            ]}
            header={
              <label style={{ width: "100%", textAlign: "start" }}>
                <span style={{ width: "100%" }}>Where to ?</span>
                <input
                  color="black"
                  type="text"
                  className="location-input"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </label>
            }
            open={true}
            blocking={false}
          >
            <div style={{marginBottom:"10vh"}}>
              <p>Pick-up Location</p>
              <button onClick={() => setStep(2)}>
                <p>next</p>
              </button>
            </div>
          </BottomSheet>
        </div>
      )}
      {step === 2 && (
        <div className="step-container">
          <p>Step 2</p>
          <button onClick={() => setStep(3)}>
            <p>next</p>
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="step-container">
          <p>Step 3</p>
          <button onClick={() => setStep(4)}>
            <p>next</p>
          </button>
        </div>
      )}
    </div>
  );
}
