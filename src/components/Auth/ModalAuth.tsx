import { ReactElement, useState } from "react";
import FooterForm from "./FooterForm";
import HeaderForm from "./HeaderForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function ModalAuth(): ReactElement {
    const [isLogin, setIsLogin] = useState(true); //true = login, false = register
    const toggleForm = () => setIsLogin((prev) => !prev); // Toggle between login and register forms

    return (
        <>
            <HeaderForm
                title={`${isLogin ? "Welcome Back" : "Join TaskFlow"}`}
                subtitle={`${isLogin
                    ? "Sign in to your account"
                    : "Create your account to get started"
                    }`}
            />

            {isLogin ? <LoginForm /> : <RegisterForm />}

            <FooterForm
                title={`${isLogin ? "Don't have an account?" : "Already have an account?"
                    }`}
                subtitle={isLogin ? "Sign up" : "Sign in"}
                onClick={toggleForm}
            />
        </>
    )
}