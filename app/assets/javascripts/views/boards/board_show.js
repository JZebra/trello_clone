TrelloClone.Views.Board = Backbone.CompositeView.extend({
  template: JST["board/board_show"],
  
  events: {
    "submit form"                : "endEditing",
    "sortupdate .lists"          : "updateListOrd",
    "sortupdate .cards"          : "updateCardLocation",
    // "mouseenter .list, .card"    : "showGlyphicon",
    // "mouseleave .list, .card"    : "hideGlyphicon"
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.lists(), "sync", this.model.lists().sort);
    this.listenTo(this.model.lists(), "remove", this.removeList);
    this.listenTo(this.model.lists(), "add", this.addList);
    
    var newListView = new TrelloClone.Views.NewList({board: this.model});
    this.addSubview(".list-new", newListView);
    
    this.model.lists().each(this.addList.bind(this));
  },
  
  addList: function (list) {
    var listView = new TrelloClone.Views.List({ model: list });
    this.addSubview('.lists', listView);
    this.render();
  },
  
  removeList: function(list) {
    var view = _.find(this.subviews('.lists'), function(view){
      return view.model.id == list.id;
    })
    this.removeSubview('.lists', view);
    this.render();
  },
  
  makeListsSortable: function () {
    $('.lists').sortable({
      connectWith: '.lists',
      tolerance: 'intersect',
      start: function (event, ui) {
        ui.item.toggleClass('dragged');
      },
      stop: function (event, ui) {
        ui.item.toggleClass('dragged');
      }
    });
  },
  
  // Change list order in board
  updateListOrd: function (event, ui) {
    var board = this;
    _.each($('.list'), function (list, index) {
      var listId = $(list).data('id');
      var listObj = board.model.lists().get(listId);
      // if the ord and visible index are different, set and save the list.
      if (listObj.get('ord') !== index + 1) {
        listObj.set('ord', index + 1);
        listObj.save({});
      }
    })
  },
  
  updateCardLocation: function (event, ui) {
    var board = this;
    // get destination list model
    var newListId = ui.item.closest('.list').data('id');
    var newListObj = this.model.lists().get(newListId);
    
    // get origin list model
    var oldListId = $(event.target).parent().data('id');
    var oldListObj = this.model.lists().get(oldListId);
    
    // get card model
    var cardId = $(event.toElement).data('id')
    var cardObj = oldListObj.cards().get(cardId)
    
    // if the card moved lists, delete the entry from the old list and add it to the new one. Else, update the ord in the list. 
    if (newListId !== oldListId) {
      // error: cannot read property 'cards' of undefined ??
      oldListObj.cards().remove(cardObj);
      this.updateCardOrd(oldListEl, oldListObj);
      cardObj.set('list_id', newListId);
      cardObj.save({});      
      newListObj.cards().add(cardObj);
      this.updateCardOrd(newListObj);
    } else {
      this.updateCardOrd(oldListObj)
    }
  },
  
  makeCardsSortable: function () {
    $('.cards').sortable({
      connectWith: '.cards',
      tolerance: 'intersect',
      start: function (event, ui) {
        ui.item.toggleClass('dragged');
      },
      stop: function (event, ui) {
        ui.item.toggleClass('dragged');
      }
    });
  },
  
  updateCardOrd: function (listObj) {
    var board = this
    listObj.cards().each(function (card, index) {
      // if the ord and visible index are different, set and save the card.
      if (card.get('ord') !== index + 1) {
        card.set('ord', index + 1);
        card.save({id: cardId});
      }
    })
  },
  
  showGlyphicon: function () {
    $(event.target).children('.delete-button').show();
  },
  
  hideGlyphicon: function () {
    $(event.target).children('.delete-button').hide();
  },
  
  render: function () {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.makeListsSortable();
    this.makeCardsSortable();
    
    return this;
  }  
});