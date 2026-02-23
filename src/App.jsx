import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsArchive from './pages/ProjectsArchive';

function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen bg-background text-dark overflow-x-hidden selection:bg-accent selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsArchive />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
