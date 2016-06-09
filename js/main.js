$('#get-photos').on('click', function(event) {

    event.preventDefault();
    var flickerUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157666460513283&api_key=c5b40ab3607a2e030c81f44efb35c187&user_id=47846560@N08&nojsoncallback=1&ispublic=1&format=json';
    //Gets a photoset from Flickr API in json format
    $.ajax({
        url: flickerUrl,
        success: function(results) {
            var photoArray = results.photoset.photo;
            var galleryThumb = "";
            console.log (photoArray);
            $.each(photoArray, function(index, currentPhoto) {
            	console.log(arguments);
            	//console.log(currentPhoto);
            	console.log(currentPhoto.id);
            	console.log(currentPhoto.farm);
                // var id, farm, server, secret, title;
                // var imageItem;
                //Loops through the photos in json and extracts those items required to generate url for thumbnail and full-size photos.
                //id added as label and title as alt so they are available later in the js file.
                // openDiv = '<div class="image-item col-lg-3">';
                // divLabel = '<label class="hidden">' + photoi.id + '</label>';
                // img = '<img class="img-hvr hvr-7" src="';
                // img += 'https://farm' + photoi.farm + '.staticflickr.com/' + photoi.server + '/' + photoi.id + '_' + photoi.secret + '_q.jpg ';
                // img += '" alt="' + photoi.title + '">';

                // link = '<a data-target="#myModal" href="';
                // link += 'https://farm' + photoi.farm + '.staticflickr.com/' + photoi.server + '/' + photoi.id + '_' + photoi.secret + '_b.jpg ' + '" class="thumbnail clearview">';
                // link += img + '</a>';

                // closeDiv = '</div>';

                // imageItem = openDiv + divLabel + link + closeDiv;

                // galleryThumb += imageItem;



				var oThumbData = {
	 			 	id : currentPhoto.id,
	             	farm : currentPhoto.farm,
	            	server : currentPhoto.server,
	            	secret : currentPhoto.secret,
	             	title : currentPhoto.title
	             };

				 $("#galleryTemplate").tmpl(oThumbData).appendTo("#images-container .row");
            
            })

            // $('#images-container .row').html(galleryThumb);

            //Generates html for thumbnails.

            
 
            // Render the modal posts
            

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
    var imageModal = "";

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

 			// var oImgData = {
 			// 	imgLabel : imgLabel,
    //         	exposure : aFilteredExif[0].clean._content,
    //         	fstop : aFilteredExif[1].clean._content,
    //         	ISO : aFilteredExif[2].raw._content,
    //         	FocalLength : aFilteredExif[3].raw._content	
    //         }

 
            var oImgData = {
 			 	imgLabel : imgLabel,
             	exposure : aFilteredExif[0].clean._content,
            	fstop : aFilteredExif[1].clean._content,
            	ISO : aFilteredExif[2].raw._content,
             	FocalLength : aFilteredExif[3].raw._content,	
             	source : imageSelected[0].parentNode.href
            };
 
            // Render the modal posts
            $("#modalTemplate").tmpl(oImgData).appendTo("#modalContainer");
 
   


		// <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		// 	<div class="modal-dialog" role="document">	
		// 		<div class="modal-content">
		// 			<div class="modal-header">
		// 				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		// 					<span aria-hidden="true">&times;</span>
		// 				</button>		
		// 				<h4 class="modal-title" id="myModalLabel">${imgLabel}</h4>	
		// 			</div>
		// 		<div class="modal-body">
		// 		<figure id="image-container">
		// 			<img id="large-image" class="img-responsive" src="' + source + '" height="35%">
		// 		</figure>
		// 		<div class="modal-footer">
		// 			<p>Exp: ${exposure}, fstop:  ${fstop}, Focal Length: ${FocalLength} and ISO:  ${ISO}.</p>
		// 		</div>
		// 	</div>
		// </div>
            // var myModalDiv, dialogDiv, contentDiv, headerDiv, closeButton, imgTitle, bodyDiv, footerDiv, divClose, openFig, closeFig, footerDiv, buttonClose, buttonSave
            // myModalDiv = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
            // dialogDiv = '<div class="modal-dialog" role="document">'
            // contentDiv = '<div class="modal-content">'
            // headerDiv = '<div class="modal-header">'
            // closeButton = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
            // imgTitle = '<h4 class="modal-title" id="myModalLabel">' + imgLabel + '</h4>'
            // divClose = '</div>'
            // bodyDiv = '<div class="modal-body">'
            // openFig = '<figure id="image-container">'
            // createImg = '<img id="large-image" class="img-responsive" src="' + source + '" height="35%">'
            // closeFig = '</figure>'
            // footerDiv = '<div class="modal-footer">'
            // exifData = '<p>Exp: ' + exposure._content + ', fstop: ' + fstop._content + ', Focal Length: ' + FocalLength._content + ' & ISO: ' + ISO._content + '.</p>';
           


            // buttonClose = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            // buttonSave = '<button id="slider" type="button" class="btn btn-primary">Save changes</button>'
            //a modal is created containing the title, full-size image and exif data.

            // imageModal += myModalDiv + dialogDiv + contentDiv + headerDiv + closeButton + imgTitle + divClose + bodyDiv + openFig + createImg + closeFig + divClose + exifData + footerDiv + /* buttonClose + buttonSave + */ divClose + divClose + divClose + divClose;

            // $('#newModal').html(imageModal);


		 //    var slider, sliderDiv, newForm, formClose, sliderP, reset
		 //    sliderDiv = '<div class="sliders">'
		 //    newForm = '<form id="imageEditor">'
		 //    sliderP = '<p> <label for="greyscale">Grayscale</label> <input id="greyscale" name="greyscale" type="range" min=0 max=250 value=0></p>'
		 //    formClose = '</form>'
		 //    reset = '<input type="reset" form="imageEditor" id="reset" value="Reset" />'
		 //    divClosure = '</div>'

		 //    slider = sliderDiv + newForm + sliderP + reset + formClose + divClosure;
		    
			// $('#newModal .modal-body').append( $(slider) )
		    // $('.modal-footer').html(slider);



            $("#myModal").modal('show');

        }

    });



});
$('#slider').on('click', function(event) {

});