TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: function () {
    return this.open ? JST['edit_list'] : JST["list_show"];
  },
  
  events: {
    "dblclick h3" : "beginEditing",
    "submit form" : "endEditing",
    "click button.delete" : "destroyList"
  },
  
  initialize: function (options) {
    this.open = false;
  },
  
  beginEditing: function () {
    this.open = true;
    this.render();
  },
  
  endEditing: function (event) {
    event.preventDefault();
    this.open = false;
    
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params["list"]);
    this.model.save();
    
    this.render();
  },
  
  destroyList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  render: function () {
    var renderedContent = this.template()({ list: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
