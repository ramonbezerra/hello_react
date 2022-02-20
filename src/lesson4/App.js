import About from "./About";
import Homepage from "./Homepage";
import Search from './Search';
import Navbar from './Navbar';
import NotFound from "./NotFound";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const RouteTo = path => {
    const paths = path.split('/').map(p => p.toLowerCase()).slice(1);

    switch (paths[0]) {
        case 'about':
            return <About />;
        default:
            return <Homepage />
    }
};

const App = () => (
    <div>
        {/* <h1>Example Router</h1>
        <hr/>
        <p>href: {window.location.href}</p>
        <p>path: {window.location.pathname}</p>
        <p>search: {window.location.search}</p>

        <hr/>
    
        {RouteTo(window.location.pathname)} */}

        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />}/>
                
                <Route path="/about" element={<About />}/>  
                
                <Route path="/search" element={<Search />} />  

                <Route path="*" element={<NotFound />}/>
            </Routes>
        </Router>
    </div>
);

export default App;