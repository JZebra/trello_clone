TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "/api/lists",
  validate: function(attrs, options) {
    if (attrs.title == "") {
      return "title can't be blank"
    }
  },
    
  cards: function () {
    this._cards = 
    this._cards || new TrelloClone.Collections.Cards([], { list: this });
    return this._cards;
  },
  
  parse: function (response) {
    if (response.cards) {
      this.cards().set(response.cards, { parse: true });
      delete response.cards;
    }
    return response;
  }
});