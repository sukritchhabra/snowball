(function($) {

    $("#snowball-main").on("open", ".snowball-block-columns", function() {

      var block = $(this);
      var textarea = block.find(".editors textarea");

      var editor = CodeMirror.fromTextArea(textarea[0], {
        mode: "htmlmixed",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        tabSize: 2,
        theme: "monokai"
      });

      editor.setSize("100%", "100%");

      editor.on("change", function() {
        editor.save();
        textarea.trigger("change");
      });
    });

    $("#snowball-main").on("click", ".snowball-block-columns .add-button", function(event) {
      var block= $(this).closest(".snowball-block-columns");
      var currentCount = block.find(".editors .column-textarea").length;
      addNewTextArea(block, (currentCount + 1));
    });

    $("#snowball-main").on("click", ".snowball-block-columns .toggle-button", function(event) {
      var block = $(this).closest(".snowball-block-columns");
      var selectedIndex = block.find(".toggle-buttons .toggle-button").index($(this));

      block.find(".toggle-buttons .toggle-button").each(function(index, el) {
        if(index === selectedIndex) {
          $(el).addClass("active");
        } else {
          $(el).removeClass("active");
        }
      });
      
      block.find(".CodeMirror").each(function(index, el) {
        if(index === selectedIndex) {
          $(el).show();
        } else {
          $(el).hide();
        }
      });
    });

    function addNewTextArea(block, columnNumber) {
      var newHTML = "";
      var buttonHTML = "";

      newHTML = newHTML + '<textarea class="column-textarea" data-target="col-' + columnNumber + '" style="height: 100%;">';
      newHTML = newHTML + '  <div class="column column-' + columnNumber + '"></div>';
      newHTML = newHTML + '</textarea>';


      buttonHTML = buttonHTML + '<div class="toggle-button toggle-column-' + columnNumber + '">Column ' + columnNumber + '</div>';

      block.find(".editors").append(newHTML);           //Adding new Editor
      block.find(".toggle-buttons").append(buttonHTML); //Adding new Button

      /* Trying to add data-target to template side */
      //block.find(".snowball-preview").contents().find("body .row").append("{{col-" + columnNumber + "}}");

      var textarea = block.find(".editors .column-textarea:last-child");
      var editor = CodeMirror.fromTextArea(textarea[0], {
        mode: "htmlmixed",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        tabSize: 2,
        theme: "monokai"
      });

      editor.setSize("100%", "100%");

      editor.on("change", function() {
        editor.save();
        textarea.trigger("change");
      });

      block.find(".CodeMirror:not(:last-of-type)").hide();  //Displaying only last added CodeMirror
    }
})(jQuery);
