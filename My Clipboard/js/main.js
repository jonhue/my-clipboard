function clearClipboard() {
    $('input#empty-string').select();;
    document.execCommand("copy");

    $('#clipboard-icon').addClass('shaking');
    setTimeout(function() {
        $('#clipboard-icon').addClass('cleared');
    }, 750);
};

function runBackgroundTask() {
    var localSettings = Windows.Storage.ApplicationData.current.localSettings;
    Windows.ApplicationModel.Background.ApplicationTrigger().requestAsync().then(function (result) {
        localSettings.values["listening"] = true;
        closeRun();
    }, function (err) {
        console.log(err);
        localSettings.values["listening"] = false;

        $('section#run').removeClass('hide hidden');
        $('#layout-wrapper').addClass('down');
    });
};

function buyPro() {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;

    store_app.requestProductPurchaseAsync("1", false);
};

function donate() {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;

    store_app.requestProductPurchaseAsync("2", false);
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

    // Initialization
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
    var localSettings = Windows.Storage.ApplicationData.current.localSettings;

    // Save value
    roamingSettings.values["historyEventsCount"] = 2;
    localSettings.values["listening"] = true;

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
    var localSettings = Windows.Storage.ApplicationData.current.localSettings;
    var listening = localSettings.values["listening"]
    if ( listening == true ) {
        $('section#run').addClass('hide hidden');
        $('#layout-wrapper').removeClass('down');
        runBackgroundTask();
    };
})();


(function () {
    var app = Windows.ApplicationModel;
    var package = app.Package.current;
    var package_id = package.id;
    var version = package_id.version;

    $('#version').append('<p class="small">Version ' + version.major + '.' + version.minor + '.' + version.build + '.' + version.revision + '</p>');
})();


(function () {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    // Check for My Clipboard pro
    if (licenseInformation.ProductLicenses["1"].IsActive) {
        $('section#pro').hide();
        $('#navigation h1.pro').hide();
        $('#navigation h1.donate').show();
    } else {};

    // Check if donated
    if (licenseInformation.ProductLicenses["2"].IsActive) {
        $('#navigation h1.donate').hide();
    } else {};
})();
