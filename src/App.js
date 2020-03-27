import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Break from './Components/break';
import Session from './Components/session';
import TimeLeft from './Components/timeLeft';

function App() {
  const audioElement = useRef(null);
  const [currentSessionType, setCurrentSessionType] = useState('Session'); // 'Session' or 'Break'
  const [intervalId, setIntervalId] = useState(null);
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setBreakLength] = useState(300);
  const [timeleft, setTimeLeft] = useState(sessionLength);

  // change timeLeft whenever sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  const incrementBreakLengthByOne=()=> {
    const newBreakLength = breakLength+60
    if(newBreakLength>3600) {
        setBreakLength(3600)
    }
    else {
      setBreakLength(breakLength+60)
    }
  }

  const decrementBreakLengthByOne=()=> {
      const newBreakLength = breakLength-60
      if(newBreakLength<=0) {
          setBreakLength(60)
      }
      else {
          setBreakLength(newBreakLength)
      }
      
  }
  
  const incrementSessionLengthByOne=()=> {
      const newSessionLength = sessionLength+60
      if(newSessionLength>3600) {
          setSessionLength(3600)
      }
      else {
          setSessionLength(newSessionLength)
      }

  }

  const decrementSessionLengthByOne=()=> {
      const newSessionLength = sessionLength-60
      if(newSessionLength<=0) {
          setSessionLength(60)
      }
      else {
          setSessionLength(newSessionLength)

      }
      
  }

  const isStarted = intervalId !== null;
  const handleStartStopClick=()=>{

      
    if(isStarted){
        clearInterval(intervalId)
        setIntervalId(null)
    }
    else {
        const newIntervalId = setInterval(()=>{
            setTimeLeft(prevTimeLeft => {
                const newTimeLeft = prevTimeLeft-1
                if(newTimeLeft>=0){
                    return prevTimeLeft-1
                }
                audioElement.current.play()
        
  
          setCurrentSessionType(currentSessionType=>{
              if (currentSessionType === 'Session') {
                  setTimeLeft(breakLength)
                  return 'Break'
              
              }
              if (currentSessionType === 'Break') {
                setTimeLeft(sessionLength)
                return 'Session'
              }
          })
            
            })
        },1000)
    setIntervalId(newIntervalId)    
    }
  
    }

  const handleResetButtonClick = () => {
    // reset audio
    audioElement.current.load();
    // clear the timeout interval
    clearInterval(intervalId);
    // set the intervalId null
    setIntervalId(null);
    // set the sessiontype to 'Session'
    setCurrentSessionType('Session');
    // reset the session length to 25 minutes
    setSessionLength(60 * 25);
    // reset the break length to 5 minutes
    setBreakLength(60 * 5);
    // reset the timer to 25 minutes (initial session length)
    setTimeLeft(60 * 25);
  };

  return(
    <div className="App">
      <Break
      id="breakLength"
      breakLength={breakLength}
      incrementBreakLengthByOne={incrementBreakLengthByOne}
      decrementBreakLengthByOne={decrementBreakLengthByOne} />
      <TimeLeft 
       timerLabel={currentSessionType} handleStartStopClick={handleStartStopClick} 
       startStopButtonLabel={isStarted?'Stop':'Start'} timeleft={timeleft}
        />
      <Session 
      sessionLength={sessionLength}
      incrementSessionLengthByOne={incrementSessionLengthByOne}
      decrementSessionLengthByOne={decrementSessionLengthByOne}/>
      <button id="reset" onClick={handleResetButtonClick}>Reset</button>
      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg"></source>
      </audio>
    
    </div>
  )
}

export default App;