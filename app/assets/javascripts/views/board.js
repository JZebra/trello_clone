TrelloClone.Views.Board = Backbone.CompositeView.extend({
  template: JST["board_show"],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    return this;  
  }
  
});