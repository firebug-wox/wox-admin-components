import React from 'react';
import { render } from 'react-dom';
import WoxDateRule from './src/index';
const dateRule = {
  endDate : "",
  excludeDates : null,
  id : "",
  includeDates : null,
  startDate : "",
  type : 1,
  weekDays :[]
}

render(
  <WoxDateRule
    total = {1}
    num = {0}
    dateRule = {dateRule}
    dateExpressions = {[dateRule]}
    handleCallBack = {val => {console.log(val)}}
   />,
  document.getElementById('app')
);
