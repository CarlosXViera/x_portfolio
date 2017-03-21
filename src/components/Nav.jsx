import React, {PropTypes} from 'react'
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import Works from 'Works'
import Contact from 'Contact'
import About from 'About'
import Draggable from 'react-draggable';

export default class Nav extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
          activeDrags: 0,
          deltaPosition:{
            x:0, y:0
          },
          controlledPosition: {
            x: -400, y:200
          }
        };
    }

    onStart(){
      this.setState({activeDrags: ++this.state.activeDrags})
    }

    onStop(){
      this.setState({activeDrags: --this.state.activeDrags})
    }

    adjustXPos(e){
      e.preventDefault();
      e.stopPropagation();
      const {x, y} = this.state.controlledPosition;
      this.setState({controlledPostion: {x: x - 10, y}})
    }

    adjustYPos(e){
      e.preventDefault();
      e.stopPropagation();
      const {x,y} = this.state.controlledPosition;
      this.setState({controlledPosition: {x, y: y - 10}});
    }

    onControlledDrag(e, position) {
      const {x, y} = position;
      this.onStop();
    }

    onControlledDragStop(e, position){
      this.onControlledDrag(e, position);
      this.onStop();
    }

    handleDrag(e, ui){
      const {x, y} = this.state.deltaPosition;

      this.setState({
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY
        }
      });
      console.log('dragging!')
    }

    onDrag(){
      console.log('dragging!')
    }


    componentWillMount() {}


    render() {
      const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
      const {deltaPosition, controlledPosition} = this.state;
        return (
            <Draggable axis='y' {...dragHandlers}>
                <Router>
                    <div className='Main'>
                        <div className="content">
                            <Route path='/contacts' component={Contact}/>
                            <Route path='/works' component={Works}/>
                            <Route exact path='/' component={About}/>
                        </div>
                        <NavLink to="/contacts" className="tabText">
                            <div className="tab contacts">Contact</div>
                        </NavLink>

                        <NavLink to="/works" className="tabText">
                            <div className="tab works">Works</div>
                        </NavLink>

                        <NavLink to="/about" className="tabText">
                            <div className="tab about">About</div>
                        </NavLink>
                    </div>
                </Router>
            </Draggable>
        )
    }
}
