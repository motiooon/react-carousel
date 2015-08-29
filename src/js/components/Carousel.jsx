import React from 'react';
import Product from './Product.jsx';

export default React.createClass({
  getDefaultProps() {
    return {
      offers: []
    };
  },

  getInitialState(){
    return {
      width: false
    }
  },

  navigate(e, direction){
    e.preventDefault();
    // To do extra logic on bounds

    if(direction === 'next' && this.state.currentPage + 1 === this.state.pages){
      return;
    }

    if(direction === 'previous' && this.state.currentPage -1 === -1){
      return;
    }   

    let self = this; 

    this.setState({
      currentPage: direction === 'next' ? this.state.currentPage + 1 :this.state.currentPage - 1,
      nextItemIntoView: direction === 'next' ? self.state.nextItemIntoView + this.state.itemsPerPage : self.state.nextItemIntoView - this.state.itemsPerPage
    });   
  },

  goPrev(e){
    return this.navigate(e, 'previous');
  },

  goNext(e){
    return this.navigate(e, 'next');
  }, 

  isLastProductFullyVisible(){
    // this is helpful to see which item is next
  },

  computeState(width){
    // control height is 40 px
    const CONTROL_HEIGHT = 40;
    const CONTROL_WIDTH = 40;
    const CONTROL_GUTTER = 20;

    const DISTANCE_BETWEEN_ITEMS = 20;
    // candidate for prop
    const PRODUCT_WIDTH = 250;  
 
    let {offers, height} = this.props;

    let bodyWidth = (width - (2 * CONTROL_WIDTH) - (2 * CONTROL_GUTTER));
    let listWidth = offers.length * (PRODUCT_WIDTH + DISTANCE_BETWEEN_ITEMS);
    let pages = Math.ceil(listWidth/bodyWidth);
    let itemsPerPage = Math.floor(bodyWidth/(PRODUCT_WIDTH + DISTANCE_BETWEEN_ITEMS));

    let self = this;

    return {
      width: width,
      productWidth: PRODUCT_WIDTH,
      distanceBetweenItems: DISTANCE_BETWEEN_ITEMS,
      currentFirstItemIndex: 0, // index starts from 1
      bodyWidth : bodyWidth,
      listWidth : listWidth,
      controlsTopPosition: (height/2) - CONTROL_HEIGHT + (CONTROL_HEIGHT/2),
      pages: pages,
      currentPage: 0,
      itemsPerPage: itemsPerPage,
      nextItemIntoView: itemsPerPage + 1
    }
  },

  componentDidMount(){
    // we need to do this because we dont have width available untila after initial render
    let width = this.refs.carouselNode.getDOMNode().offsetWidth;
    let _state = this.computeState(width);

    // Important to keep the state on rerender, in terms of current page etc
    // dont rerender and loose state
    window.onresize = resize;

    let self = this;
    function resize(){
     let _width = document.getElementById('myCarousel').offsetWidth;
     let _state = self.computeState(_width);

     self.setState(_state);
    };    

    this.setState(_state);
  }, 

  render() {

    // All this var declars would go into some sort of compute styles/layout method

    let {offers, height} = this.props;

    //
    if(!this.state.width){
      return (<div className="carousel-wrap" style={styles} ref='carouselNode'></div>)
    }

    console.log('nextItemIntoView',this.state.nextItemIntoView, 'itemsPerPage', this.state.itemsPerPage, 'currentPage', this.state.currentPage, 'of', this.state.pages, 'pages');    

    let styles = {
      height: height + 'px'
    };
    
    let bodyStyles = {
      width: this.state.bodyWidth  + 'px',
    }

    let controlsStyles = {
      top: this.state.controlsTopPosition
    }

    let listStyles = {
      width: this.state.listWidth + 'px',
      marginLeft: '-' + (this.state.currentPage * this.state.itemsPerPage * (this.state.productWidth + this.state.distanceBetweenItems)) + 'px'
    }

    let products = offers.map((offer, j) => {
      return (<li key={'item-' + j}><Product offer={offer} width={this.state.productWidth}/></li>)
    });

    let nextStyle = {
      display: this.state.currentPage + 1 === this.state.pages ? 'none' : 'block'
    };

    let prevStyle = {
      display: this.state.currentPage === 0 ? 'none' : 'block'
    };    

    return (
      <div className="carousel-wrap" style={styles} ref='carouselNode' id="myCarousel">
        <div className="carousel-controls" style={controlsStyles}>
          <a href="#" style={prevStyle} onClick={this.goPrev} className="c-prev-control carousel-control"></a>
          <a href="#" style={nextStyle} onClick={this.goNext} className="c-next-control carousel-control"></a>
        </div>
        <div className="carousel-body" style={bodyStyles} >
          <ol style={listStyles} ref='itemsList'>
            {products}
          </ol>
        </div>
      </div>
    );
  }
});
