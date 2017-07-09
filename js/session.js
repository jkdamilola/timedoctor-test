
/**
 * Get and send oauth tokens from query string.
 */

(function() {
	'use strict';
	chrome.runtime.sendMessage({type: 'auth', session: window.location.hash.substr(1)}, function (response) {
		window.open('', '_self', '');
		window.close();
	});
})();