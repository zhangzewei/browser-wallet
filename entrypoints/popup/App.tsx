import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import ImportAccount from './containers/Import';
import Home from './containers/Home';
import Networks from './containers/Networks';
import Tokens from './containers/Tokens';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <div className="w-[400px] h-[600px]">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/import" element={<ImportAccount />} />
          <Route path="/home" element={<Home />} />
          <Route path="/networks" element={<Networks />} />
          <Route path="/tokens" element={<Tokens />} />
          {/* Add more routes here as needed */}
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;