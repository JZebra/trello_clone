TrelloClone.Views.NewBoard = Backbone.View.extend({
  template: JST['new_board'],
  
  events: {
    "submit form" : "createBoard"
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },
  
  createBoard: function (event) {
    event.preventDefault();
    var form = $(event.target);
    
    var board = new TrelloClone.Models.Board(form.serializeJSON());
    board.save();
    TrelloClone.Collections.boards.add(board);
    
  }
  
});