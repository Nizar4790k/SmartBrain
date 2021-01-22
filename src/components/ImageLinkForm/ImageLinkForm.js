import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () =>{
    return(
        <div>
            <p className="f5">
                {'This Magic Brain will dettect faces in your pictures. Give it a try'}
            </p>

            <div className='center'>
                <div className=' form center pa4 br5 shadow-5'>
                <input type='text' className='f4 pa2 w-70 center'></input>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button> 

                </div>
                
            </div>

        </div>
    );
}

export default ImageLinkForm;