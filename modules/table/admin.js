(function($) {
  $(".snowball-main").on("open", ".snowball-block-chart", function() {
      var block = $(this);
      var container = $(this).find(".chart").get(0);
      var data = JSON.parse($(this).find("[data-target='JSON']").val());

      var hot = new Handsontable(container, {
        data: data,
        rowHeaders: false,
        colHeaders: true,
        columnSorting: true,
        contextMenu: true,
        persistantState: true,
        afterChange: function() {
          var generatedJSON = JSON.parse(JSON.stringify(data));
          var jsonString = JSON.stringify(generatedJSON);

          block.find("[data-target='JSON']").val(jsonString);
          block.find("[data-target='HTML']").val(createTable(generatedJSON));
        },
        fillHandle: true,
        manualColumnMove: true,
        manualColumnResize: true,
        multiSelect: true,
        observeChanges: true,
        search: true,
        undo: true,
        readOnly: false,
        stretchH: "all"
      });

    });


    function createTable(JSON) {
      var HTML = "<table>";
      var numRows = JSON.length;

      for(var i = 0; i < numRows; i++) {
        if(i == 0) {
          HTML = HTML + "<thead>";
        } else if(i == 1) {
          HTML = HTML + "</thead><tbody>";
        }
        HTML = HTML + "<tr>";
        for(var j = 0; j < JSON[i].length; j++) {
          if (i == 0) {
            HTML = HTML + "<th>" + JSON[i][j] + "</th>";
          } else {
            HTML = HTML + "<td>" + JSON[i][j] + "</td>";
          }
        }

        HTML = HTML + "</tr>";
      }

      HTML = HTML + "</tbody></table>";

      return HTML;
    }

})(jQuery);
