import { Component, OnInit } from '@angular/core';
import { AfService } from '../providers/af.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from 'ng-fullcalendar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  user: Observable<firebase.User>;
  userDetail: firebase.User;
  isLoggedin: boolean = false;
  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    debugger;
    if (this.user) {
      this.isLoggedin = true;
    }
  }
  isShowCalendar: boolean = false;
  eventList: any[];
  options: OptionsInput;
  eventsModel: any;

  ngOnInit() {
    this.generateData();    
  }
  generateData() {
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();

    this.eventList = [{
      title: 'All Day Event',
      start: new Date(y, m, d - 12)
    },
    {
      title: 'Long Event',
      start: new Date(y, m, d - 8),
      end: new Date(y, m, d - 5),
      className: 'fc-event-warning'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: new Date(y, m, d - 6, 16, 0)
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: new Date(y, m, d + 1, 16, 0),
      className: 'fc-event-success',
    },
    {
      title: 'Conference',
      start: new Date(y, m, d - 4),
      end: new Date(y, m, d - 2),
    },
    {
      title: 'Meeting',
      start: new Date(y, m, d - 3, 10, 30),
      end: new Date(y, m, d - 3, 12, 30),
      className: 'fc-event-danger'
    },
    {
      title: 'Lunch',
      start: new Date(y, m, d - 3, 12, 0),
      className: 'fc-event-info'
    },
    {
      title: 'Meeting',
      start: new Date(y, m, d - 3, 14, 30),
      className: 'fc-event-dark'
    },
    {
      title: 'Happy Hour',
      start: new Date(y, m, d - 3, 17, 30)
    },
    {
      title: 'Dinner',
      start: new Date(y, m, d - 3, 20, 0)
    },
    {
      title: 'Birthday Party',
      start: new Date(y, m, d - 2, 7, 0)
    },
    {
      title: 'Background event',
      start: new Date(y, m, d + 5),
      end: new Date(y, m, d + 7),
      rendering: 'background'
    },
    {
      title: 'Click for Google',
      url: 'http://google.com/',
      start: new Date(y, m, d + 13)
    }];




    this.options = {
      editable: true,
      events: this.eventList,
      // events: [{
      //   title: 'Long Event',
      //   start: this.yearMonth + '-07',
      //   end: this.yearMonth + '-10'
      // }],
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        },
        month: {
          text: 'Month',
          click: function () {
            // this.fullcalendar.calendar.changeView('dayGridMonth');
          }
        },
        week: {
          text: 'Week',
          click: function () {
            var calendarEl = document.getElementById('calendar');
            // this.fullcalendar.calendar.changeView('listWeek');
          }
        },
        day: {
          text: 'Day',
          click: function () {
            // this.fullcalendar.calendar.changeView('dayGridWeek');
          }
        }
      },
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek'
      },
      plugins: [dayGridPlugin, interactionPlugin]
    };

  }

  eventClick(model) {
    debugger;
    // dayGridMonth
    //dayGridWeek
    //resourceTimeline
    //resourceTimeGridDay
    // this.fullcalendar.calendar.changeView('dayGridWeek');
    console.log(model);
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model);
  }
  updateEvents() {
    this.eventsModel = [{
      title: 'Updaten Event',
      start: this.yearMonth + '-08',
      end: this.yearMonth + '-10'
    }];
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }

  login() {
    this.loginWithGoogle();
  }
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((result) => {

      debugger;
      var token = result.credential["accessToken"];
      localStorage.setItem("authToken", token);
      // this.isLoggedin = true;
      var user = result.user;
      this.isLoggedin = true;
      this.userDetail = result.user;

    }).catch(function (error) {

      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  logout() {
    localStorage.clear();
    this.isLoggedin = false;
    this.afAuth.auth.signOut();
  }
  // checkLoginStatus() {
  //   debugger;
  //   if (this.user != undefined && this.user["uid"] == undefined)
  //     return false;
  // }

}

