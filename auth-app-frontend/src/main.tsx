import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Login from './pages/login.tsx';
import About from './pages/About.tsx';
import Signup from './pages/Signup.tsx';
import Service from './pages/Service.tsx';
import RootLayout from './pages/RootLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<RootLayout/>}>
     <Route index element={<App/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/Signup" element={<Signup/>} />
    <Route path="/Service" element={<Service/>} />
    
    </Route>
  </Routes>
  </BrowserRouter>
)
