import {Component} from 'react';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import {AddDrinkModal} from './AddDrinkModal'

export class Drinks extends Component{

    constructor(props){
        super(props);
        this.state={drinks:[], addModalShow:false}     
    }

    refreshList(){
        fetch(process.env.REACT_APP_API + 'drinks/getalldrinks',{                     
            headers: {'Accept':'*/*',
            'Content-Type':'application/json',
            'Mode': 'cors'}})
        .then(response=>response.json())
        .then(data=>{
            this.setState({drinks:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    render(){
        const {drinks} = this.state;
        let reload=()=>window.location.reload();
        let addModalClose=()=>this.setState({addModalShow:false});
        return(
            <div >
                <br/>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            + New
                    </Button>                    
                    <AddDrinkModal show={this.state.addModalShow}
                     onHide={addModalClose} onHide={reload}></AddDrinkModal>
                </ButtonToolbar>  
                <br/>
                <Table class='mt-4' striped bordered hover size="sm">
                    <thead>
                        <tr>                        
                        <th>Drink</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {drinks.map(drink=>
                            <tr key={drink.DrinkId}>                                
                                <td>{drink.DrinkName}</td>                                
                            </tr>
                        )}                            
                    </tbody>
                </Table>
            </div>
        )
    }
}