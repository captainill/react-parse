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

import Overview from './Overview.react.js';
import Expenses from './Expenses.react.js';
import Sidebar from './Sidebar.react.js';

const contents = [
  <Overview />,
  <Expenses />
];

export default class AppWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };  
  }

  render() {
    return (
      <div>
        <div className='menu'>
          <a
            className={this.state.currentTab === 0 ? 'selected' : ''}
            onClick={this.selectTab.bind(this, 0)}>
            Overview
          </a>
          <a
            className={this.state.currentTab === 1 ? 'selected' : ''}
            onClick={this.selectTab.bind(this, 1)}>
            Expenses
          </a>
        </div>
        <Sidebar />
        <div className='mainPanel'>
          {contents[this.state.currentTab]}
        </div>
      </div>
    );
  }

  selectTab(tab) {
    this.setState({ currentTab: tab });
  }
};