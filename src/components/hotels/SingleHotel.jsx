import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { diffDays, getHotelById, isAlreadyBooked } from '../../actions/hotels';
import { toast } from 'react-toastify';
import { BiBed, BiCalendarAlt } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { getSessionId } from '../../actions/stripe';
import { loadStripe } from '@stripe/stripe-js';

const SingleHotel = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { auth } = useSelector((state) => ({ ...state }));

  const [hotel, setHotel] = useState({});
  const [alreadyBooked, setAlreadyBooked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const getSingleHotel = async () => {
    try {
      const res = await getHotelById(params.id);
      if (res.data) {
        console.log(res.data);
        setHotel(res.data);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      navigate('/login');
      return;
    }

    setLoading(true);

    let res = await getSessionId(auth.token, params.id);

    const stripe = await loadStripe(`${import.meta.env.VITE_APP_STRIPE_KEY}`);

    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log('Shitak e)) ', result));
  };

  useEffect(() => {
    getSingleHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, params.id).then((res) => {
        setAlreadyBooked(false);
      });
    }
  }, []);

  return (
    <>
      {Object.keys(hotel).length && (
        <Container className="mt-4">
          <Row>
            <Col md={6}>
              <Accordion defaultActiveKey={['0']} alwaysOpen className="mb-5">
                <Accordion.Item
                  eventKey="0"
                  onSelect={() => setIsSelected(true)}
                  className={`${isSelected && 'selectedField'}`}
                >
                  <Accordion.Header>
                    <h3 className="mt-1">{hotel.title}</h3>
                  </Accordion.Header>
                  <Accordion.Body>{hotel.content}</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Additional information</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <h4 className="lead fw-bold">Location</h4>
                      <p className="d-flex align-items-center">
                        <GoLocation
                          className="fs-4"
                          style={{ marginRight: '7px' }}
                        />{' '}
                        {hotel.location}
                      </p>
                    </div>
                    <div>
                      <h4 className="lead fw-bold">Available</h4>

                      <p className="d-flex align-items-center">
                        <BiCalendarAlt
                          className="fs-4"
                          style={{ marginRight: '7px' }}
                        />
                        for {diffDays(hotel.from, hotel.to)}{' '}
                        {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
                        , from {new Date(hotel.from).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="lead fw-bold">Beds</h4>

                      <p className="d-flex align-items-center">
                        <BiBed
                          className="fs-4"
                          style={{ marginRight: '7px' }}
                        />
                        {hotel.bed} {hotel.bed <= 1 ? ' bed' : ' beds'}
                      </p>
                    </div>
                    <p>
                      Available from {new Date(hotel.from).toLocaleDateString()}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Button
                disabled={loading || alreadyBooked}
                variant="dark"
                className="mb-5 w-100"
                onClick={handleBooking}
              >
                {loading
                  ? 'Loading...'
                  : alreadyBooked
                  ? 'Already Booked'
                  : auth && auth.token
                  ? 'Book Now'
                  : 'Login to Book'}
              </Button>
            </Col>
            <Col md={6}>
              <img
                src={`${import.meta.env.VITE_APP_API}/hotel/image/${params.id}`}
                alt={hotel.title}
                className="w-100 "
                style={{ borderRadius: '15px' }}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SingleHotel;
