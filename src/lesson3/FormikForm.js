import { Formik } from 'formik';
import React from 'react';

const FormikForm = () => {
    const handleSubmitting = (values, { setSubmitting }) => {
        setTimeout(() => {
            console.info(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    };

    return (
        <Formik
            initialValues={{ email: 'sfes', password: '' }}
            onSubmit={handleSubmitting}
            >
            {({values, handleChange, handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                            <input type="text" name="email" value={values.email}
                            onChange={handleChange} />
                    </label>
                    <label>
                        Password:
                            <input type="password" name="password" value={values.password}
                            onChange={handleChange} />
                    </label>
                    <input type="submit" value="Login" disabled={isSubmitting} />
                </form>
            )}
        </Formik>
    );
}

export default FormikForm ;