import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired
    };
    
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
    
        if (error != prevProps.error) {

            if (error.msg.name) 
                alert.error(`Name: ${error.msg.name.join()}`);

            if (error.msg.email) 
                alert.error(`Email: ${error.msg.email.join()}`);

            if (error.msg.message) 
                alert.error(`${error.msg.message.join()}`);

            if (error.msg.non_field_errors)
                alert.error(`${error.msg.non_field_errors.join()}`);
      
            if (error.status === 403)
                alert.error(`Unable to get leads: ${error.msg.detail}`);
            
            if (error.status === 500)
                alert.error(`Server error, please try again later`);
        }
        
        if (message !== prevProps.message) {
            if (message.deleteLead)
                alert.success(message.deleteLead);
            if (message.addedLead)
                alert.success(message.addedLead);
            if (message.passwordsNotMatch)
                alert.error(message.passwordsNotMatch);
        }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert(Alerts));

