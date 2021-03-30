import React,{Component} from 'react';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import {AddPersonModal} from './AddPersonModal'
import {ViewPartiesModal} from './ViewPartiesModal'

export class People extends Component{

    constructor(props){
        super(props);
        this.state={people:[], addModalShow:false, showPartiesModal:false, showTable:false}     
    }

    refreshList(){
        fetch(process.env.REACT_APP_API + 'people/getallpeople',{                     
            headers: {'Accept':'*/*',
            'Content-Type':'application/json',
            'Mode': 'cors'}})
        .then(response=>response.json())
        .then(data=>{
            this.setState({people:data});
        });
    }

    showParties=(PersonId, PersonName)=>{        
        this.setState({perid:PersonId})
        this.setState({pername:PersonName})
        this.setState({showPartiesModal:true});
    }

    componentDidMount(){
        this.refreshList();
    }

    render(){
        const {people, perid, pername} = this.state;
        let reload=()=>window.location.reload();
        let addModalClose=()=>this.setState({addModalShow:false});
        let showModalClose=()=>this.setState({showPartiesModal:false});
        return(
            <div >
                <br/>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            + New
                    </Button>                   
                    <AddPersonModal show={this.state.addModalShow}
                     onHide={addModalClose} onHide={reload}></AddPersonModal>
                </ButtonToolbar>
                <br/>
                <Table class='mt-4' striped bordered hover size="sm">
                    <thead>
                        <tr>                        
                        <th>Full Name</th>
                        <th>Email</th>                        
                        <th>Parties List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(per=>
                            <tr key={per.PersonId}>                                
                                <td>{per.FullName}</td>
                                <td>{per.Email}</td>                                
                                <td>
                                <ButtonToolbar>
                                    <Button variant="info"
                                        onClick={()=>this.showParties(per.PersonId, per.FullName)}>
                                            View
                                        </Button>  
                                </ButtonToolbar>
                                </td>
                            </tr>
                        )}                            
                    </tbody>
                </Table>
                {this.state.showPartiesModal && <ViewPartiesModal 
                            show={this.state.showPartiesModal}
                            onHide={showModalClose}
                            perid={perid}
                            pername={pername}
                            />}
            </div>
        )
    }
}