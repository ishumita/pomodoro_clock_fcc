import React from 'react'
import moment from 'moment'

const Session =({sessionLength,
     incrementSessionLengthByOne,
      decrementSessionLengthByOne})=> {


    const sessionLengthInMinutes = moment.duration(sessionLength, 's').asMinutes()
    return (
        <div>
             <p id="session-label">Session</p>
             <div id="session-length">{sessionLengthInMinutes}</div>
             <button id="session-decrement" onClick={decrementSessionLengthByOne}>-</button>
             <button id="session-increment" onClick={incrementSessionLengthByOne}>+</button>
             {/* <button id="start_stop"onClick={toggle}>{isActive? 'Pause':'Start'}</button>
             <button id="reset" onClick={reset}>reset</button>
             <div>
             <span id="timer-label">{minutes}</span>
             <span>:</span>
            <span>
                {seconds === 0
                ? "00"
                : seconds < 10 
                ? "0"+ seconds 
                : seconds }</span>
            </div> */}
            
        </div>
       
    )
}

export default Session

