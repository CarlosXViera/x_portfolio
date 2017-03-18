
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'

// load foundation
$(document).foundation();

//application scss
require('style-loader!css-loader!sass-loader!applicationStyles')

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)

// window.onload = function(){
//   window.bg = new BackgroundContainer();
// }
