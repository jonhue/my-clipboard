(function () {
    var app = Windows.ApplicationModel;
    var package = app.Package.current;
    var package_id = package.id;
    var version = package_id.version;

    $('#version').append('<p class="small">Version ' + version.major + '.' + version.minor + '.' + version.build + '.' + version.revision + '</p>');
})();
