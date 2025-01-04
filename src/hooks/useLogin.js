import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useCart } from "./useCart";
import { STORAGE_PREFIX } from "../constants";

export function useLogin({
  validateEmail,
  handleCloseModal,
  login,
  setCurrentUser,
  users,
  setUsers,
  favAfterLogin,
  handleFavAfterLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [errorLogin, setErrorLogin] = useState(false);

  const [step, setStep] = useState(0);

  const { mergeCart } = useCart();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handleSubmitEmail = (emailLogin) => {
    const rta = validateEmail({ email: emailLogin });

    if (rta) {
      setStep(1);
    } else {
      setStep(2);
    }
  };

  const handleSubmit = (emailLogin, passwordLogin) => {
    const rta = login({ email: emailLogin, password: passwordLogin });

    if (!rta) {
      setErrorLogin(true);
    } else {
      if (errorLogin) setErrorLogin(false);
      handleCloseModal();
    }
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      try {
        // Make a request to the Google API to get the user's data
        const googleUserInfoUrl =
          "https://www.googleapis.com/oauth2/v1/userinfo";
        const response = await fetch(
          `${googleUserInfoUrl}?access_token=${access_token}`
        );
        const data = await response.json();
        const existUser = users.find((user) => user.email === data.email);

        const userLogged = {
          email: data.email,
          name: data.given_name,
        };

        if (!existUser) {
          userLogged.cart = [];
          userLogged.favs = [];
          if (favAfterLogin) {
            userLogged.favs.push(favAfterLogin);
            handleFavAfterLogin(null);
          }
          setCurrentUser(userLogged);
          const usersPartial = users;
          setUsers(usersPartial.concat(userLogged));
          localStorage.setItem(
            `${STORAGE_PREFIX}users`,
            JSON.stringify(usersPartial.concat(userLogged))
          );
          localStorage.setItem(`${STORAGE_PREFIX}currentUser`, JSON.stringify(userLogged));
        } else {
          if (favAfterLogin) {
            if (!existUser.favs.find((item) => item === favAfterLogin)) {
              existUser.favs.push(favAfterLogin);
              handleFavAfterLogin(null);
            }
          }
          if (Array.isArray(existUser.cart) && existUser.cart.length > 0) {
            mergeCart(existUser.cart);
            
            localStorage.setItem(`${STORAGE_PREFIX}cart`, JSON.stringify(existUser.cart));
          }
          setCurrentUser(existUser);
          localStorage.setItem(`${STORAGE_PREFIX}currentUser`, JSON.stringify(existUser));
        }
        handleCloseModal();
      } catch (error) {
        console.log("Error al obtener los datos del usuario:", error);
      }
    },
  });

  return {
    step,
    setStep,
    email,
    password,
    showPassword,
    checked,
    setChecked,
    handlePassword,
    handleEmail,
    handleSubmitEmail,
    handleSubmit,
    handleShowPasswordClick,
    loginGoogle,
    errorLogin,
  };
}
