import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validations/registerSchema";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import CustomInput from "../common/CustomInput";
import FormWrapper from "../common/FormWrapper";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../common/Button";

export default function RegisterForm() {
  const { register: doRegister } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await doRegister(
        data.name,
        data.email,
        data.password,
        data.password_confirmation
      );
      toast.success("Registrasi berhasil!");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 422 && err.response.data.errors) {
        Object.entries(err.response.data.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error("Gagal registrasi. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Register" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput label="Name" {...register("name")} error={errors.name?.message} />
      <CustomInput label="Email" type="email" {...register("email")} error={errors.email?.message} />
      <CustomInput label="Password" type="password" {...register("password")} error={errors.password?.message} />
      <CustomInput label="Confirm Password" type="password" {...register("password_confirmation")} error={errors.password_confirmation?.message} />
      <Button type="submit" loading={loading}>Register</Button>
    </FormWrapper>
  );
}
