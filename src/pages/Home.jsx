import React from 'react';
import Session1 from '../components/home/Session1';
import Session2 from '../components/home/Session2';
import Session3 from '../components/home/Session3';
import Session4 from '../components/home/Session4';
import { useInView } from 'react-intersection-observer';

const HomePage = () => {
  const [ref1, inView1] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5 });
  const [ref3, inView3] = useInView({ threshold: 0.5 });
  const [ref4, inView4] = useInView({ threshold: 0.5 });

  return (
    <div className="main-home">
      <div ref={ref1}>
        <Session1 animate={inView1} />
      </div>
      <div ref={ref2}>
        <Session2 animate={inView2} />
      </div>
      <div ref={ref3}>
        <Session3 animate={inView3} />
      </div>
      <div ref={ref4}>
        <Session4 animate={inView4} />
      </div>
    </div>
  );
};

export default HomePage;
