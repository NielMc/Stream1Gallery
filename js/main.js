$('#get-photos').on('click', function(event) {

	event.preventDefault();
    var flickerUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157666460513283&api_key=c5b40ab3607a2e030c81f44efb35c187&user_id=47846560@N08&nojsoncallback=1&ispublic=1&format=json';

    $.ajax({
        url: flickerUrl,
        success: function(results) {
            var photoArray = results.photoset.photo;
            var galleryThumb = "";

            $.each(photoArray, function(index, photoi) {
                var openDiv, img, link, closeDiv;
                var imageItem;

                openDiv = '<div class="image-item col-lg-3">';
                divLabel = '<label class="hidden">' + photoi.id + '</label>';
                img = '<img src="';
                img += 'https://farm' + photoi.farm + '.staticflickr.com/' + photoi.server + '/' + photoi.id + '_' + photoi.secret + '_q.jpg ';
                img += '" alt="' + photoi.title + '">';

                link = '<a data-target="#myModal" href="';
                link += 'https://farm' + photoi.farm + '.staticflickr.com/' + photoi.server + '/' + photoi.id + '_' + photoi.secret + '_b.jpg ' + '" class="thumbnail">';
                link += img + '</a>';

                closeDiv = '</div>';

                imageItem = openDiv + divLabel + link + closeDiv;

                galleryThumb += imageItem;

            })

            $('#images-container .row').html(galleryThumb);

            // $('.col-lg-3').on('click', function() {
            //     $('a.thumbnail').html();
            //     debugger;

            // });


        }
    });
});

// $('#myModal').on('shown.bs.modal', function () {
// 		alert('Modal is successfully shown!');
// });

$('#images-container').on('click', '.image-item', function(event) { 
 
	var imageSelected = $(event.target);
	event.preventDefault();
	var source = imageSelected[0].parentNode.href;
	var imgLabel = imageSelected[0].alt;
	var imgID = imageSelected[0].offsetParent.firstElementChild.firstChild.data;
	var imageModal = "";
	

	console.log(imgID);
	var exifUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getExif&photo_id=' + imgID + '&api_key=c5b40ab3607a2e030c81f44efb35c187&nojsoncallback=1&format=json';
	$.ajax({
        url: exifUrl,
        success: function(results) {
        	
        	var aExif = results.photo.exif;
        	
        	var aFilteredExif = aExif.filter(function( oExif ) {
        		var itContainsExposure = (oExif.tag === 'ExposureTime'||oExif.tag === 'FNumber'||oExif.tag === 'ISO'||oExif.tag === 'FocalLength');
        		return itContainsExposure;
        	}) 
        	
			var exposure = aFilteredExif[0].clean;
			var fstop = aFilteredExif[1].clean;
			var ISO = aFilteredExif[2].raw;
			var FocalLength = aFilteredExif[3].raw;
			console.log(exposure);
			console.log(fstop);
			console.log(ISO);
			console.log(FocalLength);

			var myModalDiv, dialogDiv, contentDiv, headerDiv, closeButton, imgTitle, bodyDiv, footerDiv, divClose, openFig, closeFig, footerDiv, buttonClose, buttonSave
			myModalDiv = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
		  	dialogDiv = '<div class="modal-dialog" role="document">'
		    contentDiv = '<div class="modal-content">'
		    headerDiv = '<div class="modal-header">'
		    closeButton = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		    imgTitle = '<h4 class="modal-title" id="myModalLabel">' + imgLabel + '</h4>'
		    divClose = '</div>'
		    bodyDiv = '<div class="modal-body">'
		    openFig = '<figure id="image-container">' 
		    createImg = '<img id="large-image" src="' + source + '" height="35%">'
		    closeFig = '</figure>'   
		     // '</div>'
		    footerDiv = '<div class="modal-footer">'
		    exifData = '<p>Exp: ' + exposure._content + ', fstop: ' + fstop._content + ', Focal Length: ' + FocalLength._content +' & ISO: ' + ISO._content + '.</p>';
		    buttonClose = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
		    buttonSave = '<button type="button" class="btn btn-primary">Save changes</button>'
		    //  </div>
		    //</div>
		 // </div>
		//</div>
			imageModal += myModalDiv + dialogDiv + contentDiv + headerDiv + closeButton + imgTitle + divClose + bodyDiv + openFig + createImg + closeFig + divClose + exifData + footerDiv + buttonClose + buttonSave + divClose + divClose + divClose + divClose;
			

			$('#newModal').html(imageModal);
			var slider, sliderDiv, newForm, formClose, sliderP, reset
			sliderDiv = '<div class="sliders">'
			newForm =	'<form id="imageEditor">'
			sliderP = '<p> <label for="greyscale">Grayscale</label> <input id="greyscale" name="greyscale" type="range" min=0 max=250 value=0></p>'
			formClose = '</form>'
			reset = '<input type="reset" form="imageEditor" id="reset" value="Reset" />'

			slider = sliderDiv + newForm + sliderP + reset + formClose + divClose;
			$('.modal-footer').html(slider);

			console.log('before showing the modal window we change the content to be shown');
			 $("#myModal").modal('show');





		
		}

	});
	
			
	
});

$(document).ready(function(){
function editImage() {
	var greyscale_value= $("#greyscale").val();
	$("img").css("-webkit-filter", 'grayscale(' + greyscale_value +'%)');
}



//When sliders change image will be updated via editImage() function
$("input[type=range]").change(editImage).mousemove(editImage);

// Reset sliders back to their original values on press of 'reset'
$('#imageEditor').click('reset', function () {
	setTimeout(function() {			/* setTimeout 0 - run function instantly.*/
		editImage();
	},0);
});
	
})