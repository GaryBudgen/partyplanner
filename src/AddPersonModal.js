import {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddPersonModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'people/AddPerson',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({                
                fullName:event.target.FullName.value,
                email:event.target.Email.value                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Unable to add person');
        })                

        event.target.FullName.value = ''
        event.target.Email.value  = ''
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
                            Add Person
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="FullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" name="PersonName" required Placeholder="Type Persons Name"/>
                                    </Form.Group>
                                    <Form.Group controlId="Email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" name="Email" required Placeholder="Email"/>
                                    </Form.Group>                                   
                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick="submit">
                                            Add Person
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

}