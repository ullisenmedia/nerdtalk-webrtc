/**
 * Created by bluefletch on 3/3/15.
 */


(function(root) {

    root.NTApp = function(configurations) {

        this.webrtc = new SimpleWebRTC({
            localVideoEl: configurations.localVideoContainer,
            remoteVideosEl: configurations.removeVideoContainer,
            autoRequestMedia: true,
            url: configurations.url
        });

        this.addEventListeners();
    };

    NTApp.ROOM_NERD_TALK = 'nerdtalk';
    NTApp.EVENT_READY_TO_CALL = 'readyToCall';

    NTApp.prototype = {

        webrtc: null,
        isReady: false,
        readyHandler: null,

        addEventListeners: function() {

            var readyToCallHandler = $.proxy(function() {

                this.isReady = true;

                var createRoomHandler = $.proxy(function() {

                    if(this.readyHandler) {
                        this.readyHandler.apply();
                    }

                }, this);

                this.webrtc.createRoom(NTApp.ROOM_NERD_TALK, createRoomHandler);



            }, this);

            this.webrtc.on(NTApp.EVENT_READY_TO_CALL, readyToCallHandler);

            this.webrtc.on('localStream', function (stream) {
                console.log('localStream');
            });

            this.webrtc.on('localMediaError', function (err) {
                console.log('localMediaError');
            });
        },

        join: function() {

            this.webrtc.joinRoom(NTApp.ROOM_NERD_TALK);
        },

        onReady: function(handler) {

            this.readyHandler = $.proxy(handler, this);

            if(this.isReady) {
                this.readyHandler.apply();
            }
        }
    };

})(this);