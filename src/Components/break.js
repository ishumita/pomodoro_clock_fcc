import React from 'react'
import moment from 'moment'

const Break =({
    breakLength,
    incrementBreakLengthByOne,
    decrementBreakLengthByOne
})=> {


    const breakLengthInMinutes = moment.duration(breakLength, 'seconds').asMinutes()
    return (
        <div>
             <p id="break-label">Break</p>
             <div id="break-length">{breakLengthInMinutes}</div>
             <button id="break-decrement" onClick={decrementBreakLengthByOne}>-</button>
             <button id="break-increment" onClick={incrementBreakLengthByOne}>+</button>
             
             

        </div>
       
    )
}

export default Break