import {Navigate} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from './recoil/atoms/user';

const ProtectedRoute = ({children}) => {
    const { isAuthenticated } = useRecoilValue(userState);
    console.log("User authenticated:", isAuthenticated);

        if (!isAuthenticated) {
          return <Navigate to="/login" replace />;
        }
        return children;
      };
    
    export default ProtectedRoute;