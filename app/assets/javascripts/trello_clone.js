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
