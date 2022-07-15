import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import WatchList from './pages/WatchList';
import PortFolio from './pages/PortFolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="details/:ticker" element={<Details />} />
          <Route path="watchlist" element={<WatchList />} />
          <Route path="portfolio" element={<PortFolio />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
