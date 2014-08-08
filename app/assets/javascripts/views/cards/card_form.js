TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST['card/new_card_form'],
  
  events: {
    "submit form" : "createCard"
  },
  
  initialize: function (options) {
    this.list = options.list;
    if (!this.model) {
      this.model = new TrelloClone.Models.Card({title: "New Card"});
    }
  },
  
  render: function() {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  
  createCard: function (event) {
    var view = this;
    event.preventDefault();

    var params = $(event.target).serializeJSON();
    var card = new TrelloClone.Models.Card(params["card"]);
    card.set("list_id", this.list.id);
    card.save({},{
      success: function(){
        view.list.cards().add(card);
      },
      error: function(){
        return "error saving card";
      },
    });

  }
  
});