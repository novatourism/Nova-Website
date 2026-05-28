// nova-tourism/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ApiProvider } from './context/ApiContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatbotWidget from './components/ChatbotWidget'
import Home from './pages/Home'
import About from './pages/About'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Dashboard from './admin/Dashboard'
import Enquiries from './admin/Enquiries'
import ManageGallery from './admin/ManageGallery'
import ManagePackages from './admin/ManagePackages'
import ScrollToTop from './components/ScrollToTop'


function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      {children}
      <Footer />
      <ChatbotWidget />
    </>
  )
}

function App() {
  return (
    <ApiProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-right" toastOptions={{
          style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #f59e0b' }
        }} />
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/enquiries" element={<Enquiries />} />
          <Route path="/admin/gallery" element={<ManageGallery />} />
          <Route path="/admin/packages" element={<ManagePackages />} />
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/packages" element={<PublicLayout><Packages /></PublicLayout>} />
          <Route path="/packages/:id" element={<PublicLayout><PackageDetails /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        </Routes>
      </Router>
    </ApiProvider>
  )
}

export default App