import './App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import Prices from "./pages/Prices.tsx";


function App() {

  return (
   <BrowserRouter>
       <>
           <nav id="navbar">
               <Link to="/">Home</Link>
               <Link to="/About">O nas</Link>
               <Link to="/Kontakt">Kontakt</Link>
               <Link to="/Prices">Prices</Link>
           </nav>

       </>
       <Routes>
           <Route path="/About" element={<About />} />
           <Route path="/" element={<Home />} />
           <Route path="/Kontakt" element={<Kontakt />}/>
           <Route path="/Prices" element={<Prices />}/>
       </Routes>
   </BrowserRouter>

  )
}

export default App
