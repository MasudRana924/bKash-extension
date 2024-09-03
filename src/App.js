import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import AppRoutes from "./route/AppRoutes";
function App() {
  return (
    <div className="App">
    <Router>
      <AppRoutes />
    </Router>
  </div>
  );
}
export default App;
