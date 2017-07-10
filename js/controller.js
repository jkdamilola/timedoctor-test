(function() {
	'use strict';
	var items;
	var Controller = {
		init: function () {
			var _this = this;
			TimeDoctor.isLoggedIn(function(data) {
				items = data;
				if (items.access_token && !TimeDoctor.isExpired(items.expiry_date)) {
					_this.listUsers();
				} else {
					View.initAuth();
				}
			});
		},
		listUsers: function () {
			View.initLoader();

			var company;
			TimeDoctor.api('companies', items.access_token)
				.then(function(response) {
					company = response;
					var company_id = response.accounts[0].company_id;
					return TimeDoctor.api('companies/' + company_id + '/users', items.access_token);
				})
				.done(function(response) {
					View.showUsers({ 'company': company, 'users': response});
				})
				.fail(function (jqXHR, textStatus, errorThrown) {
					console.log(textStatus + ': ' + errorThrown);
				});
		},
		listTasks: function (data) {
			View.initLoader();

			TimeDoctor.api('companies/' + data.company_id + '/users/' + data.user_id + '/tasks?status=all', items.access_token)
				.done(function(response) {
					View.showTasks({ 'name': data.name, 'tasks': response});
				})
				.fail(function (jqXHR, textStatus, errorThrown) {
					console.log(textStatus + ': ' + errorThrown);
				});
		}
	};

	window.Controller = Controller;
})();