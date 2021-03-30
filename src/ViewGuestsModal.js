import {Component} from 'react';
import {Modal, Button, Table, Row, Col, Form} from 'react-bootstrap';
import {format} from 'date-fns'

export class ViewGuestsModal extends Component{
    constructor(props){
        super(props);        
        this.state={guests:[]};     
    }   
    
    refreshList(partyId){        
        fetch(process.env.REACT_APP_API + `people/PeopleByParty?PartyId=${partyId}`,{                     
            headers: {'Accept':'*/*',
            'Content-Type':'application/json',
            'Mode': 'cors'}
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({guests:data});
        });                
    }  

    componentDidMount(){        
        this.refreshList(this.props.parid)
    }    

    render(){
        const {guests} = this.state;        
        return(            
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.parname} Guest List
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={8}>
                            <Form>
                                <Form.Group controlId="PartyName">                                      
                                    <Table class='mt-4' striped bordered hover size="sm">
                                        <thead>
                                            <tr>                        
                                            <th>Guest Name</th>
                                            <th>Email</th>
                                            <th>Drink</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {guests.map(guest=>
                                            <tr key={guest.PersonId}>                                
                                                <td>{guest.FullName}</td>
                                                <td>{guest.Email}</td>
                                                <td>{guest.DrinkName}</td>                                                                                                              
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