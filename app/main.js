{
    'use strict';

    const electron = require('electron');
    const app = electron.app;
    const BrowserWindow = electron.BrowserWindow;

    // simple parameters initialization
    let electronConfig = {
        "URL_LAUNCHER_TOUCH": (process.env.URL_LAUNCHER_TOUCH == null) ? 0 : process.env.URL_LAUNCHER_TOUCH,
        "URL_LAUNCHER_TOUCH_SIMULATE": (process.env.URL_LAUNCHER_TOUCH_SIMULATE == null) ? 0 : process.env.URL_LAUNCHER_TOUCH_SIMULATE,
        "URL_LAUNCHER_FRAME": (process.env.URL_LAUNCHER_FRAME == null) ? 0 : process.env.URL_LAUNCHER_FRAME,
        "URL_LAUNCHER_KIOSK": (process.env.URL_LAUNCHER_KIOSK == null) ? 1 : process.env.URL_LAUNCHER_KIOSK,
        "URL_LAUNCHER_NODE": (process.env.URL_LAUNCHER_NODE == null) ? 0 : process.env.URL_LAUNCHER_NODE,
        "URL_LAUNCHER_WIDTH": (process.env.URL_LAUNCHER_WIDTH == null) ? 1920 : process.env.URL_LAUNCHER_WIDTH,
        "URL_LAUNCHER_HEIGHT": (process.env.URL_LAUNCHER_HEIGHT == null) ? 1080 : process.env.URL_LAUNCHER_HEIGHT,
        "URL_LAUNCHER_TITLE": (process.env.URL_LAUNCHER_TITLE == null) ? "RESIN.IO" : process.env.URL_LAUNCHER_TITLE,
        "URL_LAUNCHER_CONSOLE": (process.env.URL_LAUNCHER_CONSOLE == null) ? 0 : process.env.URL_LAUNCHER_CONSOLE,
        "URL_LAUNCHER_URL": (process.env.URL_LAUNCHER_URL == null) ? "file:////usr/src/app/data/index.html" : process.env.URL_LAUNCHER_URL,
        "URL_LAUNCHER_ZOOM": (process.env.URL_LAUNCHER_ZOOM == null) ? 1.0 : parseFloat(process.env.URL_LAUNCHER_ZOOM)
    };

    let window = null;


    // enable touch events if your device supports them
    if (electronConfig.URL_LAUNCHER_TOUCH) {
        app.commandLine.appendSwitch("--touch-devices");
    }
    // simulate touch events - might be useful for touchscreen with partial driver support
    if (electronConfig.URL_LAUNCHER_TOUCH_SIMULATE) {
        app.commandLine.appendSwitch("--simulate-touch-screen-with-mouse");
    }

    /*
      we initialize our application display as a callback of the electronJS "ready" event
    */
    app.on('ready', () => {

        // here we actually configure the behavour of electronJS
        window = new BrowserWindow({
            width: parseInt(electronConfig.URL_LAUNCHER_WIDTH),
            height: parseInt(electronConfig.URL_LAUNCHER_HEIGHT),
            frame: electronConfig.URL_LAUNCHER_FRAME,
            title: electronConfig.URL_LAUNCHER_TITLE,
            kiosk: electronConfig.URL_LAUNCHER_KIOSK,
            webPreferences: {
                nodeIntegration: electronConfig.URL_LAUNCHER_NODE,
                zoomFactor: electronConfig.URL_LAUNCHER_ZOOM
            }
        });

        window.webContents.on('did-finish-load', () => {
            setTimeout(() => {
                window.show();
            }, 300);

        });

        // if the env-var is set to true, a portion of the screen will be dedicated to the chrome-dev-tools
        if (electronConfig.URL_LAUNCHER_CONSOLE) {
            window.openDevTools();
        }

        // the big red button, here we go
        window.loadURL(electronConfig.URL_LAUNCHER_URL);
    });
}
