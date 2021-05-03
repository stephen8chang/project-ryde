import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Album from './Album';
const DashboardScreen = props => {
  return (
    <div>
      {!props.auth ? <Album /> : <Redirect to='/projects' />}
    </div>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(DashboardScreen);
