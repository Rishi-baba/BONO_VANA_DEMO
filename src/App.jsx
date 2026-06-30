import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { HelmetProvider } from 'react-helmet-async';
import 'lenis/dist/lenis.css';

import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CustomerProvider } from './context/CustomerContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Manifesto } from './pages/Manifesto';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { Preloader } from './components/ui/Preloader';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <ReactLenis root options={{ lerp: 0.04, duration: 1.5, smoothWheel: true }}>
        <CustomerProvider>
          <CartProvider>
            <FavoritesProvider>
              <Router>
                <Preloader />
                <div className="flex flex-col min-h-screen bg-warm-ivory text-charcoal selection:bg-forest-green selection:text-warm-ivory">
                  {/* Navigation Header */}
                  <Navbar />

                  {/* Main Contents */}
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/shop/:handle" element={<ProductDetail />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:handle" element={<BlogPost />} />
                      <Route path="/manifesto" element={<Manifesto />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>

                  {/* Footer */}
                  <Footer />
                </div>
                {/* Slide Cart Drawer */}
                <CartDrawer />
              </Router>
            </FavoritesProvider>
          </CartProvider>
        </CustomerProvider>
      </ReactLenis>
    </HelmetProvider>
  );
}

export default App;
