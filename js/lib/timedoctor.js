(function() {

  var BASE_URL = 'https://webapi.timedoctor.com/';
  var API_URL = BASE_URL + 'v1.1/';
  var client_id = '763_2zii8fuqjvokk0sk0gkwsgg8c04888ock04wk08c4kgggwkkgk';

  var TimeDoctor = {
    authenticate: function() {
      var url = BASE_URL
              + 'oauth/v2/auth?client_id='
              + client_id
              + '&redirect_uri=https://www.example.com&response_type=token';
      window.open(url);
    },
    logout: function(cb) {
      chrome.browserAction.setBadgeText({text: ''});
      chrome.storage.sync.remove(['access_token', 'expiry_date'], cb);
    },
    isLoggedIn: function(cb) {
      chrome.storage.sync.get(['access_token', 'expiry_date'], cb);
    },
    setOAuthTokens: function(tokens, cb) {
      var expiry_date = moment().second(tokens.expires_in).format();

      chrome.storage.sync.set({ 'access_token': tokens.access_token, 'expiry_date': expiry_date }, cb);
      chrome.browserAction.setBadgeText({text: 'New'});
    },
    isExpired: function(date) {
      return moment().isAfter(date);
    },
    api: function(path, access_token, method, params) {
      return $.ajax({
        url: API_URL + path,
        headers: {
          'Authorization': 'Bearer ' + access_token,
          'Content-Type':  'application/json'
        },
        type: method || 'GET',
        data: params || null
      });
    },
    deparam: function(params) {
      var obj = {};
      $.each(params.split('&'), function() {
        var item = this.split('=');
        obj[item[0]] = item[1];
      });
      return obj;
    }

  };

  window.TimeDoctor = TimeDoctor;
})();