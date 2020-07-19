import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Label, Input,Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './createnotes.css';
import { connect } from 'react-redux';
import updateMasterData from '../actionCreators/updateMasterData';
const month = [
 "January",
 "February",
 "March",
 "April",
 "May",
 "June",
 "July",
 "August",
 "September",
 "October",
 "November",
 "December",
]
class CreateNotes extends Component {
    state = {
        date: new Date(),
        modal:false,
        title:'',
        content:'',
        isDisabled:true
    }
    toggle=()=>{
        this.setState({
            modal:!this.state.modal
        })
    }
    changeHandler=(event)=>{
        this.setState({
          [event.target.id]:event.target.value
        },()=>{
            if(this.state.title){
                this.setState({
                    isDisabled:false
                })
            }
            else{
                this.setState({
                    isDisabled:true
                })
            }
        })
    }
    submitHandler=()=>{
        const obj = {
            title:this.state.title,
            content:this.state.content,
            date:this.state.date.getDate()+" "+month[this.state.date.getMonth()]+" "+this.state.date.getFullYear()
        };
    
        this.toggle();
       
        this.props.data(obj);
        
        this.setState({
            title:'',
            content:''
        })
        
        
    }    
    
    onChange = date => this.setState({ date,modal:!this.state.modal },()=>console.log(this.state.date.getDate()+" "+month[this.state.date.getMonth()]+" "+this.state.date.getFullYear()))
    render() {
        return (
            <div>
                <Container className="margin-bottom">
                    <Row form>m
                        <Col md="11">
                            <Calendar className="calender" onChange={this.onChange} value={this.state.date}/>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Edit Note</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="title">Title:</Label>
                                        
                                            <Input type="text" name="title" id="title"  value={this.state.title} onChange={(event)=>this.changeHandler(event)}  />
                                            
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="content">Content:</Label>
                                        
                                        <Input type="textarea" name="content" id="content" value={this.state.content} onChange={(event)=>this.changeHandler(event)}   />
                
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.submitHandler}  disabled={this.state.isDisabled}>Save</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Discard</Button>
                                </ModalFooter>
                            </Modal>
                            
                        </Col>
                            
                    </Row>
           
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ masterData }) =>({
    masterData
})

const mapDispatchToProps = dispatch => ({
    data:obj => dispatch(updateMasterData(obj))
})
    


export default connect(mapStateToProps,mapDispatchToProps)(CreateNotes);