import BackgroundContainer from 'BackgroundContainer';

require('style-loader!css-loader!sass-loader!applicationStyles')

window.onload = function(){
  window.bg = new BackgroundContainer();
}
