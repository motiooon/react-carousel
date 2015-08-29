import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      offer: "nop"
    };
  },

  render() {

    let { offer, width } = this.props;

    return (
      <div className="lp-product" style={{width: width + 'px'}}>
        {offer}
      </div>
    );
  }
});
