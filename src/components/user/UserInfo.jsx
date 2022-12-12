import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { useState, useEffect } from 'react';

// Bootstrap
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import { FiSettings } from 'react-icons/fi';

import {
  currencyFormatter,
  getAccountBalance,
  payoutSetting,
} from '../../actions/stripe';

const UserInfo = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;
  const [balance, setBalance] = useState(0);

  const handlePayoutSettings = async () => {
    try {
      const res = await payoutSetting(token);
      window.location.href = res.data.url;
    } catch (err) {
      console.log('Unable to access settings. Try again');
    }
  };

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  return (
    <Container className="mt-4 mb-4 ">
      <Row className="d-flex align-items-center justify-content-between">
        <Col ms={4} className="mb-2">
          <Card body>
            <div className="d-flex align-items-center gap-3">
              <div className="">
                <Image
                  src="https://i.pinimg.com/originals/bb/93/99/bb93993d644835d9aa673c760cad0585.jpg"
                  roundedCircle
                  width="70px"
                  height="70px"
                />
              </div>
              <div>
                <h4>{user.name}</h4>
                <small>{user.email}</small> <br />
                <small>{`Joined ${moment(user.createdAt).fromNow()}`}</small>
              </div>
            </div>
          </Card>
        </Col>
        {auth?.user?.stripe_seller?.charges_enabled && (
          <>
            <Col md={4} className="mb-2">
              <Card body>
                Avaliable:{' '}
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}
              </Card>
            </Col>
            <Col md={4} className="mb-2">
              <Card body>
                Payouts
                <span
                  onClick={handlePayoutSettings}
                  className="bg-light pointer"
                >
                  <FiSettings className="h5 pt-2" />
                </span>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default UserInfo;
