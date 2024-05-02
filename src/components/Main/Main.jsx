import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets'
import'./Main.css'
import runChat from '../../config/IntelliBrains'
import ContextProvider, {Context} from '../../context/Context'


const Main = () => {
const{onSent,recentPrompt,showResult,loading,resultData,Input,setInput}=useContext(Context)
 const [listening, setListening] = useState(false);
const author="Ashish Dixit";
 const handleMicClick = () => {
    if (!listening) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function() {
            console.log('Speech recognition started');
            setListening(true);
        };

        recognition.onresult = function(event) {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            console.log(transcript);
            setInput(prevInput => prevInput + transcript);
        };

        recognition.start();
    } else {
        // Stop listening
        recognition.stop(); // Use recognition object to stop speech recognition
        setListening(false);
    }
};

const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
        // Call onSent function with the current input value
        onSent(Input);
    }
};


  return (
    <div className='main'>
    <div className="nav">
        <p>IntelliBrain</p>
        <img src={assets.user_icon} alt="" />
        </div>  
         <div className="main-container">
        
        {!showResult
        ?
         <>

<div className="greet">
        <p><span>Hello, Ashish</span></p>  
        <p>How Can I help you today?</p>  
        </div>    
          <div className="cards">
            <div onClick={()=>onSent("Recommend scenic stops for an upcoming road trip adventure.")} className="card">
                <p>"Recommend scenic stops for an upcoming road trip adventure."</p>
                <img src={assets.compass_icon}alt="" />
            </div>
            <div onClick={()=>onSent("Breifly summarize this concept : Green Infrastructure Planning") } className="card"> 
                <p>Breifly summarize this concept : Green Infrastructure Planning</p>
                <img src={assets.bulb_icon}alt="" />
            </div>
            <div onClick={()=>onSent("Generate ideas for team-building activities for our upcoming work retreat") } className="card">
                <p>Generate ideas for team-building activities for our upcoming work retreat</p>
                <img src={assets.message_icon}alt="" />
            </div>
            <div onClick={()=>onSent("Enhance code readability") }className="card">
                <p>Enhance code readability</p>
                <img src={assets.code_icon}alt="" />
            </div>
          </div>

         </>
         :<div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.star_icon}alt="" />
                {loading?<div className='loader'>
                <hr />
                <hr />
                <hr />
                </div>:
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
                
              
            </div>
        </div>

    }

      
           <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)}
                onKeyDown={handleInputKeyDown} // Add event listener for key down
                value={Input} type="text" placeholder='Enter a prompt here' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img onClick={()=>onSent({handleMicClick})} src= {assets.mic_icon}alt="" />
                    <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                </div>
            </div>
            <p className="bottom-info">
                IntelliBrain can make mistakes or display inaccurate info. Consider checking important information.
            </p>
             
            <div className="watermark">
            Made with <span role="img" aria-label="Heart">❤️</span> by {author}
           </div>

           </div>

         </div>     
    </div>
  )
}

export default Main