function resetHistory() {
    // Initialization
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
    var localSettings = Windows.Storage.ApplicationData.current.localSettings;

    // Reset History
    var num = roamingSettings.values["historyEventsCount"];
    for ( var i = num; i > 0; i-- ) {
        localSettings.values.remove(i);
    };

    // Reset Counters
    roamingSettings.values["historyEventsCount"] = 0;
    roamingSettings.values["historyEventsMin"] = 0;
};

function testStorage() {
    // Initialization
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
    var localSettings = Windows.Storage.ApplicationData.current.localSettings;

    // Save value
    roamingSettings.values["historyEventsCount"] = 5;
    roamingSettings.values["historyEventsMin"] = 0;
    localSettings.values["listening"] = true;

    // Composite setting
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "10:35 PM";
    composite["value"] = "Here is the BackgroundTask initialization:";
    roamingSettings.values["1"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "10:35 AM";
    composite["value"] = "I am building a UWP App in JavasScipt. The Documentations I am following:";
    roamingSettings.values["2"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "10:36 AM";
    composite["value"] = "As you can see, I set the appTrigger variable in the code above to set the trigger for the task. What would I need to trigger the background task whenever the user copies something to his clipboard? How can I perform something whenever the background task runs?";
    roamingSettings.values["2"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "10:36 AM";
    composite["value"] = "There are two approaches to implementing background tasks: in-process, in which the app and its background process run in the same process; and out-of-process, where the app and the background process run in separate processes. In-process background support was introduced in Windows 10, version 1607, to simplify writing background tasks. But you can still write out-of-process background tasks. See Guidelines for background tasks for recommendations on when to write an in-process versus out-of-process background task.";
    roamingSettings.values["2"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "10:37 AM";
    composite["value"] = "Out-of-process background tasks are implemented as lightweight classes that the OS runs in a separate process (backgroundtaskhost.exe). Out-of-process background tasks are classes you write that implement the IBackgroundTask interface. You register a background task by using the BackgroundTaskBuilder class. The class name is used to specify the entry point when you registering the background task. In Windows 10, version 1607, you can enable background activity without creating a background task. You can instead run your background code directly inside the foreground application.";
    roamingSettings.values["2"] = composite;
};


(function () {
    "use strict"

    // Initialization
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
    var localSettings = Windows.Storage.ApplicationData.current.localSettings;

    // Save value
    roamingSettings.values["historyEventsCount"] = 6;
    roamingSettings.values["historyEventsMin"] = 0;
    localSettings.values["listening"] = true;

    // Composite setting
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "02.24 - 10:35 PM";
    composite["value"] = "Here is the BackgroundTask initialization:";
    roamingSettings.values["1"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "02.24 - 10:35 AM";
    composite["value"] = "I am building a UWP App in JavasScipt. The Documentations I am following:";
    roamingSettings.values["2"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "02.24 - 10:36 AM";
    composite["value"] = "As you can see, I set the appTrigger variable in the code above to set the trigger for the task. What would I need to trigger the background task whenever the user copies something to his clipboard? How can I perform something whenever the background task runs?";
    roamingSettings.values["3"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "02.24 - 10:36 AM";
    composite["value"] = "There are two approaches to implementing background tasks: in-process, in which the app and its background process run in the same process; and out-of-process, where the app and the background process run in separate processes. In-process background support was introduced in Windows 10, version 1607, to simplify writing background tasks. But you can still write out-of-process background tasks. See Guidelines for background tasks for recommendations on when to write an in-process versus out-of-process background task.";
    roamingSettings.values["4"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "02.24 - 10:36 AM";
    composite["value"] = " ";
    roamingSettings.values["5"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "02.24 - 10:37 AM";
    composite["value"] = "Out-of-process background tasks are implemented as lightweight classes that the OS runs in a separate process (backgroundtaskhost.exe). Out-of-process background tasks are classes you write that implement the IBackgroundTask interface. You register a background task by using the BackgroundTaskBuilder class. The class name is used to specify the entry point when you registering the background task. In Windows 10, version 1607, you can enable background activity without creating a background task. You can instead run your background code directly inside the foreground application.";
    roamingSettings.values["6"] = composite;

    // Retrieve value
    var num = roamingSettings.values["historyEventsCount"];
    var min = roamingSettings.values["historyEventsMin"];
    if ( num > 0 ) {
        for ( var i = 1; i <= num; i++ ) {
            var item = roamingSettings.values[i]
            if ( item["value"] != " " && item["value"] != "" ) {
                $('section#history').prepend('<div class="item" id=' + i + '><p class="time">' + item["date"] + '</p><p class="large">' + item["value"] + '</p></div>');
                $('#more-arrow').show();

                item = $('section#history .item#' + i + ' p.large');
                if ( item.html().length > 300 ) {
                    var text = item.text();
                    text = text.substr(0,300) + '...';
                    item.text(text);
                };
            };
        };
        if ( (roamingSettings.values[num])["value"] != " " ) {
            $('section#history .item:first-child').addClass('active');
        };
    } else {
        $('section#history').prepend('<div class="item" id="no-events"><p class="large">Start using your clipboard (CTRL+C) ...</p></div>');
        $('#more-arrow').hide();
    };
})();
