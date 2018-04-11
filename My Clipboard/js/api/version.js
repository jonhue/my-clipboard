if (window.jQuery) {
    
    ﻿(function () {
        $('#version').append('<p class="small">Version ' + version.major + '.' + version.minor + '.' + version.build + '.' + version.revision + '</p>');
    })();

} else {
    // jQuery not loaded!
};
