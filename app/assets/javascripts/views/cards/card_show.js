TrelloClone.Views.Card = Backbone.CompositeView.extend({
  template: function () {
    return this.open ? JST['card/card_form'] : JST['card/card_show'];
  },
  className: "card",
  events: {
    "click span"    : "destroyCard"
  },
  
  destroyCard: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  render: function () {
    var renderedContent = this.template()({ card: this.model });
    this.$el.html(renderedContent);
    // set the data-id of the card for ord checking
    this.$el.attr("data-card-id", this.model.id )    
    return this;
  }
});
