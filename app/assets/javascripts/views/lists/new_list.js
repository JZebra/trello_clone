TrelloClone.Views.NewList = Backbone.View.extend({
  template: JST['list/list_new'],
  
  events: {
    "submit form"           : "createList",
    "focus .new-list-form"   : "showButton",
  },
  
  initialize: function (options) {
    this.board = options.board;
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  showButton: function() {
    $(event.target).siblings('.btn').show();
  },

  createList: function (event) {
    event.preventDefault();
    var view = this;

    var params = $(event.target).serializeJSON();
    var list = new TrelloClone.Models.List(params["list"]);
    list.set("board_id", this.board.id);
    list.save({},{
      success: function(){
        view.board.lists().add(list);
      },
      error: function(){
        console.log("did not save list")
      },
    });

  }
  
});