var app = require('appjs');

app.serveFilesFrom(__dirname + '/content')

var menubar = app.createMenu([{
    label: '&Game',
    submenu: [{
        label: '&Start',
        action: function() {
            window.dispatchEvent(new window.Event('start'));
        }
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
    width: 420,
    heigth: 400,
    name: 'Guess Me',
    icons: __dirname + '/content/icons'
});

window.on('create', function() {
    console.log('window created!');
    window.frame.show();
    window.frame.center();
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

window.on('ready', function() {
    window.frame.setMenuBar(menubar);
    window.require = require;
    window.process = process;
});
