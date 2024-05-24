import React from 'react';
import Session1 from '../components/home/Session1';
import Session2 from '../components/home/Session2';
import Session3 from '../components/home/Session3';
import Session4 from '../components/home/Session4';

const HomePage = () => {
  return (
    <div className="main-home">
      <Session1 />
      <Session2 />
      <Session3 />
      <Session4 />

    </div>
  );
};

export default HomePage;
