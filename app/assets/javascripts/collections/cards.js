TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: '/api/cards',
  model: TrelloClone.Models.Card,
  comparator: 'ord',
  
  initialize: function (models, options) {
    this.list = options.list;
  },
  
  getOrFetch: function (id) {
    var cards = this;
    
    var card = this.get(id);
    if (card) {
      card.fetch();
    } else {
      card = new TrelloClone.Models.Card({ id: id });
      card.fetch({
        success: function () { cards.add(card); }
      });
    }
    return card;
  }  
});
