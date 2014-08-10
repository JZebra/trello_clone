TrelloClone.Views.CardModal = Backbone.View.extend({
  template: JST['card/card_modal'],
  
  events: {
    "submit form" : "submit"
  },
  
  className: "edit-card-modal",
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },
  
  render: function() {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  
  submit: function (event) {
    var view = this;
    event.preventDefault();

    var params = $(event.target).serializeJSON();
    this.model.set(params);
    this.model.save({},{    
      success: function(){
        view.list.cards().add(card);
      },
      error: function(){
        return "error saving card";
      },
    });

  }
  
});