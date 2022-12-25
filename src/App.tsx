import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stocks from "./component/Stocks";
import Quotes from "./component/Quotes";
import "./App.css";
const App = () => {
  return (
    <div className="view-ctn">
      <Router>
        <Routes>
          <Route path="/" element={<Stocks />} />
          <Route path="/quotes/:id" element={<Quotes />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
