$(document).ready(function () {

     $(document).on('click', '#cancelInvoice', function () {
          window.history.back();
     });

     $('#customer').select2({
          placeholder: 'Select an option',
          dropdownAutoWidth: true,
     });

     var status = $('#status').val();

    if(status != 1){
        $('#submitButton').attr('disabled', true);
        $('.btn-validate').attr('disabled', false);
    }else{
        $('#submitButton').attr('disabled', false);
        $('.btn-validate').attr('disabled', true);
    }

     function idValidation() {

          var invoiceNo = $('#icrNo').val();
          var buttonVal = $('#icrValidate').val();

          $.ajax({

               url: "/noValidate",
               type: "POST",
               data: {
                    '_token': $('input[name=_token]').val(),
                    'invoiceNo': invoiceNo,
                    'buttonVal': buttonVal
               },
               success: function (response) {
                    if (response.status == "empty") {
                         $('#status').text("No Record Found");
                         $('#status').css("color", "red");
                         $('#status').css('font-size', '12px');
                         $('#issuedBy').val("");
                         $('#submitButton').attr('disabled', true);
                    } else if (response.status == "DONE" || response.status == 'CANCELLED' || response.status == 'NO RECORD FOUND') {
                         $('#status').text(response.status);
                         $('#status').css("color", "red");
                         $('#status').css('font-size', '12px');
                         $('#issuedBy').val("");
                         $('#submitButton').attr('disabled', true);
                    } else {
                         $('#status').text('Active');
                         $('#status').css("color", 'Green');
                         $('#status').css('font-size', '12px');
                         $('#issuedBy').val(response.issuedBy);
                         $('#issuedId').val(response.issuerID);
                         $('#submitButton').attr('disabled', false);
                    }
               }

          });
     }

     $('#icrValidate').on('click', function () {
          idValidation();
     });

     customerProduct();

     function customerProduct() {

          var cust_id = $('#customer option:selected').val();
     
          $.ajax({
               type: "get",
               url: '/getICRPRoduct',
               data: {
                    'cust_id': cust_id,
               },
               success: function (response) {
                    $('#product').empty().append('<option value=""> Choose option </option>');
                    $('#product').append(response.option);
               }
          });
     }

     function clear_form(){
          $('#size').val("");
          $('#quantity').val("");
     }

     $('#customer').on('change', function () {
          customerProduct();
          clear_form();
     });

     function customer_product_details(){
          
          var data_id = $('#product option:selected').attr('data-id');
         
          $.ajax({
               type: "get",
               url: "/getICRProductDetails",
               data: {
                    'data_id' : data_id
               },
               success: function (response) {
                    $('#size').val(response.size);       
               }
          });

     }

     $(document).on('change', '#product', function(){
          customer_product_details();
     });

     function addProduct_Table(){
          var product_code = $('#product option:selected').val();
          var product_name = $('#product option:selected').text();
          var size = $('#size').val();
          var qty = $('#quantity').val();

          var flag = 0;
         
          $("#productBody").find("tr").each(function () {
               var td1 = $(this).find("td:eq(0)").text();
               var td2 = $(this).find("td:eq(1)").text();
   
               if (product_name == td1 && size == td2) {
                   flag = 1;
               }
           });
   
           if(flag == 1){
               swal("Exisiting Product" , "" , "error");
           }else {
   
               if(product_code == ""){
   
               }else{
   
                   var tableElements = "<tr class='text-center'> " +
                       "<td><input type='hidden' name='productCode[]' id='productCode' value='" + product_code + "'>" + product_name + "</td> " +
                       "<td><input type='hidden' name='productSize[]' id='productSize' value='" + size + "'>" + size + "</td> " +
                       "<td><input type='hidden' name='productQty[]' id='productQty' value='" + qty + "'>" + qty + "</td> " +
                       "<td><button class='btn btn-error' type='button' id='btn-remove'> Remove </button></td>" +
                       " </tr>";
               }
   
           }
   
           $('#productBody').append(tableElements);
          
     }

     $('#addProduct').on('click', function(){
          var product_code = $('#product option:selected').val();
          var quantity = $('#quantity').val();

          if(product_code == ""){
               swal("Please select product", '', 'error');
          }
          else if(quantity == ""){
               swal("Please input quantity", '', 'error');
          }
          else{
               addProduct_Table();
          }
     });

     $(document).on('click', '#btn-remove', function(){
          $(this).closest('tr').remove();
     });


     $(document).on('click', '.radButton', function(){

          if($('#otherRadio').prop("checked") == true){
               $('#otherDesc').attr("readonly", false);
          }else{
               $('#otherDesc').attr("readonly", true);
          }

     });


});