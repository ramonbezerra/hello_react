import React  from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { authContext } from './AuthProvider';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid'),
  password: Yup.string().required('Required').min(4, 'Too short!').max(10, 'Too long!')
});

const LoginPage = () => {
  const { login } = React.useContext(authContext); // that's all!
  let navigate = useNavigate();
  let { state } = useLocation();

  let from = state?.from?.pathname || "/search";

  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    login().then(navigate(from, { replace: true }));      
    setTimeout(() => {
      setSubmitting(false);
      console.info(JSON.stringify(values, null, 2));
      setStatus({ isValidating: false });
    }, 3000);
  };

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ email: '', password: ''}}
      onSubmit={handleSubmitting}
    >
      {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <form onSubmit={handleSubmit}>
          <label>
            E-mail*:
            <Field type="text" name="email"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="email" className="error" component="span"/>
          <br/><br/>
          <label>
            Password*:
            <Field type="password" name="password"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="password" className="error" component="span" />
          <br/><br/>
          <input type="submit" value="Login" disabled={isSubmitting}/>
        </form>
      )}
    </Formik>
  )
};

export default LoginPage;