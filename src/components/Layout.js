import React, { Component } from 'react';
import { Container,Row, Col } from 'reactstrap';
import './layout.css';
import CreateNotes from './CreateNotes';
import ViewNotes from './ViewNotes' 

class Layout extends Component {
    state={
        masterData:JSON.parse(localStorage.getItem('masterData')) || []
    }
    
    updatedata=(masterData)=>{
        this.setState({
            masterData
        },()=>{
            console.log('masterData',this.state.masterData)
        })
    }
    render() {
        return (
            <div className="head">
                <Container fluid="true" >
                    <h1 className="heading">Look Now</h1>
                    <div>
                        
                                <Row>
                                    <Col md="6" className="login-col">
                                         <CreateNotes udpadteMasterData={this.updatedata}/>
                                    </Col>
                                    <Col md="6"  >
                                        <ViewNotes masterData={this.state.masterData}/>
                                    </Col>
                                </Row>                                
                                
                                
                                                                                            
                        
                    </div>
                 </Container>
                 
                 
            
            </div>
        );
    }
}

export default Layout;