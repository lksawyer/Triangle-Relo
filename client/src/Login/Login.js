import React from 'react';
import { GoogleLogin } from 'react-google-login-component';

class Login extends React.Component{

  constructor (props, context) {
    super(props, context);
  }

  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    
    console.log({ googleId });
    console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)...
  }

  render () {
    return (
        <GoogleLogin socialId="218454988847-pmk97qo9id6fsl19u3k10p197r2e2b7h.apps.googleusercontent.com"
                     className={'google-login ' + this.props.cssClasses}
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText="Login With Google"/>
    );
  }

}

export default Login;
