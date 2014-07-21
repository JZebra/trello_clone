TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: function () {
    return this.open ? JST['list/list_edit'] : JST['list/list_show'];
  },
  
  events: {
    "click button#delete_list" : "destroyList"
  },
  
  initialize: function (options) {
    this.open = false;
    this.listenTo(this.model.cards(), "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    
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
    var view = _.find(this.subviews('.lists'), function(view2) {
      return view2.model.id == list.id;      
    })
    this.removeSubview('.lists', view);
    this.render();
  },
  
  destroyList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  render: function () {
    var renderedContent = this.template()({ list: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  }
});
