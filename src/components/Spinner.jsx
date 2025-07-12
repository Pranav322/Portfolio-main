import WheelComponent from './Spin';
import { useWheel } from '../store/WheelContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useRouteProtection } from '../store/RouteContext'; // Import useRouteProtection
import { useState } from 'react'; // Import useState for managing state
import PaymentGame from './PaymentGame';

function Wheel() {
  const { setShow } = useWheel(); // Use the global state
  const navigate = useNavigate(); // Initialize navigate function
  const { setAllowedRoute } = useRouteProtection(); // Set the allowed route

  const [winner, setWinner] = useState(""); // Winner state
  const [loading, setLoading] = useState(false); // Loading state to control when to show the wheel and redirection message
  const [showPaymentGame, setShowPaymentGame] = useState(false);

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

  const handlePaymentGameClick = () => {
    setShowPaymentGame(true);
  };

  const handlePaymentSuccess = () => {
    // Mark matrix as escaped
    localStorage.setItem('matrixEscaped', 'true');
    setShowPaymentGame(false);
    setShow(false);
    // Refresh the page to update the navigation state
    window.location.reload();
  };
  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Message Above the Wheel */}
      {!loading && (
        <div className="text-center mb-4 text-xl font-semibold text-white">
          Uh Oh! Not so fast! <br /> Spin the wheel first
          <div className="mt-2 text-sm font-normal text-green-400 cursor-pointer hover:text-green-300 transition-colors duration-300" onClick={handlePaymentGameClick}>
            Or... Want to escape the Matrix? Pay ₹1 and be free forever! 💰
          </div>
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

      {/* Payment Game Modal */}
      {showPaymentGame && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="bg-gray-900 p-8 rounded-lg border border-green-500 max-w-2xl w-full mx-4 relative">
            <PaymentGame onSuccess={handlePaymentSuccess} />
            <button 
              className="absolute top-4 right-4 text-green-400 hover:text-green-300"
              onClick={() => setShowPaymentGame(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wheel;
