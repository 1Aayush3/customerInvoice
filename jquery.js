$(document).ready(function() {
  $("#add_row").on("click", function() {
    $("#mainBody").append($("#template-product-line").html());
  });
  ////////////////////////////RemoveRow///////////////////
  $("tbody").on("click", ".remove", function() {
    $(this)
      .closest("tr")
      .remove();
    calc();
  });

  //////////////////////////////////////////////////////
  $("#tab_logic tbody").on("keyup change", function() {
    calc();
  });

  /////////////////////Product--gives--->Price/////////////
  var selectedVal = 0;
  $("tbody").on("change", ".product", function() {
    selectedVal = $(this)
      .find("option:selected")
      .data("price");
    //point the table row of this element and then it child price
    $(this)
      .closest("tr")
      .find(".price")
      .val(selectedVal);

    //point all element with class price
    //   $(".price").val(selectedVal);
    console.log(selectedVal);
  });

  ////////////////////////Generate//////////////////////////////////
  $("#finish").on("click", function() {
    finish();
  });

  ////////////////////////////////////////////////////////////////
});

/////////////////////////////Functions////////////////////
var purchaseItem = new Array();
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
  var tax = 0;
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

function finish() {
  var temp = "";
  $("tbody tr.newRow").each(function() {
    var product = $(this)
      .find(".product")
      .val();
    var qty = $(this)
      .find(".qty")
      .val();
    var price = $(this)
      .find(".price")
      .val();
    var total = qty * price;

    purchaseItem.push({
      name: product,
      Quantity: qty,
      Rate: price,
      Total: total
    });
    temp =
      "{" +
      "\n" +
      "product_name :" +
      product +
      "," +
      "\n" +
      "quantity :" +
      qty +
      "," +
      "\n" +
      "unit_price :" +
      price +
      "," +
      "\n" +
      "total_price :" +
      total +
      "\n" +
      "},";
    $("#p").append($(this).text(temp));
  });
}
