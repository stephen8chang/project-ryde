import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
const DashboardScreen = props => {
  return (
    <div>
      {!props.auth ? <Redirect to='/login' /> : <Redirect to='/projects' />}
    </div>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(DashboardScreen);
