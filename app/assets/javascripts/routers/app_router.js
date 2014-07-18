TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    "" : "boardsIndex",
    "board/:id" : "boardShow"
  },
  
  boardsIndex: function () {
    var boardsIndexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });
    
    TrelloClone.Collections.boards.fetch();
    
    this.$rootEl.html(boardsIndexView.render().$el);
  },
  
  boardShow: function (id) {}
});