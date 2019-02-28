import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import Dropdown from './Dropdown';

class AceEditor extends Component {

  state = {
    editorText: 'Loading...',
    editor: ''
  }

  componentDidMount() {
    let ace = window.ace;
    const node = findDOMNode(this.refs.root);
    const editor = ace.edit(node);
    this.setState({ editor });
    editor.setTheme("ace/theme/dark");
    editor.getSession().setMode(`ace/mode/plain_text`);
    editor.setShowPrintMargin(false);
    editor.setOptions({ minLines: this.props.numberOfLines });
    editor.setOptions({ maxLines: this.props.numberOfLines });
    editor.setOption('fontSize', 20);
    this.props.getEditor(editor);
    editor.setValue(this.state.editorText, -1);
    setTimeout(this.setInitial, 1000);
  }

  setInitial = () => {
    this.state.editor.setValue(this.props.initialValue, -1);
  }

  changeLanguage = language => {
    switch(language){
      case 'c':
      case 'cpp':
        language = 'c_cpp';
        break;
      case 'c#':
        language = 'csharp';
        break;
      case 'f#':
        language = 'fsharp';
        break;
      case 'plaintext':
        language = 'plain_text';
        break;
      default: console.log(language);
    }
    console.log(language);
    this.state.editor.getSession().setMode(`ace/mode/${language}`);
  }

  render() {
    const style = { fontSize: '14px !important', border: '1px solid lightgray' };
    return (
      <Fragment>
        <Dropdown
          style={{ marginLeft: '30%' }}
          changeLanguage={this.changeLanguage}
        />
        <div ref="root" style={style}>
          {this.props.code}
        </div>
      </Fragment>
    );
  }
}

export default AceEditor;