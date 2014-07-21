TrelloClone.Views.Board = Backbone.CompositeView.extend({
  template: JST["board_show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync remove change:title", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    
    var newListView = new TrelloClone.Views.NewList({board_id: this.model.id});
    
    this.addSubview(".list-new", newListView);
    
    // this.model.lists().each(this.addList.bind(this));
  },
  
  addList: function (list) {
    var listView = new TrelloClone.Views.List({ model: list });
    this.addSubview('.lists', listView);
    // this.attachSubviews();  Lists are not immediately added to board... 
  },
  
  render: function () {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
        
    this.attachSubviews();
    return this;
  }
  
});