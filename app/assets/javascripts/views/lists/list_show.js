TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: function () {
    return this.open ? JST['list/list_edit'] : JST['list/list_show'];
  },
  className: "list",
  
  events: {
    "click button#delete_list"   : "destroyList",
    "dblclick h4"                : "beginEditing",
    "blur h4"                    : "endEditing"
  },
  
  initialize: function (options) {
    this.open = false;
    this.listenTo(this.model.cards(), "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);
    
    var newCardView = new TrelloClone.Views.CardNew({ list: this.model });
    this.addSubview(".card-new", newCardView);
    this.model.cards().each(this.addCard.bind(this));
  },
   
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
  
  render: function () {
    var renderedContent = this.template()({ list: this.model });
    this.$el.html(renderedContent);
    //setting data-id to list.id
    this.$el.attr("data-id", this.model.id )    
    this.attachSubviews();
    return this;
  }
});
