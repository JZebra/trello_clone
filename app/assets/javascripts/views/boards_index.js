TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards_index"],
  
  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
    // this.listenTo();
    
    var newBoardView = new TrelloClone.Views.NewBoard();
    this.addSubview(".board-new", newBoardView.render());
  },
  
  render: function () {
    var renderedContent = this.template( {collection: this.collection} );
    
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  }
  
});