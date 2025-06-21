import React from 'react';
import Admin from './Admin';
import User from './User'; // You'll create this next


const MyAccount = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <p>Loading or not logged in</p>;
  }

  return user.isAdmin ? <Admin /> : <User />;
};

export default MyAccount;
