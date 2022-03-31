import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { authContext } from './AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'), //.email('Invalid'),
  password: Yup.string().required('Required').min(4, 'Too short!').max(10, 'Too long!')
});

const LoginPage = () => {
  const { login } = React.useContext(authContext);
  let navigate = useNavigate();
  let location = useLocation();
  const url = `https://immense-sands-97611.herokuapp.com/api/v1/login`;

  let from = location.state?.from || "/";

  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false); // iremos fazer modificações aqui
      axios.post(url, values)
      .then(data => {
          login(data.data.token).then(navigate(from, { replace: true }))
          console.log(data.data.token);
        })
      .catch(error => {
        console.log(error);
      });
      setStatus({ isValidating: false });
    }, 2000);
  };

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ username: '', password: ''}}
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
            Username*:
            <Field type="text" name="username"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="username" className="error" component="span"/>
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