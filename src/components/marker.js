import React from 'react';
import '../fontawesome-free-5.12.1-web/css/all.css';
import '../css/bubble.css';
import sun from '../img/sun.png';
import cloudy from '../img/sunny.png';
import rain from '../img/drizzle.png';
import snow from '../img/snowing.png';
import mist from '../img/haze.png';

class MarkerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const { name, condition, temp, wind} = this.props;
    // hashmap 
    let myMap = new Map();
    myMap.set("Sunny", sun );
    myMap.set("Clear", sun );
    myMap.set("Mainly Clear", sun );
    myMap.set("Mainly Sunny", sun );
    myMap.set("Mostly Cloudy", cloudy );
    myMap.set("Partly Cloudy", cloudy );
    myMap.set("Cloudy", cloudy );
    myMap.set("Mist", mist );
    myMap.set("Light Rain", rain );
    myMap.set("Light Snow", snow );
    myMap.set("Drifting Snow", snow );
    myMap.set("Ice Crystals", snow );
    myMap.set("empty", sun );
    myMap.set( "", sun );

    return (
      <div className="bubble-container">
        <div >
          <div className="bubble box-row">
              {/* Using hashmap get image, default value is sun */}
              <img src = {myMap.get(condition)} className = "weather-img"/>
            <div>
              <span><strong>{name}</strong></span> <br />
                Current: {temp} &#8451; <br />
                wind: {wind} km/h
            </div>
          </div>
          <div className="pointer"></div>
        </div>
        <div>
          <div className="bubble blurred"></div>
          <div className="pointer blurred"></div>
        </div>

      </div>
    )
  }
}
export default MarkerComponent