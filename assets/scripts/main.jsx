import React from 'react';
import {render} from 'react-dom';
import ReactFireMixin from 'reactfire';
import zenscroll from 'zenscroll';

import firebase, {FIREBASE_URL, VOTES_DB} from './config';

import User from './user.jsx';
import EntriesList from './entries-list.jsx';
import AddEntriesForm from './add-entries-form.jsx';

const App = React.createClass({
  /**
   * Connect mixins
   * @type {Array}
   */
  mixins: [ReactFireMixin],

  /**
   * Returns the initial state.
   * @return {Object}
   */
  getInitialState: function() {
    return {
      shallScroll: true,
      contributions: [],
      interests: [],
      votes: [],
      user: null,
      currentEntryKey: null
    };
  },

  /**
   * Initialises the firebase setup.
   */
  componentWillMount: function() {
    var self = this;
    firebase.auth().getRedirectResult().then(function(result) {
      // The signed-in user info.
      self.setState({user: self.getUserData(result.user)});
    }).catch(function(error) {
      console.log('ERROR', error);
    });
  },

  /**
   * Subscribe to hashchange
   */
  componentDidMount: function() {
    window.addEventListener('hashchange', this.checkHash, false);

    this.checkHash();
  },

  /**
   * When the component did update
   */
  componentDidUpdate: function() {
    const state = this.state,
      interests = state.interests,
      contributions = state.contributions,
      currentEntryKey = state.currentEntryKey,
      entriesCount = document.querySelectorAll('.entry').length,
      didRender = contributions.length + interests.length === entriesCount;
    let currentElement = null;

    if (didRender && state.shallScroll && contributions.length &&
        interests.length) {
      this.setState({shallScroll: false});

      currentElement = document.querySelector(
        `[data-key='${currentEntryKey}']`);

      if (currentElement) {
        zenscroll.to(currentElement);
      }
    }
  },

  /**
   * Subscribe to hashchange
   */
  componentWillUnmount: function() {
    window.removeEventListener('hashchange', this.checkHash, false);
  },

  /**
   * When the hash changed
   */
  checkHash: function() {
    const currentEntryKey = location.hash.substr(1);

    this.setState({currentEntryKey});
  },

  /**
   * Get the current user data
   * @param {Object} user The raw user data
   * @return {Object} The users data
   */
  getUserData: function(user) {
    if (!user) {
      return null;
    }

    return {
      id: user.uid,
      username: user.displayName,
      displayName: user.displayName,
      profileImageURL: user.photoURL
    };
  },

  /**
   * Add a new entry to the contributions
   * @param  {Object} newEntry The new entry
   */
  handleEntryAdd: function(newEntry) {

    const typeRef = firebase.database().ref(newEntry.type),
      votesRef = firebase.database().ref(VOTES_DB),
      newEntryRef = typeRef.push({
        title: newEntry.title,
        description: newEntry.description,
        user: this.state.user
      });
      newEntryRef.then(result => {
        const newKey = result.key;
        votesRef.child(newKey).set(1);
      //  location.hash = newKey;
      })

    this.setState({shallScroll: true});
  },

  /**
   * Returns the component.
   * @return {React.Element}
   */
  render: function() {
    const isLoggedin = this.state.user !== null;

    return (
      <div className='contriboot'>
        <section className='entries-container'>
          <EntriesList
            title='Contributions'
            type='contributions'
            currentEntryKey={this.state.currentEntryKey}
            entries={this.state.contributions}
            votes={this.state.votes} />
          <EntriesList
            title='Interests'
            type='interests'
            currentEntryKey={this.state.currentEntryKey}
            entries={this.state.interests}
            votes={this.state.votes} />
        </section>

        <h2>Add contrib or interest</h2>

        <User user={this.state.user} />

        {isLoggedin ?
          <AddEntriesForm onEntryAdd={this.handleEntryAdd} /> :
          null
        }

      </div>
    );
  }
});

render(<App/>, document.querySelector('.mount'))
