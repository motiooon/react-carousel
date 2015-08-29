import React, {PropTypes} from 'react';
import Carousel from './Carousel.jsx';

export default React.createClass({
  render() {

    let offers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    return (
      <div>
        <Carousel offers={offers} height={300} />
      </div>
    );
  }
});
