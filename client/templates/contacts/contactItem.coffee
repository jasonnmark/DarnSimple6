Template.contactItem.events
  'click .delete': (e) ->
    e.preventDefault()
    # 		if (confirm("Do you want to perminently delete this item? It can not be recovered?")) {
    currentContactId = @_id
    Contacts.remove currentContactId
    Router.go 'dashboard'
    # 		}
    return
  'click .contactStar': ->
    Contacts.update @_id, $set: starred: !@starred
    return
  'click .socialStar': ->
    Contacts.update @_id, $set: starred: false
    # 	   	console.log("star clicked");
    console.log this
    console.log @starred
    return

###
Template.form.events({
	'change update[name=firstName]': function(event, contactItem){
		Contacts.update(this._id, {
			$set: {searchOnMe: "jason wuz here"}
	   	});
	   	alert("hey!");
	}
});
###

Template.contactItem.helpers socialIcon: ->
  switch @type
    when 'Twitter'
      return 'fa-twitter'
    when 'Facebook'
      return 'fa-facebook'
    when 'LinkedIn'
      return 'fa-linkedin'
    when 'Instagram'
      return 'fa-instagram'
  return

