import { useLocation } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

const Auth = () => {
  const location = useLocation();

  const isRegister = location.pathname === "/register";

  return (
    <AuthLayout
      type={isRegister ? "register" : "login"}
    >
      {isRegister ? (
        <RegisterForm />
      ) : (
        <LoginForm />
      )}
    </AuthLayout>
  );
};

export default Auth;