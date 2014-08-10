TrelloClone.Views.BoardTile = Backbone.View.extend({
  template: JST['board/board_tile'],
  className: "tile col-sm-3",
  
  initialize: function (options) {
  },

  destroyList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  render: function () {
    var renderedContent = this.template()({ card: this.model });
    this.$el.html(renderedContent);
    // set the data-id of the card so we can fetch it when we need to open the edit modal.
    this.$el.attr("data-id", this.model.id )    
    return this;
  }
});
