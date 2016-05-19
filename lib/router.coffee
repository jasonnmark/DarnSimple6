Router.configure
  layoutTemplate: "layout"
  loadingTemplate: "loading"
  notFoundTemplate: "notFound"
  waitOn: ->
    [ Meteor.subscribe("notes"), Meteor.subscribe("contacts"), Meteor.subscribe("userProfile") ]


# Default is to go to the dashboard, but if the user isn't logged in they will be sent to the home page
requireLogin = ->
  unless Meteor.user()
    if Meteor.loggingIn()
      @render @loadingTemplate
    else
      if @url is "/"
        @render "home"
      else
        @render "accessDenied"
  else
    @next()

Router.onBeforeAction requireLogin,
  except: [ "/", "compare", "tour", "home" ]

Router.route "/",
  name: "dashboard"

Router.route "compare",
  name: "compare"

Router.route "tour",
  name: "tour"

Router.route "home",
  name: "home"

Router.route "preferences",
  name: "preferences"

Router.route "contactAdd",
  name: "contactAdd"

