
/**
 * Get tokens from session.
 */
(function() {
  'use strict';
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({});

    var params = TimeDoctor.deparam(request.session);
    TimeDoctor.setOAuthTokens(params, function() {});
  });
})();