(function() {
	'use strict';
	var View = {
		logoTemplate: '<div class="brand-logo center">Time Doctor Test</div>',
		navTemplate: function() {
			return  '<div class="brand-logo center">Time Doctor Test</div>'
			+       '<ul class="left" id="backBtn">'
			+           '<li><a href="#!"><i class="material-icons">arrow_back</i></a></li>'
			+       '</ul>'
			+       '<ul class="right">'
			+           '<li><a href="#!" id="logoutBtn"><i class="material-icons">power_settings_new</i></a></li>'
			+       '</ul>';
		},
		authTemplate: function() {
			return  '<div class="authContent">'
			+           '<div class="authBtn">'
			+               '<button class="waves-effect waves-light btn-large orange darken-2" id="authenticate">Authenticate</button>'
			+           '</div>'
			+       '</div>';
		},
		mainTemplate: function () {
			return  '<div class="collection with-header" id="collection">'
			+           '<div class="collection-header noPadding center" id="headerTxt"></div>'
			+       '</div>';
		},
		loaderTemplate: function() {
			return  '<div class="authContent">'
			+           '<div class="authBtn">'
			+               '<img src="../img/clock.gif" alt="Loading..."/>'
			+           '</div>'
			+       '</div>';
		},
		itemTemplate: function () {
			return  '<a href="#!" class="collection-item avatar" data-id="{{id}}" data-name="{{name}}">'
			+           '<i class="material-icons circle">{{icon}}</i>'
			+           '<span class="title">{{title}}</span>'
			+           '<p>{{first}} <br> {{second}}</p>'
			+           '<span class="secondary-content"><span class="new badge orange darken-2" data-badge-caption="{{type}}">{{badge}}</span></span>'
			+       '</a>';

		},
		initAuth: function () {
			$('#navBtns').html(this.logoTemplate);
			$('#content').html(this.authTemplate());
			$('#authenticate').on('click', function () {
				TimeDoctor.authenticate();
			});
		},
		initLoader: function () {
			$('#navBtns').html(this.navTemplate());
			$('#backBtn').hide();
			$('#logoutBtn').on('click', function () {
				TimeDoctor.logout(function () {
					this.initAuth();
				});
			});

			$('#content').html(this.loaderTemplate());
		},
		showUsers: function (data) {
			$('#content').html(this.mainTemplate());
			$('#headerTxt').html('<h5>' + data.company.accounts[0].company_name + '</h5>');

			var i, l,
				view = '',
				users = data.users.users;

			for (i = 0, l = users.length; i < l; i++) {
				var template = this.itemTemplate();

				template = template.replace('{{icon}}', 'person');
				template = template.replace('{{id}}', users[i].user_id);
				template = template.replace('{{name}}', users[i].full_name);
				template = template.replace('{{title}}', users[i].full_name);
				template = template.replace('{{first}}', users[i].level);
				template = template.replace('{{second}}', users[i].work_status.info);
				template = template.replace('{{badge}}', users[i].tasks.all.count);
				template = template.replace('{{type}}', 'Task(s)');

				view = view + template;
			}

			$('#collection').append(view);

			$('#collection').on('click', 'a', function() {
				var user_id = $(this).attr('data-id');
				var name = $(this).attr('data-name');

				Controller.listTasks({
					'company_id': data.company.accounts[0].company_id,
					'user_id': user_id,
					'name': name
				});
			});
		},
		showTasks: function (data) {
			$('#content').html(this.mainTemplate());
			$('#backBtn').show();
			$('#headerTxt').html('<h5>' + data.name + '\'s Task(s)</h5>');

			var i, l,
				view = '',
				tasks = data.tasks.tasks;

			for (i = 0, l = tasks.length; i < l; i++) {
				var template = this.itemTemplate(),
					project_name = '';

				if (tasks[i].project_id != 'null') {
					project_name = tasks[i].project_name;
				}

				template = template.replace('{{icon}}', 'folder');
				template = template.replace('{{id}}', tasks[i].task_id);
				template = template.replace('{{name}}', tasks[i].task_name);
				template = template.replace('{{title}}', tasks[i].task_name);
				template = template.replace('{{first}}', project_name);
				template = template.replace('{{second}}', '');
				template = template.replace('{{badge}}', tasks[i].active ? 'Active' : 'Inactive');
				template = template.replace('{{type}}', '');

				view = view + template;
			}

			$('#collection').append(view);

			$('#backBtn').on('click', function() {
				Controller.listUsers();
			});
		}
	};

	window.View = View;
})();