import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About";
import AuthProvider from "./AuthProvider";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import PrivateOutlet from "./PrivateOutlet";
import PrivateRoute from "./PrivateRoute";
import Search from "./Search";

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/about" element={<About />}></Route>
                
                <Route element={<PrivateOutlet />}>

                    <Route path="/search" element={<Search />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);

export default App;