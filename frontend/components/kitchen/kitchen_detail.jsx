import React from 'react';
import {Link, withRouter } from 'react-router-dom';
import KitchenDetailHeader from './kitchen_detail_header';
import ReservationBoxContainer from '../reservation/reservation_box_container';


class KitchenDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      anchorLinksClassName: "free"
    };
    // this.getCityName = this.getCityName.bind(this);
    this.setAnchorRef = this.setAnchorRef.bind(this);
    this.onAnchorClick = this.onAnchorClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchKitchen(this.props.match.params.kitchenId);
    window.addEventListener('scroll', this.handleScroll);
    // if (!(this.props.city === null)) {
    //   this.getCityName();
    // }
  }

  handleScroll (e) {
    let scrollTop = e.srcElement.body.scrollTop;
    if (scrollTop > 700) {
      this.setState({anchorLinksClassName: "fixed"});
    } else {
      this.setState({anchorLinksClassName: "free"});
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.kitchenId !== newProps.match.params.kitchenId) {
    this.props.fetchKitchen(newProps.match.params.kitchenId);
    }
  }

  // getCityName() {
  //   this.setState({city: this.props.city[this.props.kitchen.city_id]});
  // }

  // componentWillMount() {
  //   this.props.fetchCities();
  // }


  // if (!this.props.city) {
  //   return null;
  // }

  setAnchorRef (name, el) {
    if (!(this.state[name])) {
      this.setState({[name]: el});
    }
  }

  onAnchorClick (name) {
    return () => {
      const el = this.state[name];
      el.scrollIntoView();
    };
  }


  render () {
    // if (Object.keys(this.props.kitchen).length > 1 && Object.keys(this.props.kitchen)[0]) {
    //   return null;
    // }
    if (!this.props.currentKitchen) {
      return null;
    }
    let kitchen = this.props.currentKitchen;
    let city = this.props.currentKitchen.city_name;
    let favorites = this.props.currentKitchen.favorite_id;
    let backPage;
    if (!(this.props.search === null)) {
      backPage = <Link to={`/searchResults?cityId=${this.props.search.city_id}&date=${this.props.search.date}&searchString=${this.props.search.search_string}&size=${this.props.search.size}`}>Back to Recent Search</Link>;
    } else {
      backPage = <Link to="/">Home</Link>;
    }
    let pictures = Object.values(kitchen.image_url);
    let picComponent = pictures.map((picture, idx) => {
      return (
      <li key={idx}>
        <div className="pic-box">
          <img className="kitchen-pictures" src={picture.image_url}/>
        </div>
      </li>
      );
    });

    return (
      <div className="kitchen-show">
        <h1 className="white"> </h1>
        <div className= "kitchen-content">
          <div className="kitchen-left">
            <ul className="kitchen-pics">
              {picComponent}
            </ul>
            <div className={`anchor-links ${this.state.anchorLinksClassName}`}>
              <p onClick={this.onAnchorClick("about")} className="anchors">About</p>
              <p onClick={this.onAnchorClick("reservation")} className="anchors">Reservation</p>
              <p onClick={this.onAnchorClick("reviews")} className="anchors">Reviews</p>
              <p>{backPage}</p>
            </div>
          </div>
          <KitchenDetailHeader kitchen={kitchen} city={city} setAnchorRef={this.setAnchorRef} />
        </div>
      </div>
    );
  }
}

export default withRouter(KitchenDetail);
