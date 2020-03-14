import React from 'react';
import '../css/showlist.css';

class Showlist extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { list, toggleItem } = this.props
        return (
            <div className="show-container">
                <ul className="dd-list">
                    {list.map((item) => (
                        <li className="dd-list-item" key={item.code} >
                            {item.nameEn}
                            <i className="fas fa-times close-tag" onClick={() => toggleItem(item)}></i>
                            {/* this really funny that city code in 'dd.weather.gc.ca'is different from here
                                so, I can't show as iframe*/}
                            {/* <iframe  className="list-iframe" title="Environment Canada Weather" width="287px" height="191px" src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=ab-49&amp;lang=e" allowtransparency="true" frameborder="0"></iframe> */}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Showlist;