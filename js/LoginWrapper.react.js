/*
 *  Copyright (c) 2015, Parse, LLC. All rights reserved.
 *
 *  You are hereby granted a non-exclusive, worldwide, royalty-free license to
 *  use, copy, modify, and distribute this software in source code or binary
 *  form for use in connection with the web services and APIs provided by Parse.
 *
 *  As with any software that integrates with the Parse platform, your use of
 *  this software is subject to the Parse Terms of Service
 *  [https://www.parse.com/about/terms]. This copyright notice shall be
 *  included in all copies or substantial portions of the software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 *  IN THE SOFTWARE.
 *
 */

import React from 'react';
import { Parse } from 'parse';
import ParseReact from 'parse-react';
import ParseComponent from 'parse-react/class';

const AppWrapper = require('./AppWrapper.react.js');

export default class LoginWrapper extends ParseComponent{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      signup: false
    };

    this.submit = this.submit.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }  

  observe() {
    return {
      user: ParseReact.currentUser
    };
  }

  render() {
    if (this.data.user) {
      return (
        <div>
          <a className='logOut' onClick={this.logOut}>
            <svg viewBox='0 0 60 60'>
              <path d="M0,0 L30,0 L30,10 L10,10 L10,50 L30,50 L30,60 L0,60 Z"></path>
              <path d="M20,23 L40,23 L40,10 L60,30 L40,50 L40,37 L20,37 Z"></path>
            </svg>
          </a>
          <AppWrapper />
        </div>
      );
    }
    return (
      <div>
        <h1>AnyBudget</h1>
        <h2>Powered by Parse + React</h2>
        <div className='loginForm' onKeyDown={this.keyDown}>
          {
            this.state.error ?
            <div className='row centered errors'>{this.state.error}</div> :
            null
          }
          <div className='row'>
            <label htmlFor='username'>Username</label>
            <input ref='username' id='username' type='text' />
          </div>
          <div className='row'>
            <label htmlFor='password'>Password</label>
            <input ref='password' id='password' type='password' />
          </div>
          <div className='row centered'>
            <a className='button' onClick={this.submit}>
              {this.state.signup ? 'Sign up' : 'Log in'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  submit() {
    const self = this;
    const username = React.findDOMNode(this.refs.username).value;
    const password = React.findDOMNode(this.refs.password).value;
    if (username.length && password.length) {
      Parse.User.logIn(username, password).then(function() {
        self.setState({
          error: null
        });
      }, function() {
        self.setState({
          error: 'Incorrect username or password'
        });
      });
    } else {
      this.setState({
        error: 'Please enter all fields'
      });
    }
  }

  logOut() {
    Parse.User.logOut();
  }

  keyDown(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
  }

};