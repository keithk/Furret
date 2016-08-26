$(function() {
  // Builds a canvas with fabric
  var canvas = new fabric.Canvas('c');

  // Set some boundries on what the user can put in the canvas, because it resizes
  var maxWidth = 700;
  var maxHeight = 700;
  // What filetype are we getting in /images/ ?
  var fileType = 'png';

  // When the user uploads an image, displays it in the canvas
  $('#file').on('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
        var width = (img.width > maxWidth) ? maxWidth : img.width;
        var height = (img.height > maxWidth) ? maxHeight : img.height;

        var oImg = img.set({top: 0,
          left: 0,
          height: height,
          width: width});

        // Changing the size of the canvas based on the image.
        canvas.setWidth(height);
        canvas.setHeight(width);

        // You shouldn't be able to move or select the bottom layer (the uploaded image)
        oImg.hasControls = false;
        oImg.selectable = false;

        canvas.add(oImg).renderAll();
        var a = canvas.setActiveObject(oImg);
        var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
      });
    };
    reader.readAsDataURL(file);
  });


  // The download button - when you click it, it applies the value of the canvas into an image.
  var downloadButton = $('#btn-download');
  downloadButton.on('click', function(e) {
    canvas.discardActiveObject();
    canvas.renderAll();
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    $('.save').attr({
      'download': 'saved.png',  /// set filename
      'href'    : image              /// set data-uri
    });
  });

  // Clicking on a sprite applies it to the canvas
  $('#sprites').on('click', '.sprite', function() {
    var id = $(this).attr('data-id');
    var file = 'images/' + id + '.'+fileType;
    fabric.Image.fromURL(file, function (img) {
      var oImg = img.set({left: 0, top: 0, angle: 00,width:img.width, height:img.height});
      oImg.hasBorder = false;
      canvas.add(oImg).renderAll();
      var a = canvas.setActiveObject(oImg);
      var dataURL = canvas.toDataURL({format: 'png', quality: 1});
    });
  });


  // Build out the list of sprites
  var sprites = 493; // Number of sprites in the /images folder
  for (i = 1; i <= sprites; i++) {
    $('#sprites').append("<img src='images/"+i+"."+ fileType +"' class='sprite' data-id='"+i+"'>");
  }
});
