import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddCourse from './pages/AddCourse';
import AIGeneration from './pages/AIGeneration';
import UploadMaterial from './pages/UploadMaterial';
import ObjectiveQuestions from './pages/ObjectiveQuestions';
import SubjectiveQuestions from './pages/SubjectiveQuestions';
import GlobalNavBar from './components/GlobalNavBar';
import { getToken, removeToken } from './services/authService';

// Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, logout: () => {} });
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);
  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    window.location.href = '/login';
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Private Route
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const MainRoutes: React.FC = () => {
  const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>
      {!hideNav && <GlobalNavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-course" element={<PrivateRoute><AddCourse /></PrivateRoute>} />
        <Route path="/ai-generation" element={<PrivateRoute><AIGeneration /></PrivateRoute>} />
        <Route path="/upload-material" element={<PrivateRoute><UploadMaterial /></PrivateRoute>} />
        <Route path="/objective-questions" element={<PrivateRoute><ObjectiveQuestions /></PrivateRoute>} />
        <Route path="/subjective-questions" element={<PrivateRoute><SubjectiveQuestions /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <MainRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
