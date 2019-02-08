import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component{
    state = {
        pasteList: [],
        history: '',
        historyPresent: 0
    }

    componentDidMount(){
        fetch('/api/download')
            .then(res => res.json())
            .then(res => this.setState({pasteList: res}));
    }

    updatePasteList = (newPaste) => {
        this.setState({pasteList: [...this.state.pasteList, newPaste]});
    }

    updateHistory = (history) => {
        this.setState({history});
    }

    updateHistoryPresent = () => {
        this.setState({historyPresent: 1})
    }

    render(){
        return(
            <Context.Provider value={{
                ...this.state,
                updatePasteList: this.updatePasteList,
                updateHistory: this.updateHistory,
                updateHistoryPresent: this.updateHistoryPresent
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
