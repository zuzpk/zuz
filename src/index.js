import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import appstore from "./redux/store";
import App from './App';
import reportWebVitals from './reportWebVitals';

window.Date.isLeapYear = function (year) { 
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
}

window.Date.getDaysInMonth = function (year, month) {
  return [31, (window.Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

window.Date.prototype.isLeapYear = function () { 
  return window.Date.isLeapYear(this.getFullYear()); 
}

window.Date.prototype.getDaysInMonth = function () { 
  return window.Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

window.Date.prototype.addMonths = function (value) {
  var n = this.getDate();
  this.setDate(1);
  this.setMonth(this.getMonth() + value);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
};

window.Date.prototype.getFormated = function(){
  var mm = this.getMonth() + 1,
  dd = this.getDate(),
  months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  hours = this.getHours(), minutes = this.getMinutes(), ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0"+minutes : minutes;
  return {
      day: dd < 10 ? "0"+dd : dd,
		  dayName: days[this.getDay()],
      month: mm < 10 ? "0"+mm : mm,
      monthName: months[this.getMonth()],
      year: this.getFullYear(),
      hours: hours,
      minutes: minutes,
      ampm: ampm,
      format: (dd < 10 ? "0" + dd : dd) + ' ' + months[this.getMonth()] + ' ' + this.getFullYear()
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appstore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
