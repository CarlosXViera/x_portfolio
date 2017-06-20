import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'

//application scss
require('style-loader!css-loader!sass-loader!applicationStyles')

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
