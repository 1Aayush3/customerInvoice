$(document).ready(function() {
  var i = 1;
  $("#add_row").click(function() {
    b = i - 1;
    $("#addr" + i)
      .html($("#addr" + b).html())
      .find("td:first-child")
      .html(i + 1);
    $("#tab_logic").append('<tr id="addr' + (i + 1) + '"></tr>');
    i++;
  });
  $("#delete_row").click(function() {
    if (i > 1) {
      $("#addr" + (i - 1)).html("");
      i--;
    }
    calc();
  });

  $("#tab_logic tbody").on("keyup change", function() {
    calc();
  });
  $("#tax").on("keyup change", function() {
    calc_total();
  });
});

// $("select.form-control").on("change", function() {
//   var item = $(this)
//     .find(":selected")
//     .text();
//   switch (item) {
//     case "Table Tennis Racket":
//       $("input.form-control price").val(800);
//       break;
//     case "Badminton Racket":
//       $("input.form-control price").val(1500);
//       break;
//     case "Football":
//       $("input.form-control price").val(1200);
//       break;
//     case "Basketball":
//       $("input.form-control price").val(1100);
//       break;
//     case "Football Gloves":
//       $("input.form-control price").val(1900);
//       break;
//     case "Football Shoes":
//       $("input.form-control price").val(2100);
//       break;
//     case "Chess":
//       $("input.form-control price").val(350);
//       break;
//     case "ChessCarrom Board":
//       $("input.form-control price").val(1400);
//       break;
//   }
// });

function calc() {
  $("#tab_logic tbody tr").each(function(i, element) {
    var html = $(this).html();
    if (html != "") {
      var qty = $(this)
        .find(".qty")
        .val();
      var price = $(this)
        .find(".price")
        .val();
      $(this)
        .find(".total")
        .val(qty * price);

      calc_total();
    }
  });
}

function calc_total() {
  total = 0;
  $(".total").each(function() {
    total += parseInt($(this).val());
  });
  $("#sub_total").val(total.toFixed(2));
  tax_sum = taxes(total);
  $("#tax_amount").val(tax_sum.toFixed(2));
  $("#total_amount").val((total - tax_sum).toFixed(2));
}

function taxes(income) {
  if (income <= 3000) {
    tax = 0;
  }
  if (income > 3000 && income <= 6000) {
    tax = ((income - 3000) * 10) / 100;
  }
  if (income > 6000) {
    tax = 300 + ((income - 6000) * 20) / 100;
  }
  return tax;
}
