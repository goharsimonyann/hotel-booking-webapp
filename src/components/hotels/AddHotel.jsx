import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { createHotel } from '../../actions/hotels';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import upload from '/upload_icon.jpg';
import { useNavigate } from 'react-router';
import { DatePicker } from 'antd';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

const { RangePicker } = DatePicker;

const initialState = {
  title: '',
  content: '',
  image: '',
  price: '',
  from: '',
  to: '',
  bed: '',
};

const AddHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState(initialState);
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState(upload);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('location', location);
      formData.append('price', values.price);
      formData.append('bed', values.bed);
      formData.append('from', values.from);
      formData.append('to', values.to);
      values.image && formData.append('image', values.image);

      const res = await createHotel(token, formData);
      toast.success('New hotel is posted');
      setValues(initialState);
      setPreview(initialImage);
      setLocation('');
      navigate('/dashboard/seller');
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <Container className="mt-4 mb-4">
        <Row>
          <Col md={{ span: 4, offset: 2 }}>
            <label className="w-100 pointer">
              <img
                src={preview}
                style={{ borderRadius: '10px' }}
                alt="preview_image"
                className="img img-fluid m-2 w-100"
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
            </label>
          </Col>
          <Col md={{ span: 4 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  className="box-shadow"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  name="content"
                  as="textarea"
                  value={values.content}
                  onChange={handleChange}
                  className="box-shadow"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>

                <ReactGoogleAutocomplete
                  placeholder=""
                  className="form-control box-shadow"
                  apiKey={import.meta.env.VITE_APP_GOOGLE_AUTOCOMPLETE}
                  onPlaceSelected={(place) => {
                    setLocation(place.formatted_address);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  className="box-shadow"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Number of beds</Form.Label>
                <Form.Select
                  name="bed"
                  className="mb-3 box-shadow"
                  value={values.bed}
                  onChange={handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>

              <RangePicker
                className="mb-3 w-100 box-shadow"
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    from: dateString[0],
                    to: dateString[1],
                  });
                }}
                format="YYYY-MM-DD"
              />
              <div>
                <Button className="add-hotel__button w-100" type="submit">
                  Add Hotel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddHotel;
