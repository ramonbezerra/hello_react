import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import Search from "./Search";

const App = () => (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/search" element={<Search />} /> 
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
);

export default App;