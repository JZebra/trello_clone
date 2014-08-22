TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: JST['list/list_show'],
  className: "list",
  
  events: {
    "click button#delete_list"   : "destroyList",
    "dblclick h4"                : "beginEditing",
    "blur h4"                    : "endEditing",
    "sortreceive"                : "receiveCard",
    "sortremove"                 : "removeCard",
    "sortstop"                   : "saveCards"
  },
  
  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), "sync reset sort change", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    
    var newCardView = new TrelloClone.Views.CardNew({ list: this.model });
    this.addSubview(".card-new", newCardView);
    this.model.cards().each(this.addCard.bind(this));
  },
  
  //Allows the list title to be editable on dblclick 
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

  endEditing: function (event) {
    event.preventDefault();
    var field = $(event.currentTarget).data('title');
    var newTitle = event.target.value

    var params = $(event.currentTarget).serializeJSON();
    this.model.save({ title: newTitle });
    this.render();
  },
  
  addCard: function (card) {
    var cardView = new TrelloClone.Views.Card({ model: card });
    this.addSubview('.cards', cardView);
  },
  
  // removes a card from the DOM and the collection
  removeCard: function (event, ui) {
    
  },
  
  destroyList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    this.$el.attr("data-list-id", this.model.id )    
    
    this.attachSubviews();
    return this;
  }
});
