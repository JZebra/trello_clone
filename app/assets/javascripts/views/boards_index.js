TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards_index"],
  
  events: {
    "click button.delete" : "destroyBoard"
  },
  
  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);

    var newBoardView = new TrelloClone.Views.NewBoard();
    this.addSubview(".board-new", newBoardView.render());
    
    var boards = TrelloClone.Views.Board.
    this.addSubview(".boards", )
  },
    
  render: function () {
    var renderedContent = this.template( {collection: this.collection} );

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
  
});