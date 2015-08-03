(function($) {

    $("#snowball-main").on("open", ".snowball-block-columns", function() {

      console.log('hello world');
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

      /*Trying to mark the <div> and </div> as readOnly*/
      editor.markText({line:0,ch:0}, {line:0,ch:30}, {readOnly: true, atomic: true});
      editor.markText({line:1,ch:0}, {line:1,ch:7}, {readOnly: true, atomic: true});

      editor.on("change", function() {
        editor.save();
        textarea.trigger("change");
      });
    });

    $("#snowball-main").on("click", ".snowball-block-columns .add-button", function(event) {
      var block= $(this).closest(".snowball-block-columns");
      var currentCount = block.find(".editors .column-textarea").length;
      if(currentCount <= 3) {
        addNewTextArea(block, (currentCount + 1));
      }
      block.trigger("render");
    });

    $("#snowball-main").on("click", ".snowball-block-columns .fa-times", function(event) {
      if(confirm("Are you yure you want to delete this column?")) {
        var block = $(this).closest(".snowball-block-columns");
        var button = $(this).closest(".toggle-button");
        var selectedIndex = block.find(".toggle-buttons .toggle-button").index(button);

        block.find(".column-textarea").eq(selectedIndex).remove();
        block.find(".CodeMirror").eq(selectedIndex).remove();
        block.find(".CodeMirror").eq((selectedIndex - 1)).show();
        button.remove();
        activateSelectedButton(block, (selectedIndex-1));

        //Done so that ratio between columns is maintained in the preview
        block.find(".snowball-preview").contents().find("body .row .column").eq(selectedIndex).remove();
      }
    });


    $("#snowball-main").on("click", ".snowball-block-columns .toggle-button", function(event) {
      var block = $(this).closest(".snowball-block-columns");
      var selectedIndex = block.find(".toggle-buttons .toggle-button").index($(this));

      activateSelectedButton(block, selectedIndex);

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
      newHTML = newHTML + '<div class="column column-' + columnNumber + '">\n</div>';
      newHTML = newHTML + '</textarea>';

      buttonHTML = buttonHTML + '<div class="toggle-button toggle-column-' + columnNumber + '">Column ' + columnNumber + '<span class="fa fa-times"></span></div>';

      block.find(".editors").append(newHTML);           //Adding new Editor
      block.find(".toggle-buttons").append(buttonHTML); //Adding new Button
      activateSelectedButton(block, (columnNumber - 1));

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

      /*Trying to mark the <div> and </div> as readOnly*/
      editor.markText({line:0,ch:0}, {line:0,ch:30}, {readOnly: true, atomic: true});
      editor.markText({line:1,ch:0}, {line:1,ch:7}, {readOnly: true, atomic: true});

      editor.on("change", function() {
        editor.save();
        textarea.trigger("change");
      });

      block.find(".CodeMirror:not(:last-of-type)").hide();  //Displaying only last added CodeMirror
    }

    function activateSelectedButton(block, selection) {
      block.find(".toggle-buttons .toggle-button").each(function(index, el) {
        if(index === selection) {
          $(el).addClass("active");
        } else {
          $(el).removeClass("active");
        }
      });
    }
})(jQuery);
