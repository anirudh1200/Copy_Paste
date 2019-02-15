import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component{
    state = {
        pasteList: []
    }

    componentDidMount(){
        fetch('http://localhost:5000/download')
            .then(res => res.json())
            .then(res => this.setState({
                ...this.state,
                pasteList: res
            }));
    }

    updatePasteList = (recievedPaste, type) => {
        if(type === 'add')
            this.setState({pasteList: [...this.state.pasteList, recievedPaste]});
        else{
            let newPasteList = this.state.pasteList.filter(paste => {
                return paste.url !== recievedPaste.url;
            })
            this.setState({
                ...this.state,
                pasteList: newPasteList
            });
        }
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
