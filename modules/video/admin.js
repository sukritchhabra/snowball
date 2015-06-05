(function($) {

  $(".snowball-main").on("open", ".snowball-block-video", function() {
    var videoUrl = $(this).find(".video-url").val();
    var videoID = parseVideoURL(videoUrl);

    $(this).find(".video-id").val(videoID);
    $(this).find(".video-id").trigger("change");
  });

  $(".snowball-main").on("change keyup", ".snowball-block-video .video-url", function() {
    var block = $(this).parents(".snowball-block-video");
    var videoUrl = $(this).val();
    console.log("url after keyup: " + videoUrl);
    var videoID = parseVideoURL(videoUrl);

    block.find(".video-id").val(videoID);
    block.find(".video-id").trigger("change");
  });

  $(".snowball-main").on("click", ".snowball-block-video .full-width-checkbox", function() {
    console.log("registered click!!!!!!!!");
    var block = $(this).parents(".snowball-block-video");
    
    console.log("full-width value: " + $(this).val());
    console.log("is checked: " + $(this).prop("checked"));
    var checkedStatus = $(this).prop("checked");

    if (checkedStatus == false) {
      block.find(".custom-style").val("");
    } else {
      block.find(".custom-style").val("width:100%; height:55.6vw;");
    }

    block.find(".video-url").trigger("keyup");

    /*var selectedSize = $(this).val();
    var width = selectedSize.split("x")[0];
    var height = selectedSize.split("x")[1];
    
    console.log("width: " + width);
    console.log("height: " + height);

    block.find(".frame-width").val(width);
    block.find(".frame-height").val(height);

    block.find(".video-url").trigger("keyup");*/
  });

  function parseVideoURL(videoUrl) {
    var re = /youtube.com.*v=(.*)/;
    var matches = re.exec(videoUrl);
    console.log("Sending: " + matches[1]);
    
    return matches[1];
  }
})(jQuery);
