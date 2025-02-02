import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SavedSchools from "./pages/SavedSchools";
import SchoolDetails from "./pages/SchoolDetails";
import SchoolAdmin from "./pages/SchoolAdmin";
import Admin from "./pages/Admin";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/saved" element={<SavedSchools />} />
          <Route path="/school/:id" element={<SchoolDetails />} />
          <Route path="/school-admin" element={<SchoolAdmin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;