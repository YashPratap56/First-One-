import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Payment } from './pages/Payment.jsx';
import { Result } from './pages/Result.jsx';
import { Navbar } from './components/Navbar.jsx';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();
  const location = useLocation();
  useEffect(() => {
    if (!isSignedIn && location.pathname === '/result') {
      toast.info('Please login to access this page.');
    }
  }, [isSignedIn, location.pathname]);
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export const App = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isSignedIn && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
    if (isSignedIn && location.pathname === '/') {
      navigate('/result', { replace: true });
    }
  }, [isSignedIn, location.pathname, navigate]);

  return (
    <>
      <ToastContainer position='bottom-right'/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
};
