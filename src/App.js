import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { NotesProvider } from "./contexts/NotesContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NotesProvider>
            <div className="container">
              <Header />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </NotesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
