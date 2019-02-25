import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class AceEditor extends Component {

  componentDidMount(){
    let ace = window.ace;
    const node = findDOMNode(this.refs.root);
    const editor = ace.edit(node);
    editor.setTheme("ace/theme/pastel_on_dark");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setOptions({minLines: 30});
    editor.setOptions({maxLines: 30});
    editor.setOption('fontSize', 20);
  } 

  render() {
    const style = {fontSize: '14px !important', border: '1px solid lightgray'};
      return (
        <div ref="root" style={style}>
          {this.props.code}
        </div>
      );
  }
}

export default AceEditor;