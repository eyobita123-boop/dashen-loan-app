                                                                                                                                                                            <Route path="risk-rating" element={<RiskRating />} />
  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StaffMortgage from './pages/StaffMortgage';
import StaffAuto from './pages/StaffAuto';
import RESA from './pages/RESA';
import ConsumerLoan from './pages/ConsumerLoan';
import TermLoan from './pages/TermLoan';
import Overdraft from './pages/Overdraft';
import PreShipment from './pages/PreShipment';
import CollateralValuation from './pages/CollateralValuation';
import RiskRating from './pages/RiskRating';
import Classification from './pages/Classification';
import CustomerList from './pages/CustomerList';
import Reports from './pages/Reports';
import { AuthProvider, useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useEffect } from 'react';

// Auto-login wrapper
function AutoLoginWrapper({ children }: { children: React.ReactNode }) {
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // Auto-login with default credentials
      login('admin@dashen.com', 'password123').catch(() => {
        // If fails, just set a fake user in localStorage
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          email: 'admin@dashen.com',
          fullName: 'Admin User',
          role: 'ADMIN'
        }));
        window.location.reload();
      });
    }
  }, [isAuthenticated, login]);

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <AutoLoginWrapper>
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            </AutoLoginWrapper>
          }>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="staff-mortgage" element={<StaffMortgage />} />
            <Route path="staff-auto" element={<StaffAuto />} />
            <Route path="resa" element={<RESA />} />
            <Route path="consumer" element={<ConsumerLoan />} />
            <Route path="term" element={<TermLoan />} />
            <Route path="overdraft" element={<Overdraft />} />
            <Route path="pre-shipment" element={<PreShipment />} />
            <Route path="collateral" element={<CollateralValuation />} />
            <Route path="risk-rating" element={<RiskRating />} />
            <Route path="classification" element={<Classification />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;                                                                                                                                                                                      <Route path="classification" element={<Classification />} />
                                                                                                                                                                                                    <Route path="customers" element={<CustomerList />} />
                                                                                                                                                                                                                <Route path="reports" element={<Reports />} />
                                                                                                                                                                                                                          </Route>
                                                                                                                                                                                                                                  </Routes>
                                                                                                                                                                                                                                        </BrowserRouter>
                                                                                                                                                                                                                                            </AuthProvider>
                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                              export default App;
