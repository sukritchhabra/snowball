(function ($) {

    $("#snowball-main").on("open", ".snowball-block-columns", function() {

      console.log("hello world");
      var block = $(this);
      var textarea;
      block.find('[type="checkbox"]').each(function(index, el) {
        console.log('checking: ' + index);

        if($(this).prop('checked')) {
          console.log("was checked");
          textarea = block.find('.column-textarea').eq(index);
          initializeEditorAt(textarea);
          block.find('.toggle-button').eq(index).addClass('activeButton');
        }
      });

      $('.CodeMirror').hide();
      $('.CodeMirror').eq(0).show();
      $('.toggle-button').eq(0).addClass('active');
    });

    function initializeEditorAt(textarea) {
      console.log(textarea);
      var editor = CodeMirror.fromTextArea(textarea[0], {
        mode: "htmlmixed",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        tabSize: 2,
        theme: "monokai"
      });

      editor.setSize("100%", "100%");

      // Trying to mark the <div> and </div> as readOnly
      editor.markText({line:0,ch:0}, {line:0,ch:30}, {readOnly: true, atomic: true});
      editor.markText({line:1,ch:0}, {line:1,ch:7}, {readOnly: true, atomic: true});

      editor.on("change", function() {
        editor.save();
        textarea.trigger("change");
      });

      textarea.data('codeMirrrorInstance', editor);
      console.log(textarea.data('codeMirrrorInstance'));
    }


    $("#snowball-main").on("click", ".snowball-block-columns .toggle-button", function(event) {
      var block = $(this).closest(".snowball-block-columns");
      var selectedIndex = block.find(".toggle-buttons .toggle-button").index($(this));

      activateSelectedButton(block, selectedIndex);
    });

    $("#snowball-main").on("click", ".snowball-block-columns .add-button", function(event) {
      console.log('clicked plus button');

      var block= $(this).closest(".snowball-block-columns");
      console.log("entering each");
      block.find('[type="checkbox"]').each(function(index, el) {
        if(!($(this).prop('checked'))) {
          console.log("found unchecked at: " + index);
          addNewColumn(block, index);
          return false;
        }
      });
    });

    function addNewColumn(block, selection) {
      block.find(".toggle-button").eq(selection).addClass("activeButton");
      block.find(".toggle-buttons .toggle-button").each(function(index, el) {
        if(index === selection) {
          $(this).addClass("active");
        } else {
          $(this).removeClass("active");
        }
      });

      //var dataTarget = "col-" + selection;
      //textarea.data("target", dataTarget);
      var textarea = block.find(".column-textarea").eq(selection);
      initializeEditorAt(textarea);

      block.find(".CodeMirror").each(function(index, el) {
        if(index === selection) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });

      var checkbox = block.find('[type="checkbox"]').eq(selection);
      console.log(checkbox);
      checkbox.prop("checked", true);
    }


    $("#snowball-main").on("click", ".snowball-block-columns .fa-times", function(event) {
      if(confirm("Are you sure you want to delete this column?")) {
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

      //Trying to mark the <div> and </div> as readOnly
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
          $(this).addClass("active");
        } else {
          $(this).removeClass("active");
        }
      });

      block.find(".CodeMirror").each(function(index) {
        if(index === selection) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }

})(jQuery);