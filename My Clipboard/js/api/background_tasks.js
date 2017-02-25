function trackHistory() {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    // Check for My Clipboard pro
    if (licenseInformation.productLicenses["1"].isActive) {
        var max = 500;
    } else {
        var max = 5;
    };
};

/*
(function () {
    "use strict"

    // Initialization
    var Background = Windows.ApplicationModel.Background;

    // Register
    var taskBuilder = new Background.BackgroundTaskBuilder();
    taskBuilder.name = "MyBackgroundTask";

    // init trigger
    var appTrigger = new Background.ApplicationTrigger();
    taskBuilder.taskEntryPoint = "clipboardListener.MyBackgroundTask";
    taskBuilder.setTrigger(appTrigger);

    // Check if background task already registered
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
        var task = taskBuilder.register();
    }


    function runBackgroundTask() {
        var localSettings = Windows.Storage.ApplicationData.current.localSettings;
        appTrigger.requestAsync().then(function (result) {
            localSettings.values["listening"] = true;
            closeRun();
        }, function (err) {
            console.log(err);
            localSettings.values["listening"] = false;

            $('section#run').removeClass('hide hidden');
            $('#layout-wrapper').addClass('down');
        });
    };
    $('#run-background-task').click(function() {
        runBackgroundTask();
    });


    // Check if Background Task is running
    var localSettings = Windows.Storage.ApplicationData.current.localSettings;
    var listening = localSettings.values["listening"]
    if ( listening == true ) {
        $('section#run').addClass('hide hidden');
        $('#layout-wrapper').removeClass('down');
        runBackgroundTask();
    };
})();
*/
