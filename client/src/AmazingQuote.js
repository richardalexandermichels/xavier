import React, {Component} from 'react';  

// Import Components 
import Input from './components/Input'; 
import Select from './components/Select';
import Button from './components/Button'

class AmazingQuote extends Component {
  constructor(props) {
    super(props);
    //AmazingQuote state resonsible for managing form data
    //newQuote object tracks all form field
    // other properties manage state of errors and selectable jet models
    this.state = {
      newQuote: {
        owner_name: '',
        model: '',
        seat_capacity: '',
        manufactured_date: '',
        purchase_price:'',
        broker_email: ''
      },

      modelOptions: ['Gulfstream G650', 'Cessna A-37 Dragonfly', 'Cessna Citation Encore'],
      errors: new Array(6).fill({name:'',reason:''}),
      premium: null,
      premium_err:null
    }
    //binding correct this context to class methods
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this)
    this.getError = this.getError.bind(this);
  }
  renderPremiumErr(pErr,key) {
    return (
      <h2 key={key} className="header2">
        {pErr}
      </h2>
    );
  }

  handleFormSubmit(e) {
    // Form submission logic
    e.preventDefault();
    let quoteData = this.state.newQuote;
    //CORS setting on external api suggests usage requested by server rather than browser
    //decided to create dedicated express API server to call amazing quote api
    fetch('http://localhost:5000/api/amazing_quote', {
        method: "POST",
        body: JSON.stringify(quoteData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" , data);
          //Based of API response examples can check is res data has errors property
          //then iterate over errors, and check returned error types and set component 
          //state reflect detected errors
          if(!!data.errors){
            for (let i = 0; i < data.errors.length;i++) {
              if (data.errors[i].type === 'validation') {
                this.setState({
                  errors: data.errors[i].reasons
                });
              }
              if (data.errors[i].type === 'underwriting') {
                this.setState({
                  premium_err: data.errors[i].reasons
                });
              }
            }
            //errors must update state to have no premium
            this.setState({
              premium: null
            });
          }else{
            //on successful call to api with premium value change AmazingQuote component state
            //to render premium value
            this.setState({
              premium: data.data.annual_premium.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }),
              errors: new Array(6).fill({name:'',reason:''}),
              premium_err: null
            });
          }
          
        })
    })
  }

  //just a convienient button
  handleClearForm(e) {
    // Logic for resetting the form
    e.preventDefault();
    this.setState({
       newQuote: {
         owner_name: '',
         model: '',
         seat_capacity: '',
         manufactured_date: '',
         purchase_price: '',
         broker_email: ''
       },
    })
  }

  handleInput(e) {
     let value = e.target.value;
     let name = e.target.name;
     if (name === 'seat_capacity' || name === 'purchase_price') {
        value = +value;
     }
     this.setState( prevState => {
       //spread syntax used here create new state, ensuring all previous state values
       //that are unaffected by this input are carried forward.
        return { 
           newQuote : {
                    ...prevState.newQuote, [name]: value
                   }
        }
     }//, () => console.log(this.state.newQuote)
     )
 }
      
 getError(field){
    for(let i = 0; i < this.state.errors.length; i++){
      if(this.state.errors[i].name === field){
        return this.state.errors[i].reason
      }
    }
 }
 //component property and state based form implementation uses custom input components made
  render() {
    return (
      <div className="form-container">
        <form className="quote-form" onSubmit={this.handleFormSubmit}>
        <div className="input-fields">
        {/* TODO: make array map of inputs */}
          <Input type={'text'}
                title= {'Owner Name'} 
                name= {'owner_name'}
                value={this.state.newQuote.owner_name} 
                placeholder = {'Enter your name'}
                handleChange = {this.handleInput}
                error = {this.getError('owner_name')}
                /> {/* Name of the user */}
          <Select title={'Jet Model'}
                  name={'model'}
                  options = {this.state.modelOptions} 
                  value = {this.state.newQuote.model}
                  placeholder = {'Select Jet Model'}
                  handleChange = {this.handleInput}
                  error = {this.getError('model')}
                /> { /*  model */ }
          <Input type={'number'}
                title= {'Seat Seat Capacity'} 
                name= {'seat_capacity'}
                value={this.state.newQuote.seat_capacity} 
                handleChange = {this.handleInput}
                error = {this.getError('seat_capacity')}
                /> {/* seat_capacity */}
          <Input type={'date'}
                title= {'Manufactured Date'} 
                name= {'manufactured_date'}
                value={this.state.newQuote.manufactured_date} 
                handleChange = {this.handleInput}
                error = {this.getError('manufactured_date')}
                /> { /* manufactured_date */ }
          <Input type={'number'}
                title= {'Purchase Price'} 
                name= {'purchase_price'}
                value={this.state.newQuote.purchase_price} 
                handleChange = {this.handleInput}
                error = {this.getError('purchase_price')}
                /> { /* purchase_price */ }
          <Input type={'text'}
                title= {'Broker Email'} 
                name= {'broker_email'}
                value={this.state.newQuote.broker_email} 
                placeholder = {'example@email.com'}
                handleChange = {this.handleInput}
                error = {this.getError('broker_email')}
                /> { /* broker email */ }
          </div>
          <div className="form-buttons">
            <Button title={'Submit'}
                  action={this.handleFormSubmit}
                  /> { /*Submit */ }
            <Button title={'Clear Form'}
                  action={this.handleClearForm}
                  /> {/* Clear the form */}
          </div>
        </form>
        <div className="premium-container">
          <h2 className="header2">
            {!!this.state.premium ? "PREMIUM:":null}
          </h2>
          <span className="premium"> {this.state.premium}</span>
        </div>
        <div>
          <h2 className="header2">
            {!this.state.premium_err ? null : "WE'RE SORRY:"}
          </h2>
          {!this.state.premium_err ? null : this.state.premium_err.map((err,idx)=>this.renderPremiumErr(err,idx))}
        </div>
      </div>
    );
  }
}
export default AmazingQuote;
