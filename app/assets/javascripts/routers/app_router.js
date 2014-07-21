TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    "" : "boardsIndex",
    "boards/:id" : "boardShow"
  },
  
  boardsIndex: function () {
    var boardsIndexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });
    
    TrelloClone.Collections.boards.fetch();
    
    this.$rootEl.html(boardsIndexView.render().$el);
  },
  
  boardShow: function (id) {
    var board = TrelloClone.Collections.boards.getOrFetch(id);
    var boardView = new TrelloClone.Views.Board({ model: board });
  
    this._swapView(boardView);
  },
  
  listShow: function (id) {
    var list = TrelloClone.Collections.lists.getOrFetch(id);
    var listShow = new TrelloClone.Views.List({ model: list });
    
    this._swapView(listView);
  },
  
  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }
    $("#main").html(newView.render().$el);
    this.currentView = newView;
  }
});