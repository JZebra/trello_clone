TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",
  
  lists: function () { 
    this._lists = 
    this._lists || new TrelloClone.Collections.Lists([], { board: this });
    // so that each collection of lists has a reference to the parent.
    return this._lists;
  },
    //checks if list exists, or creates. Returns this._lists
  
  parse: function (response) {
    if (response.lists) {
      this.lists().set(response.lists, { parse: true });
      delete response.lists;
    }
    // takes response from response.lists and sets it to this.lists()
    return response;
  }
  
});