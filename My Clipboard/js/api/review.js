(function () {
    var app = Windows.ApplicationModel;
    var package = app.Package.current;
    var package_id = package.id;
    var family_name = package_id.familyName;

    $('nav a.bottom').attr('href', 'ms-windows-store://review/?PFN=' + family_name);
})();
