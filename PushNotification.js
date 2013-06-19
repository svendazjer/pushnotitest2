(function(cordova) {
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

	function PushNotification() {}

	// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
	PushNotification.prototype.register = function(successCallback, errorCallback, options) {
        console.log("About to register");
		cordovaRef.exec(successCallback, errorCallback, "GenericPush", "register", [options]);
	};

    // Call this to unregister for push notifications
    PushNotification.prototype.unregister = function(successCallback, errorCallback) {
        cordovaRef.exec(successCallback, errorCallback, "GenericPush", "unregister", []);
    };
 
 
    // Call this to set the application icon badge
    PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, badge) {
        cordovaRef.exec(successCallback, successCallback, "GenericPush", "setApplicationIconBadgeNumber", [{badge: badge}]);
    };

 cordova.addConstructor(function() {
		if(!window.plugins)
            window.plugins = {};
		window.plugins.pushNotification = new PushNotification();
	});

 })(window.cordova || window.Cordova || window.PhoneGap);
