TrelloClone.Views.NewBoard = Backbone.View.extend({
  template: JST['board/board_new'],
  className: 'row',
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
    board.save({}, {
      success: function () {
        TrelloClone.Collections.boards.add(board);
        Backbone.history.navigate("#/boards/" + board.id, { trigger: true });
      }
    }); 
  }
  
});