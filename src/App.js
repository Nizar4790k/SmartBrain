import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import  Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import './App.css';




const particlesOptions = {
 particles:{
   number:{
     value: 50,
     density:{
       enable:true
     }
   }
 }
}


const initialState={
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    password:'',
    entries:0,
    joined:''
  }
}


class App extends Component {
  
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        password:'',
        entries:0,
        joined:''
      }
    }
  }

   loadUser = (data) =>
  {

    
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
  }});

  

  }
 

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    

    const image = document.getElementById('inputimage');
    const width = Number(image.width)
    const height = Number(image.height);
    
    console.log(width);
    console.log(height);
    
    return{
      leftCol:clarifaiFace.left_col * width,
      topRow:clarifaiFace.top_row * height,
      rigthCol: width - (clarifaiFace.right_col*width),
      bottomRow: height-(clarifaiFace.bottom_row* height)
    }

  }

  displayFaceBox = (box) =>{
   
    this.setState({box:box})
  }
  
  onInputChange = (event) =>{
    
    this.setState({input:event.target.value}); 
  }
  

  onPictureSubmit = () =>{
     this.setState({imageUrl:this.state.input});
     

     fetch('http://localhost:3001/imageUrl', {
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
             input:this.state.input
          })

      })
    .then(response => response.json())
    .then(response=>{
      if(response){
        fetch('http://localhost:3001/image', {
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
             id:this.state.user.id
          })

      }
        
        ).then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{entries:count}));
          }).catch(console.log);
      }

      this.displayFaceBox(this.calculateFaceLocation(response))
    
    
    })
    .catch(err=>console.log(err));
  }

  onRouteChange = (route) =>{
    
    if(route=='signout'){
      this.setState(initialState);
      this.onRouteChange('signin')
      return;
      
    }else if(route==='home'){
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  
  render() {

 const  {isSignedIn,imageUrl,route, box} = this.state;
    
    return (
      <div className="App">
            <Particles className='particles' 
                params={particlesOptions} />

      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
       {

        
         route==='home' ? 
         <div>
               <Logo />

                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
                <FaceRecognition imageUrl={imageUrl} box={box} />
            </div>   

            : (
               route === 'signin' && isSignedIn===false ?
                <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )   
       }
       
       
       
     
      </div>
    );
  }
}

export default App;
