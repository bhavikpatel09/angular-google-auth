import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AfService {
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    debugger;
  }

  loginWithGoogle() {
    debugger;
    const provider = new firebase.auth.GoogleAuthProvider();
    debugger;
    this.afAuth.auth.signInWithPopup(provider).then(function (result) {
      debugger;
      var token = result.credential["accessToken"];
      localStorage.setItem("authToken",token);
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
  }

  logout() {
    localStorage.clear();
    this.afAuth.auth.signOut();
  }
}