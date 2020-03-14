import React from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerComponent from './marker.js';

class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 49.126129,
      lng: -123.183273
    },
    zoom: 6
  };

  render() {
    const { markers } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAemNiPMe414RTfB2DJ_GcsjfvZekeIT98' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {markers.map(obj => {
            return <MarkerComponent
              key = {obj.name}
              name = {obj.name}
              lat = {obj.lat}
              lng = {obj.lon}
              condition = {obj.condition}
              temp = {obj.temp}
              wind = {obj.wind}
              visibility = {obj.visibility}
              text = {obj.name + obj.latvalue + "and" + obj.lonvalue}
            />

          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;  