import {Navigate} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { sellerState } from './recoil/atoms/seller';

const SellerProtectedRoute = ({children}) => {
    const { isAuthenticated } = useRecoilValue(sellerState);
    console.log("User authenticated:", isAuthenticated);

        if (!isAuthenticated) {
          return <Navigate to="/" replace />;
        }
        return children;
      };
    
    export default SellerProtectedRoute;