// nova-tourism/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ApiProvider } from './context/ApiContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatbotWidget from './components/ChatbotWidget'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'
import Gallery from './pages/Gallery'
import { Navigate } from 'react-router-dom'
import Services from './pages/Services'
import ServicePage from './pages/ServicePage'
import Testimonials from './pages/Testimonials'
import Blog from './pages/Blog'
import Quote from './pages/Quote.tsx'
import Dashboard from './admin/Dashboard'
import Enquiries from './admin/Enquiries'
import ManageGallery from './admin/ManageGallery'
import ManagePackages from './admin/ManagePackages'
import BlogPost from './pages/BlogPost'


function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
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
          style: { background: '#1A1A2E', color: '#f1f5f9', border: '1px solid #F4A623' }
        }} />
        <Routes>
          {/* Admin */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/enquiries" element={<Enquiries />} />
          <Route path="/admin/gallery" element={<ManageGallery />} />
          <Route path="/admin/packages" element={<ManagePackages />} />
          {/* Public */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/services/:slug" element={<PublicLayout><ServicePage /></PublicLayout>} />
          <Route path="/packages" element={<PublicLayout><Packages /></PublicLayout>} />
          <Route path="/packages/:id" element={<PublicLayout><PackageDetails /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/quote" element={<PublicLayout><Quote /></PublicLayout>} />
          <Route path="/contact" element={<Navigate to="/quote" replace />} />
        </Routes>
      </Router>
    </ApiProvider>
  )
}

export default App