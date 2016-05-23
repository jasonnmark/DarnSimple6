var requireLogin;
Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  waitOn: function() {
    return [Meteor.subscribe("notes"), Meteor.subscribe("contacts"), Meteor.subscribe("userProfile")];
  }
});
requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      return this.render(this.loadingTemplate);
    } else {
      if (this.url === "/") {
        return this.render("home");
      } else {
        return this.render("accessDenied");
      }
    }
  } else {
    return this.next();
  }
};
Router.onBeforeAction(requireLogin, {
  except: ["/", "compare", "tour", "home"]
});
Router.route("/", {
  name: "dashboard"
});
Router.route("compare", {
  name: "compare"
});
Router.route("tour", {
  name: "tour"
});
Router.route("home", {
  name: "home"
});
Router.route("preferences", {
  name: "preferences"
});
Router.route("contactAdd", {
  name: "contactAdd"
});
Router.route("/notes/:tag", {
  name: "noteList",
  data: function() {
    return Notes.find({
      title: this.params.tag
    });
  }
});