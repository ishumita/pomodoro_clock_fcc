import React from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

const TimeLeft = ({timeleft, startStopButtonLabel, timerLabel, handleStartStopClick}) => {

 
    const formattedTimeLeft = moment.duration(timeleft,'s').format('mm:ss', {trim:false})
return(
    <div>
        <p id="timer-label">{timerLabel}</p>
        <div id="time-left">{formattedTimeLeft} </div>

<button id="start_stop" onClick={handleStartStopClick}>{startStopButtonLabel}</button>
    </div>
    
)}

export default TimeLeft