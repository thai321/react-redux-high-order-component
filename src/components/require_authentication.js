import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {

  class Authentication extends Component {
    static contextTypes= {  // Authentication.contextTypes
      router: React.PropTypes.object
    }

    componentWillMount() {  // call before render
      if (!this.props.authenticated) {
        this.context.router.push('/');  // can't access to resources if not
                                        //loggin
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.push('/'); // inside resources + click log out
                                    //--> will get kick out to the home page
      }
    }

    render() {
      // console.log('Rendering ComposedComponent: ', ComposedComponent);
      // console.log('Authenticated: ', this.props.authenticated);
      console.log('this.context: ', this.context); // access to router
      return <ComposedComponent {...this.props} /> // pass the addition props
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }

  return connect(mapStateToProps, null)(Authentication);
}


// In some other location ... Not in this file...
// We want to use this HOC (high order component)
//// import Authentication // this is HOC
//// import Resources // This is the component I want to wrap

//// const ComposedComponent = Authentication(Resources);

// In some render method...
//// <ComposedComponent resources={resourceList} />
