import React from 'react'
import axios from 'axios'
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOneHWset1 = this.handleAddOneHWset1.bind(this);
        this.handleMinusOneHWset1 = this.handleMinusOneHWset1.bind(this);
        this.handleAddOneHWset2 = this.handleAddOneHWset2.bind(this);
        this.handleMinusOneHWset2 = this.handleMinusOneHWset2.bind(this);
        this.fetchHWset1avail = this.fetchHWset1avail.bind(this);
        this.fetchHWset2avail = this.fetchHWset2avail.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.fetchHWset1 = this.fetchHWset1.bind(this);
        this.fetchHWset2 = this.fetchHWset2.bind(this);
        this.state = {
            count1: 10,
            count2: 10,
            _id1: '606e62384a7d6164dcf86baa',
            _id2: '606e62484a7d6164dcf86bab'
        };
    }
    componentDidMount() {
    const stringCount = localStorage.getItem('count');
    const count = parseInt(stringCount, 10);

    if (!isNaN(count)) {
      this.setState(() => ({ count }));
    }
  }
 
    componentDidUpdate(prevProps, prevState) {
      if (prevState.count !== this.state.count) {
        localStorage.setItem('count', this.state.count);
      }
    }
    handleCheckout = async (increase, hwset) => {
        if(hwset===1)
            await axios.put('/api/hwset', {_id:this.state._id1, inc: increase})
        else
            await axios.put('/api/hwset', {_id:this.state._id2, inc: increase})
        return {}
    }
    fetchHWset1avail() {
        let avail = this.fetchHWset1()
        console.log(avail)
        return avail.data
    }
    fetchHWset1 = async() => {
        // console.log(this.state._id1)
        let res = await axios.get('/api/hwset/'+this.state._id1)
        return res.data
    }
    fetchHWset2avail() {
        let avail = this.fetchHWset2()
        console.log(avail.data)
        return avail.data
    }
    fetchHWset2 = async() => {
        let res = await axios.get('/api/hwset'+this.state._id2)
        return res
    }
    handleAddOneHWset1() {
        if(this.state.count1<10) {
            this.handleCheckout(true, 1)
            this.setState((prevState) => {
                    return {
                        count1: prevState.count1 +1
                    };
            });
        }
    }
    handleMinusOneHWset1 () {
        if(this.state.count1>0) {
            this.handleCheckout(false, 1)
            this.setState((prevState) => {
                    return {
                        count1: prevState.count1 -1
                    };
            });
        }
    
    }
    handleAddOneHWset2() {
        if(this.state.count2<10) {
            this.handleCheckout(true, 2)
            this.setState((prevState) => {
                    return {
                        count2: prevState.count2 +1
                    };
            });
        }
    }
    handleMinusOneHWset2() {
        if(this.state.count2>0) {
            this.handleCheckout(false, 2)
            this.setState((prevState) => {
                    return {
                        count2: prevState.count2 -1
                    };
            });
        }
    }
    render() {
        return (
            <div>
                <h1>HWSet1 Availability: {this.fetchHWset1avail()}</h1>
                <button onClick={this.handleAddOneHWset1}>Check-in</button>
                <button onClick={this.handleMinusOneHWset1}>Check-out</button>
                <h1>HWSet2 Availability: {this.fetchHWset2avail}</h1>
                <button onClick={this.handleAddOneHWset2}>Check-in</button>
                <button onClick={this.handleMinusOneHWset2}>Check-out</button>


            </div>
        )
    }
}

export default Counter


// import React, { Component } from 'react';
// import axios from 'axios';

// export class Counter extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             sets: []
//         };
//     }

//     componentDidMount() {
//         axios.get('/api/hwset')
//             .then(({ data }) => this.setState({ sets: data }))
//             .catch(e => console.log(e))
//     }
//     render() {
//         const sets = this.state.sets.map(group => (
//             <div key={group._id}>
//                 <h1>{group.name}</h1>
//                 <p>{group.available}</p>
//             </div>
//         ));

//         return (
//             <div className="HWSets">
//                 {sets}
//             </div>
//         );
//     }
// }

// export default Counter




