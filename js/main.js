$('#get-photos').on('click', function(event) {

    event.preventDefault();
    var flickerUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157666460513283&api_key=c5b40ab3607a2e030c81f44efb35c187&user_id=47846560@N08&nojsoncallback=1&ispublic=1&format=json';
    //Gets a photoset from Flickr API in json format
    $.ajax({
        url: flickerUrl,
        success: function(results) {
            var photoArray = results.photoset.photo;
            $.each(photoArray, function(index, currentPhoto) {
        	
            //Loops through the photos in json and extracts those items required to generate url for thumbnail and full-size photos.
            //id added as label and title as alt so they are available later in the js file.
                
				var oThumbData = {
	 			 	id : currentPhoto.id,
	             	farm : currentPhoto.farm,
	            	server : currentPhoto.server,
	            	secret : currentPhoto.secret,
	             	title : currentPhoto.title
	             };
//data is stored in an object to facilitate appending to index.html
				 $("#galleryTemplate").tmpl(oThumbData).appendTo("#images-container .row");
            
            })

        }
    });
});



$('#images-container').on('click', '.image-item', function(event) {
    //on click of a thumbnail image; the url, title and id are stored as variables
    var imageSelected = $(event.target);
    event.preventDefault();
    var source = imageSelected[0].parentNode.href;
    var imgLabel = imageSelected[0].alt;
    var imgID = imageSelected[0].offsetParent.firstElementChild.firstChild.data;
    

    var exifUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getExif&photo_id=' + imgID + '&api_key=c5b40ab3607a2e030c81f44efb35c187&nojsoncallback=1&format=json';
    //the image ID is used to generate an API to get the exif data for that image in a json format.
    $.ajax({
        url: exifUrl,
        success: function(results) {

            var aExif = results.photo.exif;

            var aFilteredExif = aExif.filter(function(oExif) {
                var itContainsExposure = (oExif.tag === 'ExposureTime' || oExif.tag === 'FNumber' || oExif.tag === 'ISO' || oExif.tag === 'FocalLength');
                return itContainsExposure;
                //due to the large number of items in the exif json it is filtered for the specific tags required. 
            })

            var exposure = aFilteredExif[0].clean._content;
            var fstop = aFilteredExif[1].clean;
            var ISO = aFilteredExif[2].raw;
            var FocalLength = aFilteredExif[3].raw;
            var oImgData = {
 			 	imgLabel : imgLabel,
             	exposure : aFilteredExif[0].clean._content,
            	fstop : aFilteredExif[1].clean._content,
            	ISO : aFilteredExif[2].raw._content,
             	FocalLength : aFilteredExif[3].raw._content,	
             	source : imageSelected[0].parentNode.href
            };
            
 //Exif data is stored in an object to be appended to the existing modal
            // Render the modal posts
            $("#modalTemplate").tmpl(oImgData).prependTo("#modalContainer");
 
   
            $("#myModal").modal('show');

        }

    });



});
