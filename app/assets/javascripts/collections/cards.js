TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: '/api/cards',
  model: TrelloClone.Models.Card,
  
  getOrFetch: function (id) {
    var cards = this;
    
    var card;
    card = this.get(id);
    if (card) {
      card.fetch();
    } else {
      card = new TrelloClone.Models.List({ id: id });
      card.fetch({
        success: function () { cards.add(card); }
      });
    }
    return card;
  },
  
  comparator: function (card) {
    return card.get('ord');
  }
  
});

TrelloClone.Collections.cards = new TrelloClone.Collections.Cards();