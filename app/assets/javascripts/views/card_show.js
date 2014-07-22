TrelloClone.Views.Card = Backbone.CompositeView.extend({
  template: function () {
    return this.open ? JST['card/card_form'] : JST['card/card_show'];
  },
  
  className: "col-sm-6",
  
  events: {
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
    this.model.set(params["card"]);
    this.model.save();
    
    this.render();
  },
  
  destroyList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  render: function () {
    var renderedContent = this.template()({ card: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
