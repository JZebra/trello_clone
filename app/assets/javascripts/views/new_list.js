TrelloClone.Views.NewList = Backbone.View.extend({
  template: JST['new_list'],
  
  events: {
    "submit form" : "createList"
  },
  
  initialize: function (options) {
    this.board_id = options.board_id;
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },
  
  createList: function (event) {
    var view = this;
    event.preventDefault();
    
    var params = $(event.target).serializeJSON();
    var list = new TrelloClone.Models.List(params["list"]);
    list.set("board_id", this.board_id);
    list.save();
    TrelloClone.Collections.lists.add(list);
  }
  
});