import {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddGuestModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={drinks:[], people:[]};
    }

    handleSubmit(event){
        event.preventDefault();   
        {this.personchoice>0 && this.drinkchoice>0 &&   
        fetch(process.env.REACT_APP_API + 'party/AddPersonToParty',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({                
                PartyId:this.props.parid,
                PersonId:this.personchoice,
                DrinkId:this.drinkchoice             
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Could not add guest to party');
        })
        }        
        this.personPicker=''
        this.drinkchoice=''
    }

    drinksList(){
        fetch(process.env.REACT_APP_API + 'drinks/getalldrinks',{                     
            headers: {'Accept':'*/*',
            'Content-Type':'application/json',
            'Mode': 'cors'}})
        .then(response=>response.json())
        .then(data=>{
            this.setState({drinks:data});
        });
    }

    peopleList(){
        fetch(process.env.REACT_APP_API + 'people/getallpeople',{                     
            headers: {'Accept':'*/*',
            'Content-Type':'application/json',
            'Mode': 'cors'}})
        .then(response=>response.json())
        .then(data=>{
            this.setState({people:data});
        });
    }
    
    componentDidMount(){
        this.drinksList();
        this.peopleList();        
    }

    render(){
        const {drinks, people}=this.state
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
                            Add Guest to {this.props.parname}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>                                 
                                <Form.Group>
                                    <Form.Label>Select a Guest</Form.Label>
                                <Form.Control as="select" controlId="personPicker"
                                onChange={(e) => this.personchoice=e.target.value}
                                Placeholder="tester">
                                <option value=''> --Please Select-- </option>               
                                {people.map(per=>{
                                        return <option key={per.PersonId} value={per.PersonId}>{per.FullName}</option>})}
                                </Form.Control> 
                                </Form.Group>
                                <Form.Group>
                                <Form.Label>Select a Drink</Form.Label>
                                <Form.Control as="select" controlId="drinkPicker"
                                onChange={(e) => this.drinkchoice=e.target.value}
                                Placeholder="tester">
                                    <option value=''> --Please Select-- </option>            
                                {drinks.map(drink=>{
                                        return <option key={drink.DrinkId} value={drink.DrinkId}>{drink.DrinkName}</option>})}
                                </Form.Control>  
                                </Form.Group>                                    
                                <Form.Group>
                                    <Button variant="primary" type="submit">
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