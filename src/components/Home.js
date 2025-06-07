import React from 'react';
import Notes from './Notes';
import Addnote from './Addnote';

export const Home = ({ showAlert }) => {
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;

