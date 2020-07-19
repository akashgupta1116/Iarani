import React, { Component } from 'react';
import { Container,Row, Col,Table,Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Label, Input,FormFeedback } from 'reactstrap';
import './viewnotes.css';
import { connect } from 'react-redux';
import editMasterData from '../actionCreators/editMasterData.js';

class ViewNotes extends Component {
    state={
        modal:false,
        readOnlyModal:false,
        showEditData:{},
        showViewOnlyData:{},
        title:'',
        content:'',
        isDisabled:false
    }
    
    openModal=(event,index)=>{
        this.setState({
            modal:!this.state.modal
        },()=>this.showEditData(index))
    }
    showEditData=(index)=>{
        this.setState({
            showEditData:{...this.props.masterData[index], index}
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
            showViewOnlyData:this.props.masterData[index]
        })
    }
    changeHandler=(event)=>{
        let data = this.state.showEditData;
        data[event.target.id]=event.target.value
        this.setState({
           showEditData:data
        },()=>{
            if(this.state.showEditData.title){
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
    saveHandler=()=>{
        let temp = [...this.props.masterData];
         temp[this.state.showEditData.index] = this.state.showEditData;
         this.props.editData(this.state.showEditData.index,this.state.showEditData);
          this.toggle();
    }
    render() {
        console.log(this.props)
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
                                {this.props.masterData?this.props.masterData.map((item,index)=>{
                                     return <tr key={`${index}-${item.title}`}>
                                        <th scope="row">{index+1}</th>
                                        <td><a href="javascript:void(0)" onClick={(event)=>this.readOnlyOpenModel(event,index)}>{item.title}</a></td>
                                        <td>{item.date}</td>
                                        <td><Button color="danger" onClick={(event)=>this.openModal(event,index)}>Edit</Button></td>
                                     </tr>
                                    }):''}
                                </tbody>
                            </Table>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader className="modal-header2" toggle={this.toggle}>Edit Note  <p className="date">{this.state.showEditData.date}</p> </ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="title">Title:</Label>
                                        
                                            <Input type="text" name="title" id="title"  value={this.state.showEditData.title} onChange={(event)=>this.changeHandler(event)}  />
                                            
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="content">Content:</Label>
                                        
                                        <Input type="textarea" name="content" id="content" value={this.state.showEditData.content} onChange={(event)=>this.changeHandler(event)}   />
                                        
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.saveHandler} disabled={this.state.isDisabled}>Save</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Discard</Button>
                                </ModalFooter>
                            </Modal>
                            <Modal isOpen={this.state.readOnlyModal} toggle={this.readOnlytoggle}>
                                <ModalHeader className="modal-header2" toggle={this.readOnlytoggle}>View Note <p className="date">{this.state.showEditData.date}</p></ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="view-title">Title:</Label>
                                        
                                            <p className="view-text">{this.state.showViewOnlyData.title}</p> 
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="view-content">Content:</Label>
                                        
                                        <p className="view-text">{this.state.showViewOnlyData.content} </p>
                                        
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
const mapStateToProps = ({ masterData }) =>({
    masterData
})

const mapDispatchToProps = dispatch => ({
    editData:(index,obj)=> dispatch(editMasterData(index,obj))
})
export default connect(mapStateToProps,mapDispatchToProps)(ViewNotes);;