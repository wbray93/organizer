const CODE_KEYWORDS = ['javascript', 'html', 'css'];

let organizer = {
    tasks: [],
    displayTasks: function () {
        console.log('My Tasks', this.tasks);
        $('.list li').remove();

        for (var i = 0; i < this.tasks.length; i++) {
            console.log(this.tasks[i]);
            let itemHtml = '<li data-position="' + i + '">' + this.tasks[i] + '<button class="remove">Remove</button></li>'
            if (this.hasCodeKeyword(i)) {
                $('#coding-list').append(itemHtml);
            } else {
                $('#weekly-list').append(itemHtml);
            }
        }
        let deleteThis = this;
        $('.list li .remove').click(function (e) {
            var position = $(this).parent().attr('data-position');
            deleteThis.deleteTasks(position);
        });
    },

    addTasks: function (task) {
        this.tasks.push(task);

        this.displayTasks();
    },

    deleteTasks: function (position) {
        this.tasks.splice(position, 1);
        this.displayTasks();
    },

    hasCodeKeyword: function (position) {
        let words = this.tasks[position].split(' ');
        return words.some(function (word) {
            if (CODE_KEYWORDS.includes(word.toLowerCase())) {
                return true;
            }
        })

    }
}

document.getElementById('task').onclick = function () {
    let task = document.querySelector('input').value
    organizer.addTasks(task)
    document.querySelector('input').value = ""
}