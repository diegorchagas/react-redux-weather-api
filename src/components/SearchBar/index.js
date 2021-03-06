import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateWeatherRequest } from '../../store/modules/weather/actions';

import { Container } from './styles';

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  function onInputChange(event) {
    setTerm(event.target.value);
  }

  async function handleSearch(event) {
    event.preventDefault();

    if (term) {
      await dispatch(updateWeatherRequest(term));

      setTerm('');

      setErrorMessage('');
    }

    if (term === '') {
      setErrorMessage('Write a New Zealand city name');
    }
  }

  return (
    <Container>
      <form className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Get a five-day forecast in a New Zealand city"
          value={term}
          onChange={onInputChange}
        />

        <span className="input-group-btn">
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleSearch}
          >
            Submit
          </button>
        </span>
      </form>

      {errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : null}
    </Container>
  );
}
