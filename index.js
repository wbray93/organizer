$(document).ready(function() {
  const CODE_KEYWORDS = ["javascript", "html", "css"];

  let organizer = {
    tasks: [],
    displayTasks: function() {
      console.log("My Tasks", this.tasks);
      $(".list li").remove();
      if (!this.tasks) {
        return;
      }
      for (var i = 0; i < this.tasks.length; i++) {
        console.log(this.tasks[i]);
        let itemHtml =
          '<li data-position="' +
          i +
          '">' +
          this.tasks[i] +
          '<button class="remove">Remove</button></li>';
        if (this.hasCodeKeyword(i)) {
          $("#coding-list").append(itemHtml);
        } else {
          $("#weekly-list").append(itemHtml);
        }
      }
      let deleteThis = this;
      $(".list li .remove").click(function(e) {
        var position = $(this)
          .parent()
          .attr("data-position");
        deleteThis.deleteTasks(position);
      });
    },

    addTasks: function(task) {
      this.tasks.push(task);

      this.displayTasks();
      this.saveToLocalStorage();
    },

    deleteTasks: function(position) {
      this.tasks.splice(position, 1);
      this.displayTasks();
      this.saveToLocalStorage();
    },

    hasCodeKeyword: function(position) {
      let words = this.tasks[position].split(" ");
      return words.some(function(word) {
        if (CODE_KEYWORDS.includes(word.toLowerCase())) {
          return true;
        }
      });
    },
    saveToLocalStorage: function() {
      window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    loadTasks: function() {
      let localTasks = window.localStorage.getItem("tasks");
      if (localTasks) {
        this.tasks = JSON.parse(localTasks);
      } else {
        this.tasks = [];
      }
      this.displayTasks();
    }
  };

  document.getElementById("organizer").onsubmit = function(e) {
    e.preventDefault();
    let task = document.querySelector("input").value;
    organizer.addTasks(task);
    document.querySelector("input").value = "";
  };
  organizer.loadTasks();
});
