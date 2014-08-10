TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['board/boards_index'],
  
  events: {
    "click button.delete" : "destroyBoard"
  },
  
  destroyBoard: function(event) {
    this.model.destroy();
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);

    var newBoardView = new TrelloClone.Views.NewBoard();
    this.addSubview(".board-new", newBoardView.render());
  },
    
  render: function () {
    var content = this.template( {collection: this.collection} );

    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
  
});