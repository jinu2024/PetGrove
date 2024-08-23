import {Navigate} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loadingState, userState } from './recoil/atoms/user';

const ProtectedRoute = ({children}) => {
    const { isAuthenticated } = useRecoilValue(userState);
    const loading = useRecoilValue(loadingState);
    console.log("User authenticated:", isAuthenticated);
      if(loading === false){
        if (!isAuthenticated) {
          return <Navigate to="/login" replace />;
        }
        return children;
      };
    };
    
    export default ProtectedRoute;