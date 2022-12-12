import Card from 'react-bootstrap/Card';
import { BiBed } from 'react-icons/bi';
// import { BiCalendarAlt } from 'react-icons/bi';
import { GoCalendar } from 'react-icons/go';
import { GoLocation } from 'react-icons/go';
import { diffDays } from '../../actions/hotels';
import moment from 'moment/moment';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

const HotelCard = ({ hotel, isOwner = false, setSmShow, setId }) => {
  const navigate = useNavigate();
  const navigateToEdit = (e) => {
    e.preventDefault();
    navigate('/hotels/edit', { state: { id: hotel._id } });
  };

  const openDeleteModal = (e) => {
    e.preventDefault();
    setSmShow(true);
    setId(hotel._id);
  };

  return (
    <Card className={`mb-4 hotel-card  ${isOwner && 'seller'}`}>
      <Card.Img
        variant="top"
        className={`w-100 ${isOwner ? 'height-30' : 'height-50'}`}
        src={`${import.meta.env.VITE_APP_API}/hotel/image/${hotel._id}`}
      />
      <Card.Body className="d-flex flex-column justify-content-center">
        <Card.Text className="text-center">
          <span className="text-uppercase lead" style={{ fontSize: '18px' }}>
            <span className="fw-bold">$ {hotel.price}</span> / per night
          </span>
        </Card.Text>
        <Card.Title className="mb-3 text-center hotel-card__title">
          {hotel.title}
        </Card.Title>
        <Card.Text
          className="mb-4 d-flex align-items-center justify-content-center gap-3"
          style={{ fontSize: '15px' }}
        >
          <GoLocation className="icon ms-1" />
          {hotel.location}
        </Card.Text>
        <Card.Text
          className="text-muted d-flex justify-content-around"
          style={{ fontSize: '15px', marginBottom: '4px' }}
        >
          <small>
            Available from {new Date(hotel.from).toLocaleDateString()}
          </small>
          <small>Posted {moment(hotel.createdAt).fromNow()}</small>
        </Card.Text>
        {isOwner && (
          <div className={`d-grid gap-2`}>
            <Button variant="light" onClick={navigateToEdit}>
              Edit
            </Button>
            <Button variant="dark" onClick={openDeleteModal}>
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default HotelCard;
