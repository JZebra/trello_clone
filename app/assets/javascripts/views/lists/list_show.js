TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: JST['list/list_show'],
  className: "list",
  
  events: {
    "click button#delete_list"   : "destroyList",
    "dblclick h4"                : "beginEditing",
    "blur h4"                    : "endEditing",
    "sortreceive"                : "receiveCard",
    "sortremove"                 : "sendCard",
    "sortstop"                   : "saveCards"
  },
  
  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.cards(), "sync reset sort change", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    
    var newCardView = new TrelloClone.Views.CardNew({ list: this.model });
    this.addSubview(".card-new", newCardView);
    this.model.cards().each(this.addCard.bind(this));
  },
  
  destroyList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  // Allows the list title to be editable on dblclick 
  beginEditing: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    var title = $currentTarget.data('title');
    var $input = $("<input class='edit-input'>");

    $input.data('field', title);
    $input.val(this.model.escape(title));
    $currentTarget.removeClass('editable');
    $currentTarget.html($input);
    $input.focus();
  },

  // saves the new list title
  endEditing: function (event) {
    event.preventDefault();
    var field = $(event.currentTarget).data('title');
    var newTitle = event.target.value

    var params = $(event.currentTarget).serializeJSON();
    this.model.save({ title: newTitle });
    this.render();
  },
  
  // adds subview for each card in the list
  addCard: function (card) {
    var cardView = new TrelloClone.Views.Card({ model: card });
    this.addSubview('.cards', cardView);
  },
  
  // removes a card from the DOM and the collection on sort.
  sendCard: function (event, ui) {
    var $cardEl = $(ui.item),
        cardId = $cardEl.data('card-id'),
        collection = this.model.cards(),
        cardObj = collection.get(cardId);
    collection.remove(cardObj);
  },
  
  // adds card to the new list and collection on sort
  receiveCard: function (event, ui) {
    var $cardEl = $(ui.item),
        cardId = $cardEl.data('card-id'),
        newOrd = $cardEl.index,
        newCollection = this.model.cards(),
        newCard = new TrelloClone.Models.Card({
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });
    // we need to pass silent: true or else we render an empty copy of the card to the DOM
    newCollection.add(newCard, {silent: true});
    newCard.save();
    this.saveCards(event);
  },
  
  saveCards: function(event) {
    event.stopPropagation(); // Prevent list sorting listener from firing.
    var cardEls = this.$('.card'),
        collection = this.model.cards();
    cardEls.each(function(index, el) {
      var $cardElement = $(el),
          cardId = $cardElement.data('card-id');
      var card = collection.get(cardId);
      if (card.get('ord') === index) {
        return;
      }
      card.save({ ord: index });
    }.bind(this));
  },
  
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    this.$el.attr("data-list-id", this.model.id )    
    
    this.attachSubviews();
    return this;
  }
});
