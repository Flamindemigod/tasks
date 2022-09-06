import React from 'react'
import Day from './Day'
import moment from 'moment'
import { Box } from '@mui/material'

const Calender = ({ tasks, startDate, endDate, setStartDate, setEndDate }) => {
  const clonedStart = startDate.clone()
  return (
    <Box className="grid relative w-full" sx={{ gridTemplateColumns: "45px 1fr" }}>
      <Box sx={{ gridTemplateRows: "repeat(24, 60px)" }} className="grid">{[...Array(24).keys()].map(index => (<Box sx={{ transform: "translate(0, 27px)" }}>{`${!parseInt(index / 10) ? `0${index}` : index}:00`}</Box >))}</Box>

      <div className='grid grid-cols-7'>
        <div className='text-sm font-semibold lg:text-xl w-min lg:w-full'>{clonedStart.clone().weekday(0).format("DD")} Sun </div>
        <div className='text-sm font-semibold lg:text-xl w-min lg:w-full'>{clonedStart.clone().weekday(1).format("DD")} Mon </div>
        <div className='text-sm font-semibold lg:text-xl w-min lg:w-full'>{clonedStart.clone().weekday(2).format("DD")} Tue </div>
        <div className='text-sm font-semibold lg:text-xl w-min lg:w-full'>{clonedStart.clone().weekday(3).format("DD")} Wed </div>
        <div className='text-sm font-semibold lg:text-xl w-min lg:w-full'>{clonedStart.clone().weekday(4).format("DD")} Thus</div>
        <div className='text-sm font-semibold lg:text-xl w-min lg:w-full'>{clonedStart.clone().weekday(5).format("DD")} Fri </div>
        <div className='text-sm font-semibold lg:text-xl w-min lg:w-full'>{clonedStart.clone().weekday(6).format("DD")} Sat </div>
      </div>
      <Box className='absolute inset-0 top-10 lg:top-7 -z-10 grid grid-cols-1' sx={{ justifyItems: "end", gridTemplateRows: "repeat(24, 60px)" }}>
        {[...Array(24).keys()].map(
          index => (
            <Box className='border-black border border-x-0 text-sm' sx={{ width: "calc(100% - 45px)" }}></Box>
          )
        )}
      </Box>
      <Box className=" grid grid-cols-7 absolute inset-0 top-10 lg:top-7 left-11">
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
      </Box>
    </Box>
  )
}

export default Calender