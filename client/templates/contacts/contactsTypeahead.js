Template.contactTypeahead.helpers({
  contacts: function() {
    return Contacts.find().fetch().map(function(it){ return it.searchOnMe; });
  }
});
