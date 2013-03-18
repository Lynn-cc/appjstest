var app = require('appjs');

app.serveFilesFrom(__dirname + '/content')

var start;

var menubar = app.createMenu([{
    label: '&Game',
    submenu: [{
        label: '&Start',
        action: start
    }, {
        label: '&Exit',
        action: function() {
            window.close();
        }
    }]
}]);

menubar.on('select', function(item) {
    console.log('menu item clicked!');
    console.log(item);
});

var window = app.createWindow({
    width: 500,
    heigth: 500,
    name: 'Guess Me',
    icons: __dirname + '/content/icons'
});

window.on('create', function() {
    console.log('window created!');
    window.frame.show();
    window.frame.center();
    window.frame.setMenuBar(menubar);
});

var trayMenu = app.createMenu([{
    label: 'Show',
    action: function() {
        window.frame.show();
    }
}]);

var statusIcon = app.createStatusIcon({
    icon: './content/icons',
    tooltip: 'TEST',
    menu: trayMenu
});
