import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import  Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import './App.css';


const app = new Clarifai.App({
  apiKey: 'c6b1f13df2fa463f9db6b8ea58d42b53'
 })

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



class App extends Component {
  
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:''
    }
  }
  
  onInputChange = (event) =>{
    this.setState({input:event.target.value}); 
  }
  

  onButtonSubmit = () =>{
     this.setState({imageUrl:this.state.input});
     

    app.models.
    predict(Clarifai.FACE_DETECT_MODEL,"https://hdwallpaperim.com/wp-content/uploads/2017/08/22/169516-women-model-brunette-red_lipstick-green_eyes-face.jpg")
    .then(

      function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err){
        
      }
    );
  }

  render() {
    return (
      <div className="App">
            <Particles className='particles' 
                params={particlesOptions} />

        <Navigation/>
        <Logo/>
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          
        <FaceRecognition  imageUrl={this.state.imageUrl}/> 
      </div>
    );
  }
}

export default App;
