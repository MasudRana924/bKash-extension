import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import AppRoutes from "./route/AppRoutes";
import { useEffect, useState } from "react";
import Preloader from "./components/loader/Preloader";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  return (
    //   <div className="App">
    //   <Router>
    //     <AppRoutes />
    //   </Router>
    // </div>
    <div>
      {loading ? (
        <div>
          <Preloader />
        </div>
      ) : (
        <div className="App">
          <Router>
            <AppRoutes />
          </Router>
        </div>
      )}
    </div>
  );
}
export default App;
