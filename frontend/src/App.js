import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'animate.css';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import INotebook from './components/iNotebook';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import PageWrapper from './components/pageWrapper';
import PrivateRoute from './components/PrivateRoute'; // ✅ Correct path here

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2500);
  };

  return (
    <NoteState>
        <Router>
    <Navbar showAlert={showAlert} /> {/* Pass showAlert here */}
    <Alert alert={alert} />

        <Routes>
          {/* ✅ Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <INotebook showAlert={showAlert} />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home showAlert={showAlert} />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />

          {/* ✅ Public Routes */}
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login showAlert={showAlert} />
              </PageWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <PageWrapper>
                <Signup showAlert={showAlert} />
              </PageWrapper>
            }
          />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
