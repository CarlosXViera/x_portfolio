import React, {PropTypes} from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Works from 'Works'
import Contact from 'Contact'
import About from 'About'

export default class Nav extends React.Component {

    constructor(props) {
        super(props)

        this.state = {};
    }

    componentWillMount() {}

    render() {

        return (
            <Router>
                <div>
                    <div className="Main">
                        <Route path='/contacts' component={Contact}/>
                        <Route path='/works' component={Works}/>
                        <Route exact path='/' component={About}/>
                    </div>
                    <div className="tab contacts">
                        <Link to="/contacts" className="tabText">Contact</Link>
                    </div>
                    <div className="tab works">
                        <Link to="/works" className="tabText">Works</Link>
                    </div>
                    <div className="tab about">
                        <Link to="/about" className="tabText">About</Link>
                    </div>

                </div>
            </Router>
        )
    }
}
