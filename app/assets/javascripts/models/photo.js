(function(root){
	var PT = root.PT = ( root.PT || {} );

	var Photo = PT.Photo = function (attributes) {
		this.attributes = attributes;
	}

	_.extend(Photo.prototype, {
		get: function (attr_name) { return this.attributes[attr_name]; },

		set: function (attr_name, val) { return this.attributes[attr_name] = val; },

		create: function (callback) {
			if(this.attributes["id"]) {
				return;
			}

			$.ajax({
				type: "POST",
				url: "/api/photos",
				data: { photo: this.attributes },
				success: function(response) {
					callback(response);
					Photo.trigger("add");
				}
			});
		},

		update: function (callback) {
			$.ajax({
				type: "PUT",
				url: "/api/photos" + this.attributes["id"],
				data: { photo: this.attributes },
				success: function(response) {
					callback(response);
				}
			});
		},

		save: function (callback) {
			if(this.attributes["id"]) {
				this.update(this.merge_attrs.bind(this));
			} else {
				this.create(callback);
			}
		},

		merge_attrs: function (attributes) {
			_.extend(this.attributes, attributes);
		}
	});

	_.extend(Photo, {
		fetchByUserId: function(userId, callback) {
			$.ajax({
				type: "GET",
				url: "/api/users/" + userId + "/photos/",
				success: function(response) {
					var photoArray = response.map(function(photo) {
						return new Photo(photo);
					});

					Photo.all = photoArray;
					Photo.trigger("add");

					callback(photoArray);
				}
			});
		},

		all: [],

		_events: {},

		on: function(eventName, callback) {
			Photo._events[eventName] = ( Photo._events[eventName] || [] );
			Photo._events[eventName].push(callback);
		},

		trigger: function(eventName) {
			Photo._events[eventName].forEach(function(callback) {
				callback();
			});
		},

		find: function(photoId) {
			return _.select(Photo.all, function(photo) {
				return photo.attributes['id'] == photoId;
			});
		}
	});
})(this);
