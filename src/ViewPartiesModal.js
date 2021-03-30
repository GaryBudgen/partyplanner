import React,{Component} from 'react';
import {Modal, Table, Button, Row, Col, Form} from 'react-bootstrap';
import {format} from 'date-fns'

export class ViewPartiesModal extends Component{
    constructor(props){
        super(props);        
        this.state={parties:[]};
        this.refreshList=this.refreshList.bind(this);
    }    
    
    refreshList(personId){   
        fetch(process.env.REACT_APP_API + `party/PartiesByPerson?PersonId=${personId}`,{                     
            headers: {'Accept':'*/*',
            'Content-Type':'application/json',
            'Mode': 'cors'}
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({parties:data});
        });
    } 

    componentDidMount(){               
        this.refreshList(this.props.perid)
    }

    render(){
        const {parties} = this.state;        
        return(            
                <Modal 
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Party List for {this.props.pername}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form >
                                <Form.Group controlId="PartyName">                                        
                                    <Table class='mt-4' width="100%" striped bordered hover size="sm">
                                        <thead>
                                            <tr>                        
                                            <th>Party Name</th>
                                            <th>Location</th>
                                            <th>Date:</th>
                                            <th>Start Time:</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {parties.map(party=>
                                            <tr key={party.PartyId}>                                
                                                <td>{party.PartyName}</td>
                                                <td>{party.Location}</td>                                
                                                <td>{format(new Date(party.StartTime), "eeee, do MMM yyyy")}</td>
                                                <td>{format(new Date(party.StartTime), "HH:mm a")}</td>                                
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                </Form.Group>                                
                            </Form>
                        </Col>
                        
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="btnClose" variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>    
        )
    }
}