import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { motionConfig } from './motion/motionConfig.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: motionConfig.duration.reveal, ease: motionConfig.ease.enter }}
    >
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  </StrictMode>,
)
