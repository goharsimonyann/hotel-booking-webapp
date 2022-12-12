import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png';
// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container className="header__container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto d-flex justify-content-between align-items-center w-100">
            <>
              <div className="d-flex">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/" className="nav-link">
                  Contact Us
                </Link>
              </div>
              <Link to="/" className="navbar-brand lead fst-italic">
                <img
                  className="header__conatainer--logo"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </>
            {auth && auth.token ? (
              <>
                <div className="d-flex gap-2 align-items-center">
                  <Image
                    width="38px"
                    height="38px"
                    src="https://i.pinimg.com/originals/bb/93/99/bb93993d644835d9aa673c760cad0585.jpg"
                    roundedCircle
                    className="avatar"
                    onClick={() => navigate('/dashboard/seller')}
                  />
                  <NavDropdown align="end" title={auth.user.name}>
                    <NavDropdown.Item
                      as={Link}
                      style={{ color: '#42635c' }}
                      to="/dashboard/seller"
                    >
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      style={{ color: '#42635c' }}
                      onClick={logout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
