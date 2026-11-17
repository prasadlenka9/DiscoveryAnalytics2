import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import './index.css'
import './pages/discovery/site.css'
import {
  AboutPage,
  CareersPage,
  ContactPage,
  HomePage,
  ServicesPage,
  SolutionsPage,
} from './pages/discovery/Site'

function RoutedSite() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return <AnimatePresence mode="wait" initial={false}>
    <motion.div
      key={location.pathname}
      className="da-route-transition"
      initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12, filter: 'blur(4px)' }}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </motion.div>
  </AnimatePresence>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutedSite />
    </BrowserRouter>
  </React.StrictMode>,
)
