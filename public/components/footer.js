import React from 'react';

class Footer extends React.Component {
    render() {
        var routes = [];
        this.props.routes.forEach((link,idx) => {
            routes.push(<li key={idx}><a href={link.href}>{link.name}</a></li>);
        });
        return (
            <footer>
                {routes}
            </footer>
        );
    }
}

export default Footer;