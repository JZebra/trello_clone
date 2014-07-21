window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    new TrelloClone.Routers.AppRouter( {$rootEl: $('#main') });
    Backbone.history.start();
  }
};

// $(TrelloClone.initialize); We initialize in the root.html. This forces the user to be signed in before they can see the rest of the site.  
