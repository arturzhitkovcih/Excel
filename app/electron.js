(() => {
    const appSize = {
        width: 0,
        height: 0
    };

    // The list of existing electron channels
    const channels = {};
    let lastChannelId = 0;

    // Send the electron event
    const sendEvent = (eventName, eventArgs) => {
        if (!window.ipcRenderer) {
            return;
        }

        window.ipcRenderer.send(eventName, {
            args: eventArgs
        });
    };

    // Creates an electron channel and send the event
    const sendEventWithCallback = (eventName, eventArgs) => {
        return new Promise((resolve, reject) => {
            if (!window.ipcRenderer) {
                reject();
                console.error('ipcRenderer is not defined');

                return;
            }

            // Increase channel counter
            lastChannelId++;

            // Create new event channel name and save it
            const channel = `request_${lastChannelId}`;

            channels[channel] = channel;

            // Start listening event channel
            window.ipcRenderer.on(channel, (event, data) => {
                // Delete event channel
                delete channels[channel];

                window.ipcRenderer.removeAllListeners(channel);

                resolve(data.response);
            });

            // Send the channel event
            window.ipcRenderer.send(eventName, {
                channel: channel,
                args: eventArgs
            });
        });
    };

    const electron = {
        log: (info, logLevel) => {
            sendEvent('log', {
                info,
                logLevel
            });
        },

        resize: (width, height) => {
            sendEvent('resize', {
                width: width,
                height: height
            });
        },

        getStorageValues: () => {
            return sendEventWithCallback('storage.get', {});
        },

        setStorageValue: (variableName, variableValue) => {
            if (!variableName) {
                return;
            }

            sendEvent('storage.set', {
                name: variableName,
                value: variableValue
            });
        },

        queryGetEmployees: (args) => {
            return sendEventWithCallback('query.getEmployees', args);
        },

        queryGet: (args) => {
            return sendEventWithCallback('query.get', args);
        },

        queryUpdate: (args) => {
            return sendEventWithCallback('query.update', args);
        },

        queryCreate: (args) => {
            return sendEventWithCallback('query.create', args);
        },

        queryDelete: (args) => {
            return sendEventWithCallback('query.delete', args);
        },

        createAvatar: (args) => {
            return sendEventWithCallback('create.avatar', args);
        },

        getAvatar: (args) => {
            return sendEventWithCallback('get.avatar', args);
        },

        saveFile: (args) => {
            return sendEventWithCallback('save.file', args);
        },

        saveFiles: (args) => {
            return sendEventWithCallback('save.files', args);
        },

        downloadFile: (args) => {
            return sendEventWithCallback('download.file', args);
        }
    };

    const waitAnimationFrame = () => {
        requestAnimationFrame(animateCallback);
    };

    const animateCallback = () => {
        const appElement = document.querySelector('#root');
        const width = appElement.offsetWidth;
        const height = appElement.offsetHeight;

        if (appSize.width !== width || appSize.height !== height) {
            appSize.width = width;
            appSize.height = height;

            electron.resize(width, height);
        }

        waitAnimationFrame();
    };

    // Save the global electron object
    Object.defineProperty(window, 'electron', {
        value: electron
    });

    // Wait for resizing
    waitAnimationFrame();
})();
