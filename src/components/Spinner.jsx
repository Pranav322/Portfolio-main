import WheelComponent from './Spin';
import { useWheel } from '../store/WheelContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useRouteProtection } from '../store/RouteContext'; // Import useRouteProtection
import { useState } from 'react'; // Import useState for managing state

function Wheel() {
  const { setShow } = useWheel(); // Use the global state
  const navigate = useNavigate(); // Initialize navigate function
  const { setAllowedRoute } = useRouteProtection(); // Set the allowed route

  const [winner, setWinner] = useState(""); // Winner state
  const [loading, setLoading] = useState(false); // Loading state to control when to show the wheel and redirection message

  const segments = ["Home", "About", "Projects", "Skills", "Contact"];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#FF9000",
  ];

  const onFinished = (winner) => {
    setWinner(winner); // Set the winner state
    setLoading(true); // Show the redirection message

    // Define the URL based on the winner
    let targetUrl = "";
    switch (winner) {
      case "Home":
        targetUrl = "/";
        break;
      case "About":
        targetUrl = "/about";
        break;
      case "Projects":
        targetUrl = "/projects";
        break;
      case "Skills":
        targetUrl = "/skills";
        break;
      case "Contact":
        targetUrl = "/contact";
        break;
      default:
        return; // Exit if no valid winner
    }

    // Set the allowed route and start loading
    setAllowedRoute(targetUrl);

    // Set a fixed delay before navigation
    setTimeout(() => {
      navigate(targetUrl); // Perform the navigation
      setShow(false); // Hide the wheel after navigation
    }, 2000); // 3000ms = 3 seconds
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Message Above the Wheel */}
      {!loading && (
        <div className="text-center mb-4 text-xl font-semibold text-white">
          Uh Oh! Not so fast! <br /> Spin the wheel first
        </div>
      )}

      {/* Wheel Component */}
      <div id="wheelCircle" className="mb-4">
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment=""
          onFinished={onFinished}
          primaryColor="black"
          primaryColoraround="#ffffffb4"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={190}
          upDuration={50}
          downDuration={2000}
        />
      </div>
      

      {/* Redirection Message Below the Wheel */}
      {loading && (
        <div className="text-center text-white text-lg font-semibold">
          Redirecting to <span className="font-bold">{winner}</span> in 3 seconds...
        </div>
      )}
    </div>
  );
}

export default Wheel;
