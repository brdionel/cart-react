import { FormattedMessage, useIntl } from "react-intl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../hooks/useUser";
import { useLogin } from "../hooks/useLogin";
import { useApp } from "../hooks/useApp";
import { FcGoogle } from "react-icons/fc";
import Button from "./button";
import Register from "./register";
import ShowPasswordContent from "./showPasswordContent";
import "./login.css";
import "./input.css";

export default function Login() {
  const { formatMessage } = useIntl();
  const { 
    handleCloseModal, 
    variantLogin, 
    favAfterLogin,
    handleFavAfterLogin 
  } = useApp();

  const {
    login,
    validateEmail,
    setCurrentUser,
    users,
    setUsers,
    currentUser,
    register,
  } = useUser({
    favAfterLogin,
    handleFavAfterLogin
  });


  const {
    step,
    email,
    showPassword,
    checked,
    setChecked,
    handleEmail,
    handleSubmitEmail,
    handleShowPasswordClick,
    loginGoogle,
    handleSubmit,
    errorLogin
  } = useLogin({
    validateEmail,
    handleCloseModal,
    login,
    setCurrentUser,
    users,
    setUsers,
    currentUser,
    variantLogin,
    favAfterLogin,
    handleFavAfterLogin
  });

  return (
    <div className="login-container">
      {step === 0 && (
        <>
          {variantLogin && (
            <h4 className="login-title">
              {variantLogin === "LOGIN" && (
                <FormattedMessage id={"login_variant_title"} />
              )}
              {variantLogin === "FAV" && (
                <FormattedMessage id={"login_favorite_variant_title"} />
              )}
            </h4>
          )}
          <h5 className="login-subtitle">
            <FormattedMessage id={"login"} />
          </h5>
          <p className="login-email-section-email-label">
            <FormattedMessage id={"login_check_email"} />
          </p>
          <Formik
            initialValues={{
              email: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                errors.email = formatMessage({ id: "validate_email_required" });
              } else if (
                !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                  values.email
                )
              ) {
                errors.email = formatMessage({ id: "validate_email_required" });
              }

              return errors;
            }}
            onSubmit={(values) => {
              handleEmail(values.email)
              return new Promise((resolve) => {
                setTimeout(() => {
                  handleSubmitEmail(values.email);
                  resolve({ message: "Registro exitoso" });
                }, 2000);
              }).then((resp) => {
                console.log({resp});
              });
            }}
          >
            {({ errors, isSubmitting, touched, values }) => (
              <Form className="login-form">
                <div className="input-container">
                  <Field
                    placeholder={formatMessage({ id: "placeholder_email" })}
                    name="email"
                    className={`${
                      touched.email
                        ? errors.email
                          ? "input_error"
                          : "input_valid"
                        : ""
                    }`}
                  />
                  <label htmlFor="email" className="floating-label">
                    {formatMessage({ id: "placeholder_email" })}
                  </label>
                  <ErrorMessage
                    className="form_error_message"
                    name="email"
                    component="small"
                  />
                </div>

                <div className="persistent-login-checkbox-container">
                  <input
                    id="persistent"
                    type="checkbox"
                    value={checked}
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <label htmlFor="persistent" className="persistent-label">
                    <FormattedMessage id={"login_persistent_label"} />
                  </label>
                </div>
                <Button 
                  disabled={isSubmitting}
                  label_translation_id={"carry_on"}
                  type={"submit"}
                />
              </Form>
            )}
          </Formik>
          <div className="social-login-buttons-container">
            <button className="google-button" onClick={() => loginGoogle()}>
              <FcGoogle />
            </button>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <h4 className="login-title">
            <FormattedMessage id={"login"} />
          </h4>
          <p className="login-password-section-label">
            <FormattedMessage id={"login_step2_title"} />
          </p>
          <Formik
            initialValues={{
              email,
              password: ''
            }}
            validate={(values) => {
              const errors = {};

              if(!values.password) {
                errors.password = formatMessage({ id: "validate_password_required" })
              }
              
              return errors;
            }}
            onSubmit={(values) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                    handleSubmit(values.email, values.password)
                    resolve({ message: 'Registro exitoso' });
                  }, 2000);
                })
                .then( (resp) => {
                  console.log({resp})
                })
            }}
            
          >
            {
              ({ errors, isSubmitting, touched, values }) => (<Form className="login-form">
                <div className="show-password-container">
                  <ShowPasswordContent
                    handleShowPasswordClick={handleShowPasswordClick}
                    showPassword={showPassword}
                  />
                </div>

                <div className="input-container">
                  <Field
                    placeholder={formatMessage({ id: "placeholder_password" })}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`${
                      touched.password
                        ? errors.password
                          ? "input_error"
                          : "input_valid"
                        : ""
                    }`}
                  />
                  <label htmlFor="password" className="floating-label">
                    {formatMessage({ id: "placeholder_password" })}
                  </label>
                  <ErrorMessage
                    className="form_error_message"
                    name="password"
                    component="small"
                  />
                </div>
                
                {
                  errorLogin &&
                    <span className="error_login_message">
                      <FormattedMessage id={"validate_login"} />
                    </span>
                }

                <div className="login-form-forgot-password-container">
                  <span
                    className="login-form-forgot-password"
                  >
                    <FormattedMessage id={"login-forgot-password"} />
                  </span>
                </div>
                <Button 
                  label_translation_id={"login"}
                  disabled={isSubmitting}
                  type={"submit"}
                />
                <div className="login-consent-terms">
                  <span>
                    <span>
                      <FormattedMessage id={"login_consent_term_firstMessage"} />{" "}
                    </span>
                    <span>
                      <span className="login-consent-terms-link">
                        <FormattedMessage id={"login_consent_term_link_message"} />
                      </span>
                    </span>
                    <span>
                      {" "}
                      <FormattedMessage
                        id={"login_consent_term_secondMessage"}
                      />{" "}
                    </span>
                    <span>
                      <span className="login-consent-terms-link">
                        <FormattedMessage
                          id={"login_consent_term_secondLink_message"}
                        />
                      </span>
                    </span>
                  </span>
                </div>
              </Form>)
            }

          </Formik>
        </>
      )}
      {step === 2 && <Register register={register} email={email} handleCloseModal={handleCloseModal}/>}
    </div>
  );
}
