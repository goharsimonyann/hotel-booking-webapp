import { login } from '../../actions/auth/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
//  Formik
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../../validations/login';
// import milan from '/milan.jpg';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = { email: '', password: '' };

  const loginHandler = async (values, actions) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      toast.success('successfully logged in');
      setTimeout(() => {
        navigate('/dashboard/seller');
      }, 1000);
      if (response.data) {
        window.localStorage.setItem('auth', JSON.stringify(response.data));
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: response.data,
        });
      }
    } catch (err) {
      toast.error(err.response);
    }
    actions.resetForm();
  };

  return (
    <Container className="login-page">
      <Row>
        <Col md={{ span: 4, offset: 5 }}>
          <div className="h3">Sign in to your account</div>
          <p className="text-muted mb-4">
            Please enter your email and password
          </p>
          <Formik
            initialValues={initialValues}
            validateOnBlur
            onSubmit={loginHandler}
            validationSchema={loginSchema}
          >
            <Form>
              <div className="mb-3">
                <span>Email</span>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
                <ErrorMessage name="email">
                  {(error) => <div className="error-message">{error}</div>}
                </ErrorMessage>
              </div>
              <div className="mb-3">
                <span>Password</span>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage name="password">
                  {(error) => <div className="error-message">{error}</div>}
                </ErrorMessage>
              </div>
              <div>
                <button className="register-page__button p-1" type="submit">
                  Sign in
                </button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
