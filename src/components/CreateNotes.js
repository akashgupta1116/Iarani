import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Label, Input,FormFeedback,Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './createnotes.css';
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
        content:''
    }
    toggle=()=>{
        this.setState({
            modal:!this.state.modal
        })
    }
    changeHandler=(event)=>{
        this.setState({
          [event.target.id]:event.target.value
        })
    }
    submitHandler=()=>{
        const masterData = JSON.parse(localStorage.getItem('masterData')) || [];
        const obj = {
            title:this.state.title,
            content:this.state.content,
            date:this.state.date.getDate()+" "+month[this.state.date.getMonth()]+" "+this.state.date.getFullYear()
        };
        masterData.push(obj);
        this.toggle();
        this.props.udpadteMasterData(masterData);
        console.log(masterData);
        try{
            localStorage.setItem('masterData',JSON.stringify(masterData));
            this.setState({
                title:'',
                content:'',
            })
        }
        catch{
            console.log('local storage is full');
        }
    }
    onChange = date => this.setState({ date,modal:!this.state.modal },()=>console.log(this.state.date.getDate()+" "+month[this.state.date.getMonth()]+" "+this.state.date.getFullYear()))
    render() {
        return (
            <div>
                <Container>
                    <Row form>
                        <Col md="11">
                            <Calendar className="calender" onChange={this.onChange} value={this.state.date}/>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Edit Note</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                        
                                            <Input type="text" name="title" id="title"  value={this.state.title} onChange={(event)=>this.changeHandler(event)}  />
                                            <FormFeedback valid>This one is good.</FormFeedback>
                                            <FormFeedback>Please provide correct input.</FormFeedback>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="content">Content</Label>
                                        
                                        <Input type="textarea" name="content" id="content" value={this.state.content} onChange={(event)=>this.changeHandler(event)}   />
                                        <FormFeedback valid>This one is good.</FormFeedback>
                                        <FormFeedback>Please provide correct input.</FormFeedback>
                                        
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.submitHandler}>Save</Button>{' '}
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

export default CreateNotes;