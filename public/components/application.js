import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';

class Application extends React.Component {
    render () {
        return (
            <div>
                <Header routes={this.props.routes} />
                <Footer routes={this.props.routes} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        routes: state.routes
    }
}

export default connect(
  mapStateToProps
)(Application)