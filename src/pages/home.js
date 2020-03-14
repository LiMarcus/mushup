import React from 'react';
import '../css/home-page.css';
import '../css/modal.css'
import fetch_data from '../data_fetch/fetch_xml.js';
import reader from '../data_fetch/weather_reader.js';
import Dropdown from '../components/dropdown.js';
import Showlist from '../components/showinglist.js';
import duplicate from '../functions/check-duplicate.js';
import deleteElement from '../functions/delete-element.js';
import Map from '../components/map.js';
import get_details from '../functions/get_details.js';
import generate_markers from '../functions/generate_markers.js';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [],
      length: 0,
      //initial cities
      selected: [
        { code: "s0000227", nameEn: "Dease Lake", nameFr: "Dease Lake", provinceCode: "BC" },
        { code: "s0000771", nameEn: "Fort Nelson", nameFr: "Fort Nelson", provinceCode: "BC" },
        { code: "s0000757", nameEn: "Terrace", nameFr: "Terrace", provinceCode: "BC" },
        { code: "s0000146", nameEn: "Prince George", nameFr: "Prince George", provinceCode: "BC" },
        { code: "s0000078", nameEn: "Whistler", nameFr: "Whistler", provinceCode: "BC" },
        { code: "s0000679", nameEn: "Revelstoke", nameFr: "Revelstoke", provinceCode: "BC" },
        { code: "s0000212", nameEn: "Creston", nameFr: "Creston", provinceCode: "BC" }
      ],
      markers: [],
      showModal: true
    }
    this.toggleList = this.toggleList.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.toggleCancel = this.toggleCancel.bind(this);
    this.showAll = this.showAll.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  async componentDidMount() {
    //get city code 
    const xml = await fetch_data();
    const list = await reader(xml);
    //get current city weather data 
    const details = await get_details(this.state.selected, 'e');
    //generate markers on map
    const markers = generate_markers(details);
    //update state
    this.setState({
      data: list.siteList.site,
      length: list.siteList.site.length,
      markers: markers
    })
  }

  //show Modal
  handleShow() {
    this.setState({showModal: true});
  }
  
  //hide Modal
  handleHide() {
    this.setState({showModal: false});
  }



  //open and close list selection
  toggleList() {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }

  //selected new cities
  async toggleSelected(item) {
    let temp = this.state.selected;
    //check if item already exist in the showlist
    if (duplicate(temp, item)) {
      // we just add single city data, so we use push() and concat()
      temp.push(item);
      const singleDetail = await get_details([item], 'e');
      const singleMarker = generate_markers(singleDetail);
      const markers = this.state.markers.concat(singleMarker);
      //update
      this.setState({
        selected: temp,
        markers: markers
      });
    }
  }

  //remove cities
  toggleCancel(item) {
    let tempSelected = this.state.selected;
    let tempMarkers = this.state.markers;
    //get index of city which we want to delete
    const num = deleteElement(tempSelected, item)
    //remove from array
    let newSelected = tempSelected.splice(num, 1);
    let newMarkers = tempMarkers.splice(num, 1);
    //update
    this.setState({
      selected: newSelected,
      markers: newMarkers
    });
    console.log(this.state.selected);
  }

  //show all cities
  async showAll() {
    //there are too many cities, need wait about 2 mins
    const details = await get_details(this.state.data, 'e');
    const markers = generate_markers(details);
    this.setState({
      selected: this.state.data,
      markers: markers
    });
  }

  //remove all
  clearAll() {
    this.setState({
      selected: [],
      markers: []
    });
  }

  render() {
    // modal is the notice to let user install extension.
    const modal = this.state.showModal ? (
        <div className="modal">
          <div className = "modal-text">
            Please open this website on Chrome, and Download this <a href = "https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US">extension</a>. I fetch data from Environment Canada, this extension can solve CORS limition.
          </div>
          <button className = "modal-button" onClick={this.handleHide}>Close</button>
        </div>
    ) : null;
    return (
      <div>
         {modal}
        <div className="home-list">
          <Dropdown
            titleHelper="Location"
            title="Select location"
            list={this.state.data}
            listOpen={this.state.open}
            toggleItem={this.toggleSelected} 
            toggleList={this.toggleList}
          />
          {this.state.open && <div>
            <div className="button-container">
              <button className="list-button" onClick={() => this.showAll()}>Show All</button>
              <button className="list-button" onClick={() => this.clearAll()}>Clear</button>
            </div>
            <Showlist
              list={this.state.selected}
              toggleItem={this.toggleCancel}
              listOpen={this.state.open}
            />
          </div>}
        </div>
        <Map
          markers={this.state.markers}
        />
      </div>
    );
  }

}
export default Home;
