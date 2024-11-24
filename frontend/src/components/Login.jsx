import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { GoogleLogin } from "react-google-login";
import { loadingState, userState } from "../recoil/atoms/user";
import styles from "../styles/styles";
import { server } from "../server";
import { gapi } from 'gapi-script';

const clientId="15702441501-ja73diekukrtqkbr2jeoo70n47n4d8gn.apps.googleusercontent.com"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const navigate = useNavigate();

  useEffect(()=> {
    function start(){
        gapi.client.init({
          clientId:clientId,
          scope: "",
        })
    }
    gapi.load('client:auth2', start)
  })

  const handleGoogleSuccess = async (response) => {
    try {
      console.log('Success', response)
      setLoading(true);
      const res = await axios.post(
        `${server}/user/google-login`,
        {
          token: response.tokenId,
        },
        { withCredentials: true }
      );

      toast.success("Login Success!");

      setUser({
        isAuthenticated: true,
        name: res.data.user.name,
        email: res.data.user.email,
        avatar: res.data.user.avatar,
      });

      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = (response) => {
    console.log("Failure response", response);
    toast.error("Google Sign-In failed. Please try again.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${server}/user/login-user`,
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login Success!");

      setUser({
        isAuthenticated: true,
        name: res.data.user.name,
        email: res.data.user.email,
        avatar: res.data.user.avatar,
      });

      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {" "}
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 font-medium hover:text-blue-500"
                >
                  forgot password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {" "}
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full justify-center`}>
              <h4>Don't have an account?</h4>
              <Link to="/signup" className="text-blue-600 pl-2">
                SignUp
              </Link>
            </div>
            <div className="mt-4">
              <GoogleLogin
                clientId="15702441501-ja73diekukrtqkbr2jeoo70n47n4d8gn.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
                className="w-full flex justify-center"
                isSignedIn={false}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;