(function($) {
  $(".snowball-main").on("open", ".snowball-block-social", function() {
    var block = $(this);
    var url = $(this).find("[data-target='fbURL']").val();
    console.log("found: " + JSON.stringify(url));
    var HTML = "<div class=\"fb-like\" data-href=\"" + url + "\" data-layout=\"standard\" data-action=\"like\" data-show-faces=\"true\" data-share=\"true\"></div>\n";

    if (block.find("[data-target='checkbox-fb']").is(":checked")) {
      block.find(".snowball-facebook").val(HTML);
    } else {
      block.find(".snowball-facebook").val("");
    }

    block.trigger("render");
  });

  $(".snowball-main").on("click", "[data-target='checkbox-fb']", function() {

    console.log("click registered on fb checkbox");
    console.log("status: " + $(this).is(":checked"));
    var block = $(this).parents(".snowball-block-social");
    var url = block.find("[data-target='fbURL']");
    var HTML = "<div class=\"fb-like\" data-href=\"" + url + "\" data-layout=\"standard\" data-action=\"like\" data-show-faces=\"true\" data-share=\"true\"></div>\n";
    
    if ($(this).is(":checked")) {
      block.find(".snowball-facebook").val(HTML);
    } else {
      console.log("entering else");
      block.find(".snowball-facebook").val("");
    }

    block.trigger("render");
  });

})(jQuery);