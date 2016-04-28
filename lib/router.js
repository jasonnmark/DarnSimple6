Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('notes'), 
	Meteor.subscribe('contacts')];
  }

});

// Default is to go to the dashboard, but if the user isn't logged in they will be sent to the home page
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
	    if (this.url === '/'){
 			this.render('home');
 		} else {
 		 	this.render('accessDenied');
 		}
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {except: ['/','compare','tour','home']});


Router.route('/', {name: 'dashboard'});
Router.route('compare', {name: 'compare'});
Router.route('tour', {name: 'tour'});
Router.route('home', {name: 'home'});
Router.route('preferences', {name: 'preferences'});
Router.route('contactAdd', {name: 'contactAdd'});
