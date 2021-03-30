import {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddDrinkModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'drinks/AddDrink',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({                
                drinkName:event.target.DrinkName.value,                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);            
        },
        (error)=>{
            alert('Could not add drink');
        })
        event.target.DrinkName.value = '';        
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
                            Add Drink
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DrinkName">
                                        <Form.Label>Drink Name</Form.Label>
                                        <Form.Control type="text" name="DrinkName" required Placeholder="Type a Drink Name"/>
                                    </Form.Group>                                    
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Drink
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