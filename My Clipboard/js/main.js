function clearClipboard() {
    $('input#empty-string').select();;
    document.execCommand("copy");

    $('#clipboard-icon').addClass('shaking');
    setTimeout(function() {
        $('#clipboard-icon').addClass('cleared');
    }, 750);
};

function runBackgroundTask() {
    Windows.ApplicationModel.Background.ApplicationTrigger().requestAsync().then(function (result) {
        closeRun();
    }, function (err) {
        console.log(err);
    });
};


(function () {
"use strict"
//Initialization
var Background = Windows.ApplicationModel.Background;
//Register
var taskBuilder = new Background.BackgroundTaskBuilder();
taskBuilder.name = "MyBackgroundTask";
//init trigger
var appTrigger = new Background.ApplicationTrigger();
taskBuilder.taskEntryPoint = "clipboardListener.MyBackgroundTask";
taskBuilder.setTrigger(appTrigger);
//Check if background task already registered
var taskRegistered = false;
var iter = Background.BackgroundTaskRegistration.allTasks.first();
var hascur=iter.hasCurrent;
while (hascur)
{
    var current = iter.current.value;
    if (current.name == "MyBackgroundTask")
    {
        taskRegistered = true;
        break;
    }
    iter.moveNext();
}

if (!taskRegistered)
{
    taskBuilder.register();
}
})();
