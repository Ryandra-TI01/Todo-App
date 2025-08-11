import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/loginSchema";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import CustomInput from "../common/CustomInput";
import FormWrapper from "../common/FormWrapper";
import Button from "../common/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { ROUTES } from "../../routes/Route";
import { useModal } from "../../context/ModalProvider";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login successful!");
      closeModal();
      navigate(ROUTES.TASKS);
    } catch (err) {
      if (err.response?.status === 422 && err.response.data.errors) {
        Object.entries(err.response.data.errors).forEach(
          ([field, messages]) => {
            setError(field, {
              type: "server",
              message: messages[0],
            });
          }
        );
      } else {
        toast.error("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Enter your email"
        icon={<Mail className="w-5 h-5 text-gray-400" />}
        {...register("email")}
        error={errors.email?.message}
      />
      <CustomInput
        label="Password"
        name="password"
        icon={<Lock className="w-5 h-5 text-gray-400" />}
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            // checked={rememberMe}
            // onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            // for="remember-me"
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Lupa password?
        </button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        onClick={handleSubmit}
        loading={loading}
      >
        Login
        <ArrowRight className="w-5 h-5" />
      </Button>
    </FormWrapper>
  );
}
