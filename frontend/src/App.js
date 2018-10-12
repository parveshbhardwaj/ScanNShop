import React, { Component } from 'react';
import './App.css';


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: '',docType:'',resData:[]};
  }

  _handleSubmit(e) {
    e.preventDefault();
    
    console.log("doc type before submit",this.state.docType);
    
    this.setState({
      resData: []   
    });

    var payload = {
      imageName: this.state.file.name,
      imageType: this.state.docType     
    };

  fetch( "http://localhost:8880", {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',  
      
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(responseJson => {  
    this.setState({resData:responseJson});
  console.log(responseJson)});
   
}

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let filePath = URL.createObjectURL(e.target.files[0]);

    reader.onloadend = () => {
      this.setState({
        file: file,
        filePath: filePath,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  _handleChange(e) {
    
    let selValue = e.target.value; 
    this.setState({
      docType : selValue    
    });
      
    }

  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    let extractContent = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} width="380" height="380" alt="preview"/>);
      extractContent =(<div className="form-group"><button className="btn btn-success" type="submit" 
      onClick={(e)=>this._handleSubmit(e)}>Extract Content</button></div>);
    } else {
      imagePreview = (<div className="image-preview">Image Preview</div>);
      extractContent =(<span/>);
    }
    let{resData} = this.state;   
    let cardTable = null;
    let custTable = null;
    let num=0; 
    debugger;  
    if(resData && typeof resData.cust_info != 'undefined'){
      custTable=(<div className="container">          
           <div className="container">
              <div className="row">
                  <h5>Customer Information</h5>
              </div>                
              <div className="row">
                  <table className="table-bordered">
                    <tbody>
                    {
                      Object.keys(resData.cust_info).map(
                      function(eachKey) {
                        return(
                        
                          <tr key={eachKey}>
                            <td>{eachKey}</td>                      
                            <td>{resData.cust_info[eachKey]}</td>                      
                          </tr>
                        
                        )
                      }
                      )
                    }
                    </tbody>
                  </table> 
              </div>
              <br/>
              <br/>                
            </div>    
       </div>
      );
    }
    else{
      custTable =(<span/>);
    }
    if(resData && typeof resData.card_info != 'undefined'){
      cardTable=(<div className="container">          
        {                          
          resData.card_info.map( function(eachObj) {                         
            return(                 
              <div className="container">
                <div className="row">
                    <h5>Card Details # {num=num+1}</h5>
                </div>                
                <div className="row">
                    <table className="table-bordered">
                      <tbody>
                      {
                        Object.keys(eachObj).map(
                        function(eachKey) {
                          return(
                          
                            <tr key={eachKey}>
                              <td>{eachKey}</td>                      
                              <td>{eachObj[eachKey]}</td>                      
                            </tr>
                          
                          )
                        }
                        )
                      }
                      </tbody>
                    </table> 
                </div>
                <br/>
                <br/>                
              </div>            
            )
          })
        }       
        </div>
        );
    }
    else{
      cardTable =(<span/>);
    }

    return (  
    <div>  
      <div className="container-fluid">
          <div className="row">
          <div className="col-sm-12"> 
            <header className="App-header">         
              <h1 className="App-title">Metro Scan and Shop Application</h1>
            </header>
          </div> 
        </div>  
      </div>  
      <br/>
      <br/>
      <div className="container">  
       
        <div className="row">
          <div className="col-sm-7">{imagePreview}</div>
          <div className="col-sm-3">
              <div><br/><br/></div>
              <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <div className="form-group">
                    <input type="file" className="form-control btn-success" data-icon="false" onChange={(e)=>this._handleImageChange(e)} />
                  </div>
                  <br/> 
                  <div className="form-group">
                      <label htmlFor="docType">
                        <b>Document Type :</b>
                        </label>
                        <select className="form-control" id="docType" value={this.state.docType} onChange={(e)=>this._handleChange(e)} >
                          <option value=""></option>
                          <option value="reg">Registration</option>
                          <option value="fed">Feedback</option>
                        </select>                
                  </div>
                  <br/>
                  <br/>
                  {extractContent}
              </form>
            </div>
        </div>
        <br/>
        <br/>
        <div className="row">
          {custTable}
        </div>
        <div className="row">
          {cardTable}
        </div>
      </div>
      </div> 
    )
  }	
}

export default App;


