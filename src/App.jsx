import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/MenuPage';
import Catering from './pages/Catering';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Layout
import Layout from './components/layout/Layout';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App
