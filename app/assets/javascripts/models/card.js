TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: '/api/cards/',
  
  validate: function(attrs, options) {
    if (attrs.title == "") {
      return "title can't be blank"
    }
  }
});