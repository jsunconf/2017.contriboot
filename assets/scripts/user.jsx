import React from 'react';

import firebase, {FIREBASE_URL} from './config';

export default class extends React.Component {
  /**
   * Authenticate with Github
   */
  loginWithGithub() {

    firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider());
    // session only ?
  }

  /**
   * Logout a user
   */
  logout() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('SIGN OUT SUCCESSS');
    }, function(error) {
      console.log('SIGN OUT ERROR', error);
    });
  }

  renderLogin() {
    return (
      <div className='user'>
        <div className="user__message">
          Log in to contribute
        </div>
        <button
          type='button'
          className='button button--small button--login user__button-login'
          onClick={this.loginWithGithub}>
          Login with github
        </button>
      </div>
    );
  }

  renderLogOut() {
    return (
      <div className='user'>
        <div className="user__message">
          Logged in as {this.props.user.username}
        </div>
        <button
            className='button button--small user__button-logout'
            type='button'
            onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }

  /**
   * Render the login part
   */
  render() {
    return this.props.user ? this.renderLogOut() : this.renderLogin();
  }
}
