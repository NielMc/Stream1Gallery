# Stream1Gallery
***
##This web based front end app displays images and exif data from Flickr galleries. 
####UX
>The interface is fully responsive utilising Bootstrap to ensure the brand and header remain at the edge of the window and the nav bar collapses to an icon on small mobile screen sizes.  

####CSS3
>Two complementary fonts were chosen and the button uses a glyphicon to draw attention to its purpose. The fonts are linked from google fonts and have shadowing and background 60% transparency to highlight them against the photo background. The colour palette is a grayscale semantic scheme to ensure all parts of the interface match. The background image was chosen to emphasise the purpose of the web app and is centred with css so it is responsive to device screen size.  

####HTML5
>The index page is laid out with HTML5 semantic tags. The gallery and modal are laid out in the html although the content is created on the fly through clicks. The thumbnail images magnify on hover and the modal background is black to ensure the large jpg image can be viewed clearly. The contact page mirrors the layout and style of the index page but also includes a flickr logo bar.  

####Ajax
>Flickr provide a rest API which provides image data in a json format. On clicking the button ajax is used to loop through the json file and extract the data required to generate the thumbnail uri. The photo title and id are also gathered  for identification. This is stored in an object. All the thumbnail images are displayed in a gallery.  

####Jquery
>On click of a thumbnail image the photo ID is used to generate a Flickr API uri to pull the exif data as a json. Ajax is used to loop through the json and filter out the required exif values. This is necessary as the exif data json varies depending on the camera mode or type. The resulting exif data is stored in an object and is prepended to the modal. The append and prepend of objects to the html is done with jquery tmpl.  
