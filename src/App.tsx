import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Engineering from './pages/Engineering';
import JobDetails from './pages/JobDetails';
import Layout from './components/Layout';
import CookieConsent from './components/CookieConsent';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
      </Layout>
      <CookieConsent />
    </Router>
  );
}
