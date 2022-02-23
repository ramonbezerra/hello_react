import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import About from './About';
import PrivateOutlet from "./PrivateOutlet";
import Navbar from "./Navbar";
import Search from "./Search";
import AuthProvider from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route element={<PrivateOutlet />}> */}
                    <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
                    {/* <Route path="/search" element={<Search />} /> */}
                    <Route path="/about" element={<About />} />
                {/* </Route> */}
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);

export default App;