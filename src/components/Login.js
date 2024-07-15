import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const LoginSchema = Yup.object().shape({
  user_email: Yup.string().email('Invalid email').required('Required'),
  user_password: Yup.string().required('Required'),
});

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', values);
      console.log(response.data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid email or password. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.logIn}>
      <div className={styles.leftPanel}>
        <h1>Welcome back</h1>
        <p>Log in to access your account and continue building amazing applications.</p>
      </div>
      <div className={styles.rightPanel}>
        <h2>Log In</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <Formik
          initialValues={{
            user_email: '',
            user_password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formField}>
                <Field name="user_email" type="email" placeholder="Email address" />
                {errors.user_email && touched.user_email ? <div className={styles.errorMessage}>{errors.user_email}</div> : null}
              </div>

              <div className={styles.formField}>
                <Field name="user_password" type="password" placeholder="Password" />
                {errors.user_password && touched.user_password ? <div className={styles.errorMessage}>{errors.user_password}</div> : null}
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.signUpLink}>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;