(function(root){
	var PT = root.PT = ( root.PT || {} );

	var PhotosListView = PT.PhotosListView = function() {
		this.$el = $('<div>');
		this.$el.on('click', 'a', this.showDetail.bind(this));
		PT.Photo.on("add", this.render.bind(this));
	}

	_.extend(PhotosListView.prototype, {
		render: function() {
			this.$el.empty();
			var list = $('<ul>');
			PT.Photo.all.forEach(function(photo) {

				var newLi = $('<li>');
				var link = $('<a>');

				link.attr('href', '#');
				link.attr('data-id', photo.get('id'));

				link.text(photo.get('title'));

				newLi.append(link);
				list.append(newLi);

			});
			this.$el.append(list);
			return this;
		},

		showDetail: function(event) {
			event.preventDefault();
	    var link = $(event.currentTarget);

			console.log(link);
			console.log(link.attr('data-id'));

			var photo = PT.Photo.find(link.attr('data-id'));

			console.log(photo);

			PT.showPhotoDetail(photo);
		}
	});

})(this);