Template.noteItem.events
  "click .toggleIsItDone": ->
    Notes.update @_id,
      $set:
        isItDone: not @isItDone


  "click .delete": (e) ->
    e.preventDefault()
    
    # 		if (confirm("Do you want to perminently delete this item? It can not be recovered?")) {
    currentNoteId = @_id
    Notes.remove currentNoteId
    Router.go "dashboard"

  
  # 		}
  "click #edit": (e, t) ->
    Session.set "target" + t.data._id, true

  "submit form": (e) ->
    e.preventDefault()
    currentNoteId = @_id
    noteProperties = title: $(e.target).find("[name=title]").val()
    Notes.update currentNoteId,
      $set: noteProperties
    , (error) ->
      if error
        
        # display the error to the user
        throwError error.reason
      else
        Router.go "dashboard",
          _id: currentNoteId



  "click .noteStar": ->
    Notes.update @_id,
      $set:
        starred: not @starred


Template.noteItem.helpers
  dateColor: ->
    if simpleDate(@dueDate) < simpleDate(new Date())
      "overdue"
    else
      "today"  if simpleDate(@dueDate) is simpleDate(new Date())

  daysFromNow: ->
    return daysAgo(@dueDate)  if @dueDate

