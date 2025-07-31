import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  // You can now use this query to filter data or send API requests
  return <div>Showing results for: <strong>{query}</strong></div>;
};

export default SearchResults;
