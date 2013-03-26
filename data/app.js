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

//menubar.on('select', function(item) {
//});

var window = app.createWindow({
    width: 440,
    height: 460,
    name: 'Guess Me',
    icons: __dirname + '/content/icons'
});

window.on('create', function() {
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

window.on('ready', function() {
    window.require = require;
    window.process = process;
    bindEvent();
});

function bindEvent() {
    window.addEventListener('keydown', function(e) {
        if (e.keyIdentifier === 'F12')
            window.frame.openDevTools();
    });
}
