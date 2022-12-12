import { Container, Row, Col } from 'react-bootstrap';
import { register } from '../../actions/auth/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
//  Formik
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../../validations/register';

const Register = () => {
  const navigate = useNavigate();
  const initialValues = { name: '', email: '', password: '' };

  const registerHandler = async (values, actions) => {
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success('You have successfully registered');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      toast.error('Something went wrong. Please, try again');
    }
    actions.resetForm();
  };

  return (
    <Container className="register-page" fluid>
      <Row>
        <Col className="register-banner" md={6}></Col>
        <Col md={{ span: 4, offset: 1 }}>
          <div className="h3">Sign up</div>
          <p className="text-muted">
            Create account below to start using Hotel Touristic.
          </p>
          <Formik
            validateOnBlur
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={registerHandler}
          >
            <Form>
              <div className="mb-3">
                <span>Name</span>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                />
                <ErrorMessage name="name">
                  {(error) => <div className="error-message">{error}</div>}
                </ErrorMessage>
              </div>
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
                </ErrorMessage>{' '}
              </div>
              <div>
                <button className="register-page__button p-1" type="submit">
                  Sign up
                </button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
