TrelloClone.Views.Board = Backbone.CompositeView.extend({
  template: JST["board/board_show"],
  
  events: {
    "dblclick h3"                : "beginEditing",
    "submit form"                : "endEditing",
    "sortupdate .lists"          : "updateListOrd",
    // 'sortupdate .cards'          : "updateCardOrd"
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
      tolerance: 'intersect'
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
    
    if (newListId !== oldListId) {
      oldList.cards().remove(cardObj);
      newList.cards().add(cardObj);
      
    }

  },
  
  
  // cardsSortable: function () {
 //    var view = this;
 //
 //    this.$(".cards").sortable({
 //      connectWith: ".cards",
 //      tolerance: "intersect",
 //      // placeholder: true,
 //
 //      start: function (event, ui) {
 //        $(ui.item).addClass('dragged');
 //      },
 //
 //      stop: function (event, ui) {
 //        $(ui.item).removeClass('dragged');
 //      },
 //
 //      update: function (event, ui) {
 //        var cardDiv = ui.item;
 //        var newListId = cardDiv.closest('.list').data('id');
 //        var cardId = cardDiv.data('id');
 //        var lists = view.model.lists().models;
 //        var card, oldList, newList;
 //
 //        view.model.lists().each( function (list) {
 //          if (list.cards().get(cardId)) {
 //            oldList = list;
 //            card = list.cards().get(cardId);
 //          }
 //
 //          if (list.get('id') === newListId) {
 //            newList = list;
 //          }
 //        });
 //
 //        oldList.cards().remove(card, { silent: true });
 //        newList.cards().add(card, { silent: true });
 //
 //        //saves to db then saves to backbone view on success
 //        card.save({ list_id: newListId } , {
 //          success: function () {
 //            view.updateCardOrd(newListId)
 //          }
 //        });
 //      },
 //    })
 //  },
  
  
  render: function () {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    // var sortedSubviews = this.subviews()
    console.log("rendered")
    
    this.attachSubviews();
    this.makeListsSortable();    
    
    return this;
  }  
});