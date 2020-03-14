import React from 'react';
import '../fontawesome-free-5.12.1-web/css/all.css';
import '../css/dropdown.css';

class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headerTitle: this.props.title
        }
    }
    render() {
        const { list, toggleItem, listOpen, toggleList} = this.props
        const { headerTitle } = this.state
        return (
            <div className="dd-wrapper">
                <div className="dd-header" onClick={() => toggleList()}>
                    <div className="dd-header-title">{headerTitle}</div>
                    {listOpen
                        ? <i className="fas fa-angle-up"></i>
                        : <i className="fas fa-angle-down"></i>
                    }
                </div>
                {listOpen && <ul className="dd-list">
                    {list.map((item) => (
                        <li className="dd-list-item" key={item.code} onClick={() => toggleItem(item)}>{item.nameEn}</li>
                    ))}
                </ul>}
            </div>
        );
    }
}
export default Dropdown;