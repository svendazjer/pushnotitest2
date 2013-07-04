
var pushNotification;

function onDeviceReady() {
	try 
	{ 
		pushNotification = window.plugins.pushNotification;
		if (device.platform == 'android' || device.platform == 'Android') {
			pushNotification.register(successHandler, errorHandler, {"senderID":"661780372179","ecb":"onNotificationGCM"});		// required!
		} else {
			pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
		}
	}
	catch(err) 
	{ 
		txt="There was an error on this page.\n\n"; 
		txt+="Error description: " + err.message + "\n\n"; 
		alert(txt); 
	} 
}

// handle APNS notifications for iOS
function onNotificationAPN(e) {
	if (e.alert) {
		 navigator.notification.alert(e.alert);
	}
		
	if (e.sound) {
		var snd = new Media(e.sound);
		snd.play();
	}
	
	if (e.badge) {
		pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
	}
}

// handle GCM notifications for Android
function onNotificationGCM(e) {
	alert("Evento recibido: "+e.event);
	
	switch( e.event )
	{
		case 'registered':
		if ( e.regid.length > 0 )
		{
			var respuesta=registraEquipo(1, e.regID);
			alert('registration id = '+e.regID+"==="+respuesta);
			// Your GCM push server needs to know the regID before it can push to this device
			// here is where you might want to send it the regID for later use.
			console.log("regID = " + e.regID);
		}
		break;
		
		case 'message':
			// if this flag is set, this notification happened while we were in the foreground.
			// you might want to play a sound to get the user's attention, throw up a dialog, etc.
			if (e.foreground)
			{
				alert('INLINE NOTIFICATION');
				
				// if the notification contains a soundname, play it.
				var my_media = new Media("/android_asset/www/"+e.soundname);
				my_media.play();
			}
			else
			{	// otherwise we were launched because the user touched a notification in the notification tray.
				if (e.coldstart)
					alert('COLDSTART NOTIFICATION');
				else
					alert('BACKGROUND NOTIFICATION');
			}
				
			alert('MESSAGE -> MSG: ' + e.payload.message);
			alert('MESSAGE -> MSGCNT: ' + e.payload.msgcnt);
		break;
		
		case 'error':
			alert('ERROR -> MSG:' + e.msg);
		break;
		
		default:
			alert('EVENT -> Unknown, an event was received and we do not know what it is');
		break;
	}
}

function tokenHandler (result) {
	//$("#app-status-ul").append('<li>token: '+ result +'</li>');
	alert('token: '+ result);
	// Your iOS push server needs to know the token before it can push to this device
	// here is where you might want to send it the token for later use.
}

function successHandler (result) {
	//$("#app-status-ul").append('<li>success:'+ result +'</li>');
	alert('success:'+ result);
}

function errorHandler (error) {
	//$("#app-status-ul").append('<li>error:'+ error +'</li>');
	alert('error:'+ error);
}

function registraEquipo(idUsuario, idRegisterGcm) {
	$.post(urlpushnoti+"registerdevice.php", {
			registerId:idRegisterGcm,
			userId:idUsuario
		}, 
		function(data) {
			alert("q onda po! "+data+"=="+urlpushnoti+"registerdevice.php");
			return data;
	})
	.fail(function() { alert("error"); });
}

document.addEventListener('deviceready', onDeviceReady, true);
