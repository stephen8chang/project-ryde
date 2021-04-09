import React, { Component } from 'react';
import axios from 'axios';

export class Counter extends Component {
    constaractor(state) {

        state = {
            sets: []
        };
    }

    componentDidMount() {
        axios.get('/api/hwset')
            .then(({ data }) => this.setState({ sets: data }))
            .catch(e => console.log(e))
    }
    render() {
        const sets = this.state.sets.map(group => (
            <div key={group._id}>
                <h1>{group.name}</h1>
                <p>{group.available}</p> 
            </div>
        ));

        return (
            <div className="HWSets">
                {sets}
            </div>
        );
    }
}

export default Counter