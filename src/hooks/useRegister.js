import { useState } from "react";

export function useRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return {
    handleShowPasswordClick,
    password,
    showPassword,
    handlePassword,
  };
}
