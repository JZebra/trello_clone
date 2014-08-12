TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: function () {
    return this.open ? JST['list/list_edit'] : JST['list/list_show'];
  },
  className: "list col-sm-3",
  
  events: {
    "click button#delete_list" : "destroyList",
    "click .card"              : 'openModal',
    // "drop .card"               : "drop"
    // "click .glyphicon-remove"  : "removeCard"
    
  },
  
  initialize: function (options) {
    this.open = false;
    this.listenTo(this.model.cards(), "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);
    
    var newCardView = new TrelloClone.Views.CardForm({ list: this.model });
    this.addSubview(".card-new", newCardView);
    this.model.cards().each(this.addCard.bind(this));
  },
   
  // beginEditing: function () {
  //   this.open = true;
  //   this.render();
  // },
  //
  // endEditing: function (event) {
  //   event.preventDefault();
  //   this.open = false;
  //
  //   var params = $(event.currentTarget).serializeJSON();
  //   this.model.set(params["list"]);
  //   this.model.save();
  //
  //   this.render();
  // },
  
  addCard: function (card) {
    var cardView = new TrelloClone.Views.Card({ model: card });
    this.addSubview('.cards', cardView);
  },
  
  removeCard: function (card) {
    var view = _.find(this.subviews('.cards'), function(view2) {
      return view2.model.id == card.id;      
    })
    this.removeSubview('.cards', view);
    this.render();
  },
  
  destroyList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  openModal: function (event) {
    event.preventDefault();
    var id = $(event.target).attr('data-id');
    var card = this.model.cards().get(id)
    var editModal = new TrelloClone.Views.CardModal({ model: card });
    this.addSubview(".edit-modal", editModal)
  },
  
  render: function () {
    var renderedContent = this.template()({ list: this.model });
    this.$el.html(renderedContent);
    //setting data-id to list.id
    this.$el.attr("data-id", this.model.id )    
    this.attachSubviews();
    return this;
  }
});
