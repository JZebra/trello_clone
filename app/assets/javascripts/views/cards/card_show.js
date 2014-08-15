TrelloClone.Views.Card = Backbone.CompositeView.extend({
  template: function () {
    return this.open ? JST['card/card_form'] : JST['card/card_show'];
  },
  
  className: "card",
  
  initialize: function (options) {
    this.open = false;
  },

  beginEditing: function (event) {
    event.preventDefault();
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
    // set the data-id of the card so we can fetch it when we need to open the edit modal.
    this.$el.attr("data-id", this.model.id )    
    return this;
  }
});
