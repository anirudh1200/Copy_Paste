import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component{
    state = {
        pasteList: []
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/download')
            .then(res => res.json())
            .then(res => this.setState({pasteList: res}));
    }

    updatePasteList = (newPaste) => {
        this.setState({pasteList: [...this.state.pasteList, newPaste]});
    }

    render(){
        return(
            <Context.Provider value={{
                ...this.state,
                updatePasteList: this.updatePasteList
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
