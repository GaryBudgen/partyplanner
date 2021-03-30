import {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddPartyModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'party/AddParty',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({                
                PartyName:event.target.PartyName.value,
                Location:event.target.Location.value,
                StartTime:event.target.StartDate.value + ' ' + event.target.StartTime.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Unable to add party');
        })             
        
        event.target.PartyName.value = ''
        event.target.Location.value = ''
        event.target.StartDate.value = ''
        event.target.StartTime.value = ''        
    }

    render(){
        return(
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add New Party
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="PartyName">
                                        <Form.Label>Party Name</Form.Label>
                                        <Form.Control type="text" name="PartyName" required Placeholder="Type a Party Name"/>
                                    </Form.Group>
                                    <Form.Group controlId="Location">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="text" name="Location" required Placeholder="Type a Location"/>
                                    </Form.Group>
                                    <Form.Group controlId="StartDate">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control type="date" name="StartDate" required Placeholder="StartDate"/>                                        
                                    </Form.Group>
                                    <Form.Group controlId="StartTime">
                                    <Form.Label>Start Time</Form.Label>
                                        <Form.Control type="time" componentClass="select" name="StartTime" required defaultvalue='12:00'/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Party
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>                            
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="btnClose" variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}