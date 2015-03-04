/**
 * Created by bluefletch on 3/3/15.
 */


(function(root) {

    root.NTApp = function(configurations) {

        this.webrtc = new SimpleWebRTC({
            localVideoEl: configurations.localVideo,
            remoteVideosEl: configurations.removeVideoContainer,
            autoRequestMedia: true,
            url: configurations.url || NTApp.URL_SIGNAL_MASTER
        });

        this.addEventListeners();
    };

    NTApp.ROOM_NERD_TALK = 'nerdtalk';
    NTApp.EVENT_READY_TO_CALL = 'readyToCall';
    NTApp.EVENT_CONNECTIVITY_ERROR = 'connectivityError';
    NTApp.URL_SIGNAL_MASTER = 'http://signaling.simplewebrtc.com:80';

    NTApp.prototype = {

        webrtc: null,
        isReady: false,
        readyHandler: null,

        addEventListeners: function() {

            var readyToCallHandler = $.proxy(function() {

                console.info("Connection: Successful");

                this.isReady = true;

                var createRoomHandler = $.proxy(function() {

                    console.info("Room: Successfully created room");

                    if(this.readyHandler) {
                        this.readyHandler.apply();
                    }

                }, this);

                this.webrtc.createRoom(NTApp.ROOM_NERD_TALK, createRoomHandler);



            }, this);

            this.webrtc.on(NTApp.EVENT_READY_TO_CALL, readyToCallHandler);

            this.webrtc.on(NTApp.EVENT_CONNECTIVITY_ERROR, function () {

                console.log('Connection: Failed');
            });
        },

        join: function() {

            this.webrtc.joinRoom(NTApp.ROOM_NERD_TALK, function() {

                console.info('Join: Successful');
            });
        },

        onReady: function(handler) {

            this.readyHandler = $.proxy(handler, this);

            if(this.isReady) {
                this.readyHandler.apply();
            }
        }
    };

})(this);