import React, { Component } from 'react';
import { Container,Row, Col } from 'reactstrap';
import './layout.css';
import CreateNotes from './CreateNotes';
import ViewNotes from './ViewNotes';
import { Provider } from 'react-redux';
import store from '../store';

class Layout extends Component {
   
    render() {
        return (
            <Provider store={store}>

                <div className="head">
                    <Container fluid="true" >
                        <h1 className="heading">Iarani</h1>
                        <div>
                            
                                    <Row>
                                        <Col md="6" className="login-col">
                                            <CreateNotes />
                                        </Col>
                                        <Col md="6"  >
                                            <ViewNotes />
                                        </Col>
                                    </Row>                                
                                    
                                    
                                                                                                
                            
                        </div>
                    </Container>
                    
                    
                
                </div>
            </Provider>
        );
    }
}

export default Layout;