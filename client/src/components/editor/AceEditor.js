import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import Dropdown from './Dropdown';

class AceEditor extends Component {

  state = {
    editor: 'Loading...'
  }

  componentDidMount() {
    let ace = window.ace;
    const node = findDOMNode(this.refs.root);
    const editor = ace.edit(node);
    this.setState({ editor });
    editor.setTheme("ace/theme/dark");
    editor.getSession().setMode("ace/mode/c_cpp");
    editor.setShowPrintMargin(false);
    editor.setOptions({ minLines: this.props.numberOfLines });
    editor.setOptions({ maxLines: this.props.numberOfLines });
    editor.setOption('fontSize', 20);
    this.props.getEditor(editor);
    editor.setValue(this.state.editor, -1);
    setTimeout(this.setInitial, 1000);
  }

  setInitial = () => {
    this.state.editor.setValue(this.props.initialValue, -1);
  }

  render() {
    const style = { fontSize: '14px !important', border: '1px solid lightgray' };
    return (
      <Fragment>
        <Dropdown />
        <div ref="root" style={style}>
          {this.props.code}
        </div>
      </Fragment>
    );
  }
}

export default AceEditor;