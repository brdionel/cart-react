import { FormattedMessage, useIntl } from "react-intl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ShowPasswordContent from "./showPasswordContent";
import { useRegister } from "../hooks/useRegister";
import Button from "./button";
import "./register.css";
import "./input.css";

const Register = ({register, email, handleCloseModal}) => {
  const {formatMessage} = useIntl()
  const {handleShowPasswordClick, showPassword} = useRegister()


  return (
    <>
      <h4 className="login-title">
        <FormattedMessage id={"register"} />
      </h4>
      <p className="login-email-section-email-label">
        <FormattedMessage id={"register_message"} />
      </p>
      <Formik 
        initialValues={{
            email,
            password: '',
            birthdate_day: '',
            birthdate_month: '',
            birthdate_year: '',
            name: '',
            last_name: ''
        }}
        validate={(values) => {
          const errors = {};
          
          if(!values.name) {
            errors.name = formatMessage({ id: "validate_name_required" })
          }
          if(!values.last_name) {
            errors.last_name = formatMessage({ id: "validate_last_name_required" })
          }
          if (!values.birthdate_day || !/^\d+$/.test(values.birthdate_day) || values.birthdate_day < 1 || values.birthdate_day > 31) {
            errors.birthdate_day = true;
            errors.birthdate = formatMessage({ id: "validate_birthdate_required" });
          }
          
          if(!values.birthdate_month || !/^\d+$/.test(values.birthdate_month) || values.birthdate_month < 1 || values.birthdate_month > 12) {
            errors.birthdate_month = true;
            errors.birthdate = formatMessage({ id: "validate_birthdate_required" })
          } 
          if(!values.birthdate_year || !/^\d+$/.test(values.birthdate_year) || values.birthdate_year < 1900) {
            errors.birthdate_year = true;
            errors.birthdate = formatMessage({ id: "validate_birthdate_required" })
          } else if (values.birthdate_year > 2004){
            errors.birthdate_year = true;
            errors.birthdate = formatMessage({ id: "validate_birthdate_max" })
          }
          if(!values.password) {
            errors.password = formatMessage({ id: "validate_password_required" })
          }
          
          return errors;
        }}
        onSubmit={(values) => {
          return new Promise((resolve) => {
            setTimeout(() => {
                const rta = register(values);
                if (!rta) {
                  alert("Hubo Un error");
                } else {
                  handleCloseModal();
                }
                resolve({ message: 'Registro exitoso' });
              }, 2000);
            })
            .then( (resp) => {
              console.log({resp})
            })
        }}
        
      >
        {
            ({errors, isSubmitting, touched, values}) => <Form className="register_form">
                <div>
                  <h3>
                    <FormattedMessage id={"name"} />
                  </h3>
                  <div className="register_form_input_container">
                    <Field 
                      placeholder={formatMessage({ id: "placeholder_name" })}
                      name="name"
                      className={`${
                        touched.name
                          ? errors.name
                            ? "input_error"
                            : "input_valid"
                          : ""
                      }`}
                    />
                    <label htmlFor="name" className="floating-label">
                      {formatMessage({ id: "placeholder_name" })}
                    </label>
                    <ErrorMessage className="form_error_message" name="name" component="small" />
                  </div>
                  <div className="register_form_input_container">
                    <Field 
                      placeholder={formatMessage({ id: "placeholder_last_name" })}
                      name="last_name"
                      className={`${
                        touched.last_name
                          ? errors.last_name
                            ? "input_error"
                            : "input_valid"
                          : ""
                      }`}
                    />
                    <label htmlFor="last_name" className="floating-label">
                      {formatMessage({ id: "placeholder_last_name" })}
                    </label>
                    <ErrorMessage className="form_error_message" name="last_name" component="small" />
                  </div>
                </div>
                <div className="register_form_birthdate">
                  <h3>
                    <FormattedMessage id={"birthday"} />
                  </h3>
                  <div className="register_form_birthdate_container">
                    <div className="register_form_input_container">
                      <Field 
                        placeholder={formatMessage({ id: "placeholder_birthdate_day" })} 
                        name="birthdate_day"
                        maxLength="2"
                        className={`${
                        touched.birthdate_day
                          ? errors.birthdate_day
                            ? "input_error"
                            : "input_valid"
                          : ""
                      }`}
                      />
                      <label htmlFor="birthdate_day" className="floating-label">
                        {formatMessage({ id: "placeholder_birthdate_day" })}
                      </label>
                    </div>
                    <div className="register_form_input_container">
                      <Field 
                        placeholder={formatMessage({ id: "placeholder_birthdate_month" })} 
                        name="birthdate_month"
                        maxLength="2"
                        className={`${
                          touched.birthdate_month
                            ? errors.birthdate_month
                              ? "input_error"
                              : "input_valid"
                            : ""
                        }`}
                      />
                      <label htmlFor="birthdate_month" className="floating-label">
                        {formatMessage({ id: "placeholder_birthdate_month" })}
                      </label>
                    </div>
                    <div className="register_form_input_container">
                      <Field 
                        placeholder={formatMessage({ id: "placeholder_birthdate_year" })} 
                        name="birthdate_year"
                        maxLength="4"
                        className={`${
                          touched.birthdate_year
                            ? errors.birthdate_year
                              ? "input_error"
                              : "input_valid"
                            : ""
                        }`}
                      />
                      <label htmlFor="birthdate_year" className="floating-label">
                        {formatMessage({ id: "placeholder_birthdate_year" })}
                      </label>
                    </div>
                    {
                      ((touched.birthdate_day || touched.birthdate_month || touched.birthdate_year) && errors.birthdate) &&
                      <small className="form_error_message register_form_error_birthdate">
                        {errors.birthdate}
                      </small>
                    }
                  </div>
                  <p>
                    <FormattedMessage id={"register_birthday_message"} />
                  </p>
                </div>
                <div className="register_form_input_container">
                  <h3>
                    <FormattedMessage id={"create_password"} />
                  </h3>
                  <div className="show-password-container">
                    <ShowPasswordContent 
                      handleShowPasswordClick={handleShowPasswordClick}
                      showPassword={showPassword}
                    />
                  </div>
                  <div className="register_form_input_container">
                    <Field
                      type={showPassword ? "text" : "password"}
                      placeholder={formatMessage({
                        id: "password",
                      })}
                      name="password"
                      className={`${
                        touched.password
                          ? errors.password
                            ? "input_error"
                            : "input_valid"
                          : ""
                      }`}
                    />
                    <label htmlFor="password" className="floating-label">
                        {formatMessage({ id: "password" })}
                    </label>
                    <ErrorMessage className="form_error_message" name="password" component="small" />
                  </div>
                  </div>
                <div>
                  <Button 
                    label_translation_id={"register_action"}
                    disabled={isSubmitting}
                    type={"submit"}
                  />
                </div>
            </Form>
        }
      </Formik>
    </>
  );
};

export default Register;
