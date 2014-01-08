(function(root){
	var PT = root.PT = ( root.PT || {} );

	var PhotosFormView = PT.PhotosFormView = function() {
		this.$el = $($('<div>'));
		this.$el.on('submit', 'form', this.submit.bind(this));
	}

	_.extend(PhotosFormView.prototype, {
		render: function() {
			this.$el
				.empty()
				.append(JST["photo_form"]);
		},

		submit: function (event) {
			event.preventDefault();
	    var form = $(event.currentTarget);
	    var photoData = form.serializeJSON();
			var newPhoto = new PT.Photo(photoData);
			var that = this;

			newPhoto.create( function(response) {
				PT.Photo.all.push(new Photo(response));
				that.render.bind(that)();
			} );
		}
	});

})(this);