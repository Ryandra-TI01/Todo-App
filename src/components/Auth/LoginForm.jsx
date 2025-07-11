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

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      toast.success("Login berhasil!");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 422 && err.response.data.errors) {
        Object.entries(err.response.data.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error("Gagal login. Periksa kembali email atau password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Login" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <CustomInput
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      <Button type="submit" loading={loading}>
        Login
      </Button>
    </FormWrapper>
  );
}
