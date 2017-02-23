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
        taskBuilder.register();
    }
})();


(function () {
    "use strict"

    //Initialization
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    // Save value
    roamingSettings.values["historyEventsCount"] = 0;

    // Composite setting
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "10:25 AM";
    composite["value"] = "string";
    roamingSettings.values["1"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "10:25 AM";
    composite["value"] = "string";
    roamingSettings.values["2"] = composite;

    // Retrieve value
    var num = roamingSettings.values["historyEventsCount"];
    if ( num > 0 ) {
        for ( var i = num; i > 0; i-- ) {
            var item = roamingSettings.values[i]
            $('section#history').prepend('<div class="item" id=' + "0" + '><p class="time">' + item["date"] + '</p><p class="large">' + item["value"] + '</p></div>');
            $('#more-arrow').show();
        };
    } else {
        $('section#history').prepend('<div class="item" id="no-events"><p class="large">Start using your clipboard (CTRL+C) ...</p></div>');
        $('#more-arrow').hide();
    };
})();


(function () {
    //Initialization
    var app = Windows.ApplicationModel;
    var package = app.Package.current;
    var package_id = package.id;
    var version = package_id.version;

    $('#version').append('<p class="small">' + version.major + '.' + version.minor + '.' + version.build + '.' + version.revision + '</p>');
})();
