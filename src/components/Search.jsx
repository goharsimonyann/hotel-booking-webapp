import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { useNavigate } from 'react-router';
import moment from 'moment';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

const Search = ({ locationProps, dateProps, bedProps }) => {
  const arrDate = dateProps ? dateProps.split(',') : '';

  const navigate = useNavigate();

  const [location, setLocation] = useState(locationProps ? locationProps : '');
  const [date, setDate] = useState(arrDate);
  const [bed, setBed] = useState(bedProps ? bedProps : 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="row mb-5 search-bar d-flex gap-3 align-items-center justify-content-center"
      >
        <Form.Group className="mb-2 mt-2 col-md-3 search-bar__location">
          <ReactGoogleAutocomplete
            placeholder="Location"
            className="form-control box-shadow"
            apiKey={import.meta.env.VITE_APP_GOOGLE_AUTOCOMPLETE}
            onPlaceSelected={(place) => {
              setLocation(place.formatted_address);
            }}
          />
        </Form.Group>
        <DatePicker.RangePicker
          className="mb-2 mt-2 col-md-4 search-bar__date--input  box-shadow"
          onChange={(value, dateString) => setDate(dateString)}
          format="YYYY-MM-DD"
          defaultValue={
            date && [
              moment(date[0], 'YYYY-MM-DD'),
              moment(date[1], 'YYYY-MM-DD'),
            ]
          }
        />
        <Form.Group className="mb-2 col-md-3 search-bar__bed">
          <Form.Select
            name="bed"
            className="mb-3 mt-4 d-inline-block search-bar__bed--input box-shadow"
            value={bed}
            onChange={(e) => setBed(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Form.Select>
        </Form.Group>

        <div className="col-md-1">
          <Button
            variant="primary"
            type="submit"
            className="search-bar__button"
          >
            Search
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Search;
