import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './lesson5/App';

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,
    document.getElementById('root'));

// import React from "react";
// import ReactDOM from "react-dom";
// import "./theme.css";
// import "./styles.css";
// import App from "./lesson6/App";
// import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "./lesson6/useAuth";

// const rootElement = document.getElementById("root");
// const root = ReactDOM.createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <div className="yellow-border" />
//     <div className="container">
//       <Router>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </Router>
//     </div>
//   </React.StrictMode>
// );
