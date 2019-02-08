import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import formatDate from '../../utils/date';
import { Consumer } from '../../context';

class UploadForm extends Component{

    state = {
        pasteData: '',
        url: '',
        date: formatDate(new Date()),
        status: ''
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = () => {
        if(this.validateForm()){
            let data = {...this.state};
            fetch("/api/upload",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                if(res.success){
                    this.props.history.push('/');
                }
            })
            .catch(console.log);
        }
    }

    validateForm = () => {
        if(!this.state.pasteData){
            this.setState({status: '* Your Paste Connot Be Empty'})
            return false;
        }
        if(!this.state.url){
            this.setState({status: '* Please Enter URL'})
            return false;
        }
        return true;
    }

    render(){
        return(
            <Fragment>
                <Typography
                  variant="h4"
                  style={{width:'100%', margin: '1% 0%',textAlign: 'center', color: grey[800]}}
                >
                    Upload Your Paste
                </Typography>
                <form autoComplete="off" style={{width:'80%', margin:'0% 10%'}}>
                    <TextField
                      id="outlined-multiline-static"
                      required
                      label="Add Your Paste"
                      multiline
                      rows="30"
                      name="pasteData"
                      margin="normal"
                      variant="outlined"
                      onChange={this.handleChange}
                      style={{width: '100%'}}
                    />
                    <TextField
                      disabled
                      id="standard-disabled"
                      value="URL: www.example.com/"
                      margin="normal"
                    />
                    <TextField
                      id="standard-name"
                      label="Url"
                      value={this.state.name}
                      name= "url"
                      onChange={this.handleChange}
                      margin="none"
                    />
                    <div style={{marginTop: '2%', textAlign: 'center'}}>
                        <div style={{color: 'red'}}>{this.state.status}</div>
                        <Consumer>
                            {({updatePasteList}) => {
                                return(
                                    <Fab
                                      variant="extended"
                                      aria-label="Delete"
                                      style={{color: grey[50],backgroundColor: grey[800]}}
                                      onClick={() => {
                                          let {url, date} = this.state;
                                          console.log(url, date);
                                          this.handleSubmit();
                                          updatePasteList({url, date});
                                      }}
                                    >
                                      <NavigationIcon style={{color: grey[50]}} />
                                      Upload
                                    </Fab>
                                )
                            }}
                        </Consumer>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default UploadForm;