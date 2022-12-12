import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteHotel, sellerHotels } from '../../actions/hotels';
import HotelCard from '../cards/HotelCard';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Connected = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [hotels, setHotels] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [id, setId] = useState(null);

  const getSellerHotels = async () => {
    try {
      const res = await sellerHotels(token);
      if (res.data) {
        setHotels(res.data);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteHotel(token, id);
      toast.success('Hotel deleted successfully! 🔥');
      setSmShow(false);
      getSellerHotels();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSellerHotels();
  }, []);
  console.log('hotel', hotels);
  return (
    <>
      <Row className="mt-4">
        <Col
          md={12}
          className="mb-4 d-flex justify-content-between align-items-center"
        >
          <h3 className="mb-0">Your hotels</h3>
          <Link to="/hotels/new" className="btn btn-secondary">
            + Add Hotel
          </Link>
        </Col>
      </Row>
      <Container className="w-100 h-100">
        <Row className="w-100 h-100 mb-3">
          {hotels && hotels.length ? (
            hotels.map((hotel) => {
              return (
                <Col key={hotel._id} md={3}>
                  <Link
                    to={`/hotels/${hotel._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <HotelCard
                      hotel={hotel}
                      isOwner={true}
                      setSmShow={setSmShow}
                      setId={setId}
                    />
                  </Link>
                </Col>
              );
            })
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="text-muted"> No Hotels Found</h4>
            </div>
          )}
        </Row>
      </Container>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            Are you sure?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSmShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Connected;
