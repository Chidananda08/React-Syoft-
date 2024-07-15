import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignupSchema = Yup.object().shape({
  user_firstname: Yup.string().required('Required'),
  user_email: Yup.string().email('Invalid email').required('Required'),
  user_password: Yup.string().min(6, 'Too Short!').required('Required'),
  user_phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits').required('Required'),
});

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', {
        ...values,
        user_lastname: '',
        user_city: '',
        user_zipcode: ''
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during sign up. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.signUp}>
      <div className={styles.leftPanel}>
        <h1>Welcome to our community</h1>
        <p>From hobbyist developers to build organized and well coded applications full of beautiful and fun features. Join us and start building your application today.</p>
      </div>
      <div className={styles.rightPanel}>
        <h2>Sign up</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <Formik
          initialValues={{
            user_firstname: '',
            user_email: '',
            user_password: '',
            user_phone: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formField}>
                <Field name="user_firstname" placeholder="Full name" />
                {errors.user_firstname && touched.user_firstname ? <div className={styles.errorMessage}>{errors.user_firstname}</div> : null}
              </div>

              <div className={styles.formField}>
                <Field name="user_email" type="email" placeholder="Email address" />
                {errors.user_email && touched.user_email ? <div className={styles.errorMessage}>{errors.user_email}</div> : null}
              </div>

              <div className={styles.formField}>
                <Field name="user_password" type="password" placeholder="Password" />
                {errors.user_password && touched.user_password ? <div className={styles.errorMessage}>{errors.user_password}</div> : null}
              </div>

              <div className={styles.formField}>
                <Field name="user_phone" placeholder="Phone number" />
                {errors.user_phone && touched.user_phone ? <div className={styles.errorMessage}>{errors.user_phone}</div> : null}
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Signing up...' : 'Create your free account'}
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.loginLink}>Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
}

export default SignUp;