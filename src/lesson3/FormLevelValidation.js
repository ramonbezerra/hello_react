import { Formik, Field, ErrorMessage } from 'formik';

const FormLevelValidation = () => {
    const validateEmail = (value) => {
        let error;
        if (!value) {
            error = 'Email is Required';
        }
        return error;
    }

    const validatePassword = (value) => {
        let error;
        if (!value) {
            error = 'Password is Required';
        }
        return error;
    }

    const handleSubmitting = (values, { setSubmitting }) => {
        setTimeout(() => {
            console.info(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmitting}
            >
            {({handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <Field type="text" name="email"
                                validate={validateEmail}
                                onBlur={handleBlur}
                                onChange={handleChange}
                        />
                        <ErrorMessage name="email"/>
                    </label>
                    <br />
                    <br />
                    <label>
                        Password:
                        <Field type="password" name="password"
                                validate={validatePassword}
                                onBlur={handleBlur}
                                onChange={handleChange}
                        />
                        <ErrorMessage name="password"/>
                    </label>
                    <br />
                    <br />
                    <input type="submit" value="Login" disabled={isSubmitting} />
                </form>
            )}
        </Formik>
    );
}

export default FormLevelValidation;