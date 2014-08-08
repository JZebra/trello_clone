TrelloClone.Views.Board = Backbone.CompositeView.extend({
  template: JST["board/board_show"],
  
  events: {
    "click button#delete_board"  : "destroyBoard",
    "dblclick h3"                : "beginEditing",
    "submit form"                : "endEditing",
    "sortstop"                   : "changeListOrder"
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync remove change:title", this.render);
    this.listenTo(this.model.lists(), "remove", this.removeList);
    this.listenTo(this.model.lists(), "add", this.addList);
    
    var newListView = new TrelloClone.Views.NewList({board: this.model});
    this.addSubview(".list-new", newListView);
    
    this.model.lists().each(this.addList.bind(this));
  },
  
  addList: function (list) {
    var listView = new TrelloClone.Views.List({ model: list });
    this.addSubview('.lists', listView);
  },
  
  removeList: function(list) {
    var view = _.find(this.subviews('.lists'), function(view){
      return view.model.id == list.id;
    })
    this.removeSubview('.lists', view);
    this.render();
  },
  
  destroyBoard: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", { trigger: true });
      }
    });
    // callback redirects to index
  },
  
  changeListOrder: function (event, ui) {
    event.preventDefault();
    debugger;
    // data-id = card id
    // change list order in board, change card order in list
    // add class to individual card els (currently col-sm-6)
    // this.$("added class").each( function (index, el) {
      //      get data-id of el 
      //      list show view has a model and method .cards() 
      //      if model.ord != index....
      //       set and save if they are diff
      //      })
    
  },
  
  render: function () {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();

    $('.lists').sortable({
      connectWith: '.lists'
      // listen for sortStop in events hash
      //
    });
    
    return this;
  }  
});