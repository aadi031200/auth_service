import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Calendar } from './components/ui/calendar'
import FuturisticAuthHome from "./components/home/FuturisticAuthHome";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <div className="p-10 flex flex-col gap-2 justify-center items-center">
    //   <h1 className="text-3xl font-bold">Welcome to Auth App</h1>
    // </div>
    <div>
      <FuturisticAuthHome/>
    </div>
  );
}

export default App
