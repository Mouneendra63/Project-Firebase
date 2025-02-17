import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { FirebaseProvider } from './context/firebase'
import {BrowserRouter} from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FirebaseProvider>
    <App/>
    </FirebaseProvider>
  </BrowserRouter>
)
