import React  from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

function validateName(value) {
  let error;
  if (!value) {
    error = 'Email is Required';
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (!value) {
    error = 'Password is Required';
  }
  if (value.length < 8) {
    error = 'Min length of Password is 8 chars';
  }
  return error;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid'),
  password: Yup.string().required('Required').min(4, 'Too short!').max(10, 'Too long!')
});

const FormYupValidation = () => {
  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setStatus({ isValidating: false });
    }, 400);
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
                  //  validate={validateName}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="email" className="error" component="span"/>
          <br/><br/>
          <label>
            Password*:
            <Field type="password" name="password"
                   onBlur={handleBlur}
                  //  validate={validatePassword}
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

export default FormYupValidation;