Template.loggedInNavigation.events "click #logout": (e) ->
  Meteor.logout()

Template.loggedInNavigation.helpers reminderCount: ->
  
  # 		return 15;
  Notes.find(
    isItDone:
      $ne: true

    starred: true
  ).count()

