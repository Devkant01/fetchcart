import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PublicRoute({children}) {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    console.log("Public Route - isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PublicRoute