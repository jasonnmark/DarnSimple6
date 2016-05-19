Meteor.publish "notes", ->
  Notes.find()

Meteor.publish "userProfile", ->
  UserProfile.find()

Meteor.publish "contacts", ->
  Contacts.find()

