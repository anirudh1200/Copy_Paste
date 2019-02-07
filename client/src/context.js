import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component{
    state = {
        pasteList: []
    }

    componentDidMount(){
        fetch('/api/download')
            .then(res => res.json())
            .then(res => this.setState({pasteList: res}));
    }

    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
