import React, { Component } from 'react';
import { Container,Row, Col,Table,Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Label, Input,FormFeedback } from 'reactstrap';
import './viewnotes.css'

class ViewNotes extends Component {
    state={
        modal:false,
        masterData:this.props.masterData || [],
        readOnlyModal:false,
        showEditData:{},
        showViewOnlyData:{},
        title:'',
        content:''
    }
    
    static getDerivedStateFromProps=(nextProps, prevProps)=>{
        return{masterData: nextProps.masterData};
    }
    openModal=(event,index)=>{
        this.setState({
            modal:!this.state.modal
        },()=>this.showEditData(index))
    }
    showEditData=(index)=>{
        // console.log('index',index)
        this.setState({
            showEditData:{...this.state.masterData[index], index}
        })
    }
    toggle=()=>{
        this.setState({
            modal:!this.state.modal
        })
    }
    readOnlyOpenModel=(event,index)=>{
        this.setState({
            readOnlyModal:!this.state.readOnlyModal
        },()=>this.showViewOnlyData(index))
    }
    readOnlytoggle=()=>{
        this.setState({
            readOnlyModal:!this.state.readOnlyModal
        })
    }
    showViewOnlyData=(index)=>{
        this.setState({
            showViewOnlyData:this.state.masterData[index]
        })
    }
    changeHandler=(event)=>{
        let data = this.state.showEditData;
        data[event.target.id]=event.target.value
        this.setState({
           showEditData:data
        })
    }
    saveHandler=()=>{
        let temp = this.state.masterData;
        temp[this.state.showEditData.index] = this.state.showEditData;
        this.setState({
            masterData: temp
        });
        localStorage.setItem('masterData',JSON.stringify(this.state.masterData));
        this.toggle();
    }
    render() {
        
        return (
            <div >
                <Container >
                    <Row>
                        <Col md='11' className="table-column" >
                            <Table className="table" >
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.masterData?this.state.masterData.map((item,index)=>{
                                     return <tr key={`${index}-${item.title}`}>
                                        <th scope="row">{index+1}</th>
                                        <td onClick={(event)=>this.readOnlyOpenModel(event,index)}><a href>{item.title}</a></td>
                                        <td>{item.date}</td>
                                        <td><Button color="danger" onClick={(event)=>this.openModal(event,index)}>Edit</Button></td>
                                     </tr>
                                    }):''}
                                </tbody>
                            </Table>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Edit Note</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                        
                                            <Input type="text" name="title" id="title"  value={this.state.showEditData.title} onChange={(event)=>this.changeHandler(event)}  />
                                            <FormFeedback valid>This one is good.</FormFeedback>
                                            <FormFeedback>Please provide correct input.</FormFeedback>
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="content">Content</Label>
                                        
                                        <Input type="textarea" name="content" id="content" value={this.state.showEditData.content} onChange={(event)=>this.changeHandler(event)}   />
                                        <FormFeedback valid>This one is good.</FormFeedback>
                                        <FormFeedback>Please provide correct input.</FormFeedback>
                                        
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.saveHandler}>Save</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Discard</Button>
                                </ModalFooter>
                            </Modal>
                            <Modal isOpen={this.state.readOnlyModal} toggle={this.readOnlytoggle}>
                                <ModalHeader toggle={this.readOnlytoggle}>View Note</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="view-title">Title</Label>
                                        
                                            <p >{this.state.showViewOnlyData.title}</p> 
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="view-content">Content</Label>
                                        
                                        <p>{this.state.showViewOnlyData.content} </p>
                                        
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                </ModalFooter>
                            </Modal>                
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ViewNotes;