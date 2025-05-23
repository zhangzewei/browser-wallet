import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "./components/ui/toaster";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ImportAccount from "./containers/Import";
import Home from "./containers/Home";
import Networks from "./containers/Networks";
import Tokens from "./containers/Tokens";
import SendTransaction from "./containers/SendTransaction";
import { WalletProvider } from './contexts/wallet';

function App() {
  return (
    <WalletProvider>
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
            <Route path="/send" element={<SendTransaction />} />
            {/* Add more routes here as needed */}
          </Routes>
          <Toaster />
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;