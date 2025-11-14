import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';
import Documentaion from '../pages/Documentaion';
import ApiGenerator from '../pages/ApiGenerator';
import AdminPage from '../pages/AdminPage';
import NotFound from '../pages/NotFound';
import LoginAuth from '../pages/LoginAuth';
import SignupAuth from '../pages/SignupAuth';

function AppRouting() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Documentaion />} />
            <Route path="/login" element={<LoginAuth />} />
            <Route path="/signup" element={<SignupAuth />} />
            {/* <Route path="/logout" element={<Logout />} /> */}

            <Route element={<ProtectedRoute />}>
                <Route path="/api-generator" element={<ApiGenerator />} />
                <Route path="/admin-page" element={<AdminPage />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRouting