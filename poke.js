$(function() {
  var canvas = new fabric.Canvas('c');
  document.getElementById('file').addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
        var maxWidth = 700;
        var maxHeight = 700;
        var width = (img.width > maxWidth) ? maxWidth : img.width;
        var height = (img.height > maxWidth) ? maxHeight : img.height;

        var oImg = img.set({top: 0,
          left: 0,
          height: height,
          width: width});
        canvas.setWidth(height);
        canvas.setHeight(width);

        oImg.hasControls = false;
        oImg.selectable = false;
        canvas.add(oImg).renderAll();
        var a = canvas.setActiveObject(oImg);
        var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
      });
    };
    reader.readAsDataURL(file);
  });

  var button = document.getElementById('btn-download');
  button.addEventListener('click', function (e) {
    canvas.discardActiveObject();
    canvas.renderAll();
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    $('.save').attr({
      'download': 'pokemon.png',  /// set filename
      'href'    : image              /// set data-uri
    });
  });

  $('#pokemon').on('click', '.sprite', function() {
    var id = $(this).attr('data-id');
    var file = 'pokemon/' + id + '.png';
    fabric.Image.fromURL(file, function (img) {
      var oImg = img.set({left: 0, top: 0, angle: 00,width:img.width, height:img.height});
      oImg.hasBorder = false;
      canvas.add(oImg).renderAll();
      var a = canvas.setActiveObject(oImg);
      var dataURL = canvas.toDataURL({format: 'png', quality: 1});
    });
  });

  var pokemon = 493; // Maximum number of pokemon
  for (i = 1; i <= pokemon; i++) {
    $('#pokemon').append("<img src='pokemon/"+i+".png' class='sprite' data-id='"+i+"'>");
  }
});
