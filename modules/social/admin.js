(function($) {
  $(".snowball-main").on("open", ".snowball-block-social", function() {
    var block = $(this);
    var likeURL = $(this).find("[data-target='fbURL']").val();
    var twitterUsername = $(this).find("[data-target='twitterUsername']").val();
    console.log("found: " + JSON.stringify(likeURL));

    var fbHTML = "<div class=\"fb-like\" data-href=\"" + likeURL + "\" data-layout=\"standard\" data-action=\"like\" data-show-faces=\"true\" data-share=\"true\"></div>\n";
    var twitterHTML = "<a href=\"https://twitter.com/" + twitterUsername + "\" class=\"twitter-follow-button\" data-show-count=\"false\">Follow @" + twitterUsername + "</a>";

    if (block.find("[data-target='checkbox-fb']").is(":checked")) {
      block.find(".snowball-facebook").val(fbHTML);
    } else {
      block.find(".snowball-facebook").val("");
    }

    if (block.find("[data-target='checkbox-twitter']").is(":checked")) {
      block.find(".snowball-twitter").val(twitterHTML);
    } else {
      block.find(".snowball-twitter").val("");
    }

    block.trigger("render");
  });

  $(".snowball-main").on("click", "[data-target='checkbox-fb']", function() {
    console.log("click registered on fb checkbox");
    console.log("status: " + $(this).is(":checked"));
    var block = $(this).parents(".snowball-block-social");
    var likeURL = block.find("[data-target='fbURL']");
    var fbHTML = "<div class=\"fb-like\" data-href=\"" + likeURL + "\" data-layout=\"standard\" data-action=\"like\" data-show-faces=\"true\" data-share=\"true\"></div>\n";

    if ($(this).is(":checked")) {
      block.find(".snowball-facebook").val(fbHTML);
    } else {
      console.log("entering else");
      block.find(".snowball-facebook").val("");
    }

    block.trigger("render");
  });

  $(".snowball-main").on("click keyup", "[data-target='checkbox-twitter']", function() {
    var block = $(this).parents(".snowball-block-social");
    var twitterUsername = block.find("[data-target='twitterUsername']").val();
    var twitterHTML = "<a href=\"https://twitter.com/" + twitterUsername + "\" class=\"twitter-follow-button\" data-show-count=\"false\">Follow @" + twitterUsername + "</a>";

    if ($(this).is(":checked")) {
      block.find(".snowball-twitter").val(twitterHTML);
    } else {
      console.log("entering else");
      block.find(".snowball-twitter").val("");
    }

    block.trigger("render");
  });

  $(".snowball-main").on("keyup", "[data-target='twitterUsername']", function() {
    var block = $(this).parents(".snowball-block-social");
    var twitterUsername = block.find("[data-target='twitterUsername']").val();
    var twitterHTML = "<a href=\"https://twitter.com/" + twitterUsername + "\" class=\"twitter-follow-button\" data-show-count=\"false\">Follow @" + twitterUsername + "</a>";

    block.find(".snowball-twitter").val(twitterHTML);
    block.trigger("render");
  });

})(jQuery);