// Import necessary modules
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sellerState } from "./recoil/atoms/seller";
import { loadingState } from "./recoil/atoms/user";
import Loader from "./components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  // Get the authenticated state and loading state from Recoil
  const { isAuthenticated } = useRecoilValue(sellerState);
  const loading = useRecoilValue(loadingState);

  // Render the appropriate content based on authentication and loading states
  if (loading) {
    // Show a loader while the page is still loading
    return <Loader />;
  } else if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/shop-login" replace />;
  } else {
    // Render the children components if the user is authenticated and the page is not loading
    return children;
  }
};

export default SellerProtectedRoute;
