import React from 'react'
import Day from './Day'
import moment from 'moment'

const Calender = ({ tasks, startDate, endDate, setStartDate, setEndDate }) => {
  const clonedStart = startDate.clone()
  return (
    <div className='grid grid-cols-7'>
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thus</div>
      <div>Fri</div>
      <div>Sat</div>
      {/* {currentDate.toString()} */}
      {[...Array(7).keys()].map(index => {
        const currentDate = clonedStart.clone().add(index, "d").toString()
        return (
          <Day
            key={index}
            day={currentDate}
            tasks={tasks.filter(task => {
              if ((moment(task.startDate).isBetween(currentDate, moment(currentDate).clone().add(1, "d"), "day", "[)")) || (moment(task.endDate).isBetween(currentDate, moment(currentDate).clone().add(1, "d"), "day", "[)")) || (moment(currentDate).isBetween(moment(task.startDate), moment(task.endDate), "day", "[]"))) {
                return true
              }
            })}
          />
        )
      })}
    </div>
  )
}

export default Calender