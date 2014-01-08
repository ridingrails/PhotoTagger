(function(root){
	var PT = root.PT = ( root.PT || {} );

	var PhotoDetailView = PT.PhotoDetailView = function(photo) {
		this.$el = $($('<div>'));
		this.photo = photo;
		this.$el.on('submit', 'form', this.back.bind(this));
	}

	_.extend(PhotoDetailView.prototype, {
		render: function() {
			this.$el
				.empty()
				.append(JST["photo_detail"]({ photo: this.photo }));
		},
		back: function () {
			PT.showPhotosIndex();
		}
	});

})(this);