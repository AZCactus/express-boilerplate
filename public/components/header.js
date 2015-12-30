import React, {Component} from 'react';

class Header extends Component {
    render () {
        var routes = [];
        this.props.routes.forEach((link,idx) => {
            routes.push(<li key={idx}><a href={link.href}>{link.name}</a></li>);
        });
        return (
        <header className="page-header">
            {routes}
        </header>
        );
    }
}

export default Header;