import {Component} from 'react';
import {Button, ButtonToolbar, Table} from 'react-bootstrap';
import {format} from 'date-fns'
import {AddPartyModal} from './AddPartyModal'
import {ViewGuestsModal} from './ViewGuestsModal'
import {AddGuestModal} from './AddGuestModal'

export class Party extends Component{

    constructor(props){
        super(props);
        this.state={parties:[], addModalShow:false, showGuestsModal:false}     
    }

    refreshList(){
        fetch(process.env.REACT_APP_API + 'party/getallparties',{                     
            headers: {'Accept':'*/*',
            'Content-Type':'application/json',
            'Mode': 'cors'}})
        .then(response=>response.json())
        .then(data=>{
            this.setState({parties:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    showGuests=(PartyId, PartyName)=>{        
        this.setState({parid:PartyId})
        this.setState({parname:PartyName})
        this.setState({showGuestsModal:true});
    }

    addGuest=(PartyId, PartyName)=>{
        this.setState({parid:PartyId})
        this.setState({parname:PartyName})       
        this.setState({addGuestModal:true});
    }
        
    reload=()=>window.location.reload();
    addModalClose=()=>this.setState({addModalShow:false});
    showModalClose=()=>this.setState({showGuestsModal:false});
    addGuestModalClose=()=>this.setState({addGuestModal:false});

    render(){
        const {parties, parid, parname} = this.state;       
        return(
            <div >
                <br/> 
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            + New
                    </Button>
                    <AddPartyModal show={this.state.addModalShow}
                     onHide={this.addModalClose} onHide={this.reload}></AddPartyModal>
                </ButtonToolbar> 
                <br/> 
                <Table class='mt-4' striped bordered hover size="sm">
                    <thead>
                        <tr>                        
                        <th>Party Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Guest List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parties.map(party=>
                            <tr key={party.PartyId}>                                
                                <td>{party.PartyName}</td>
                                <td>{party.Location}</td>                                
                                <td>{format(new Date(party.StartTime), "eeee, do MMM yyyy")}</td>
                                <td>{format(new Date(party.StartTime), "HH:mm a")}</td>
                                <td>
                                <ButtonToolbar>                                    
                                    <Button className='mx-2' variant="info"
                                    onClick={()=>this.showGuests(party.PartyId,party.PartyName)}>
                                            View
                                        </Button>
                                    <Button className='mx-2' variant="primary"
                                        onClick={()=>this.addGuest(party.PartyId,party.PartyName)}>
                                            + Add
                                        </Button>                            
                                </ButtonToolbar>
                                </td>
                            </tr>
                        )}                            
                    </tbody>
                </Table>
                {this.state.showGuestsModal && <ViewGuestsModal 
                                show={this.state.showGuestsModal}
                                onHide={this.showModalClose}
                                parid={parid}
                                parname={parname}
                                />} 
                {this.state.addGuestModal && <AddGuestModal 
                                show={this.state.addGuestModal}
                                onHide={this.addGuestModalClose}
                                parid={parid}
                                parname={parname}
                                />} 
            </div>
        )
    }
}