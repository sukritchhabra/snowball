(function($) {

  $(".snowball-main").on("open", ".snowball-block-video", function() {
    var videoUrl = $(this).find(".video-url").val();
    console.log("videoUrl: " + videoUrl);
    var videoID = parseVideoURL(videoUrl);
    $(this).find("video-id").val(videoID);
  });

  $(".snowball-main").on("change keyup", ".snowball-block-video .video-url", function() {
    var block = $(this).parents(".snowball-block-video");
    var videoUrl = $(this).val();
    var videoID = parseVideoURL(videoUrl);
  });

  $(".snowball-main").on("click", ".snowball-block-video .frame-size", function() {
    var block = $(this).parents(".snowball-block-video");
    var selectedSize = $(this).val();
    var width = selectedSize.split("x")[0];
    var height = selectedSize.split("x")[1];

    console.log("width: "+ width);
    console.log("height: "+ height);

    block.find(".frame-width").val(width);
    block.find(".frame-height").val(height);

    block.find(".video-url").trigger("keyup");
  });

  function parseVideoURL(videoUrl) {
    var re = /youtube.com.*v=(.*)/;
    var matches = re.exec(videoUrl);
    console.log("matches: " + matches);
    console.log("sending: " + matches[1]);
    return matches[1];  //returning videoID
  }
})(jQuery);
