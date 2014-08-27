TrelloClone.Views.Board = Backbone.CompositeView.extend({
  template: JST["board/board_show"],
  
  events: {
    "sortupdate .lists"          : "saveLists",
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "remove", this.removeList);
    this.listenTo(this.model.lists(), "sync", this.makeCardsSortable);
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
      
      //dragged class adds rotation styling
      start: function (event, ui) {
        ui.item.toggleClass('dragged');
      },
      stop: function (event, ui) {
        ui.item.toggleClass('dragged');
      }
    });
  },
  
  makeCardsSortable: function () {
    var that = this;
    
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
  
  saveLists: function(event) {
    event.stopPropagation();
    var listEls = this.$('.list'),
        collection = this.model.lists();
    listEls.each(function(index, el) {
      var $listElement = $(el),
          listId = $listElement.data('list-id');
      var list = collection.get(listId);
      if (list.get('ord') === index) {
        return;
      }
      list.save({ ord: index });
    }.bind(this));
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