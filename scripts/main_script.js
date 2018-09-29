function Task(topic, description, due, importance) {
    this.topic = topic;
    this.description = description;
    this.due = due;
    console.log(this.due);
    this.importance = importance;

    this.create = function() {
        var that = this;
        this.div = document.createElement("div");
        $(this.div).addClass("task");
        $(this.div).css("background-color", this.topic.color);

        var icons = document.createElement("div");
        $(icons).addClass("icons");
        var done_icon = document.createElement("div");

        var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg1.setAttributeNS(null, "viewBox", "-2,-2,17,17");
        svg1.setAttributeNS(null, "preserveAspectRatio","xMinYMin meet");
        $(svg1).addClass("svg_icon");

        var newpath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newpath.setAttribute("d", "M2.6458333 1.32292L1.3229166 2.64583l3.96875 3.96875-3.96875 3.96875 1.3229167 1.32292L6.6145832 7.9375l3.9687498 3.96875 1.322917-1.32292-3.9687501-3.96875L11.90625 2.64583l-1.322917-1.32291-3.9687498 3.96875z"); //Set path's data
        newpath.setAttribute("id", "pathID");

        $(svg1).append(newpath);


        done_icon.addEventListener("click", function() {
            that.delete()
        });
        var edit_icon = document.createElement("div");
        var svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg2.setAttributeNS(null, "viewBox", "0,0,12,12");
        svg2.setAttributeNS(null, "preserveAspectRatio","xMinYMin meet");
        $(svg2).addClass("svg_icon");

        newpath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newpath.setAttribute("d", "M5.2916666 9.26042L3.175 10.05417l.79375-2.11667zM9.7895832 3.175L4.4979166 8.46667M5.0270833 8.99583L10.31875 3.70417"); //Set path's data
        newpath.setAttribute("id", "pathID2");

        var newpath2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newpath2.setAttribute("d", "M9.2604166 2.64583l1.3229164 1.32292-5.2916664 5.29167L3.96875 7.9375z"); //Set path's data
        newpath2.setAttribute("id", "pathID3");

        $(svg2).append(newpath);
        $(svg2).append(newpath2);


        edit_icon.addEventListener("click", function() {
            that.edit()
        });

        var due_date = document.createElement("div");
        $(due_date).addClass("due_date");
        var date_p = document.createElement("p");
        $(date_p).html(this.due);

        var title = document.createElement("div");
        $(title).addClass("task_title");
        var title_p = document.createElement("p");
        $(title_p).html(this.topic.topic);

        var description = document.createElement("div");
        $(description).addClass("task_description");
        var description_p = document.createElement("p");
        $(description_p).html(this.description);

        $("#task_container").append(this.div);

        this.div.append(icons);
        icons.append(done_icon);
        icons.append(edit_icon);
        done_icon.append(svg1);
        edit_icon.append(svg2);

        this.div.append(due_date);
        due_date.append(date_p);

        this.div.append(title);
        title.append(title_p);

        this.div.append(description);
        description.append(description_p);
    };

    this.delete = function() {
        $(this.div).remove(); // removes DOM element
        var index = tasks.indexOf(this);
        if (index > -1) {
            tasks.splice(index, 1) // removes task from tasks array
        }
    };

    this.done = function() {
        console.log("done")
    };

    this.edit = function() {
        console.log("edit")
        // not implemented yet.
    };

    this.create()

}


var topics = [];

function Topic(topic, color) {
    this.topic = topic;
    this.color = color;

    this.create = function() {
        var checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.name = "topic";
        checkbox.value = this.topic;
        checkbox.id = this.topic;
        $(checkbox).addClass("checkbox");

        var label = document.createElement('label');
        $(label).html(this.topic);
        label.htmlFor = this.topic;


        $("#topic_input").append(checkbox);
        $("#topic_input").append(label);
        $("#topic_input").append("<br />")
    };

    this.create();
}

function get_topic_by_name(name) {
    for (var i in topics) {
        if (topics[i].topic === name) {
            return topics[i]
        }
    }
}

topics.push(new Topic("SoftCon", "#ff6666"));
topics.push(new Topic("DataVis", "#1a75ff"));
topics.push(new Topic("CECN", "#80ff80"));
topics.push(new Topic("HCI", "#ffff80"));
topics.push(new Topic("FOC II", "#ff944d"));
topics.push(new Topic("WG", "#b380ff"));

function get_inputs() {
    var topic_name = $('input[name="topic"]:checked').val();
    for (var i in topics) {
        if (topics[i].topic === topic_name) {
            var topic = topics[i];
            break;
        }
    }
    var date = convert_date_to_string($("#date_input").val());
    var description = $("#description_input").val();

    return {"topic": topic,
            "date": date,
            "description": description}
}

function convert_date_to_string(input) {
    var date = new Date(input);
    var days = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];
    return days[date.getDay()] + ", " + date.getDate() + "." + date.getMonth() + ".";
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});


$('#date_input').val(new Date().toDateInputValue());
$("#save_task").click(function() {
    var inputs = get_inputs();
    tasks.push(new Task(inputs["topic"], inputs["description"], inputs["date"], 0));
    $("#create_task_container").addClass("hidden")
});

$("#add_task_button").click(function() {
    $("#create_task_container").toggleClass("hidden")
})


var tasks = [];
/*tasks.push(new Task(get_topic_by_name("SoftCon"), "This is just a test. Lorem Ipsum salvatore di rio manage pycharte google gelato.", "SO, 23.09.", 1));
tasks.push(new Task(get_topic_by_name("FOC II"), "This is just a test. Lorem Ipsum salvatore di rio manage pycharte google gelato.", "SO, 23.09.", 1));
tasks.push(new Task(get_topic_by_name("HCI"), "This is just a test. Lorem Ipsum salvatore di rio manage pycharte google gelato.", "SO, 23.09.", 1));*/


// Local Storage

function save_to_localStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("saved")
}

function get_from_localStorage() {
    tasks = [];
    var stored = JSON.parse(localStorage.getItem("tasks"));
    for (var i in stored) {
        tasks.push(new Task(stored[i]["topic"], stored[i]["description"], stored[i]["due"], 0));
    }
}

get_from_localStorage();

setInterval(function() {
    save_to_localStorage();
}, 10000);