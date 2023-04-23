"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gThongTinGuiDon = {};
const gBASE_URL = "/pizza365"


/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function() {
    onPageLoading();
    //Hàm gán xử lý btn-small cho hàm xử lý sự kiện 
    $('#btn-small').click(function() {
        changeComboBtnColor(this)
        getCombo(gThongTinGuiDon, "S", 20, 2, 200, 2, 150000);
    });
    //Hàm gán xử lý btn-medium cho hàm xử lý sự kiện 
    $('#btn-medium').click(function() {
        changeComboBtnColor(this)
        getCombo(gThongTinGuiDon, "M", 25, 4, 300, 3, 200000);
    });
    //Hàm gán xử lý btn-large cho hàm xử lý sự kiện 
    $('#btn-large').click(function() {
        changeComboBtnColor(this)
        getCombo(gThongTinGuiDon, "L", 30, 8, 500, 4, 250000);
    });
    //Hàm gán xử lý btn-ocean cho hàm xử lý sự kiện 
    $('#btn-ocean').click(function() {
        changePizzaTypeBtnColor(this)
        gThongTinGuiDon.pizzaType = "OCEAN MANIA";
        console.log("Bạn đã gọi kiểu pizza: OCEAN MANIA ")
    });
    //Hàm gán xử lý btn-hawaiian cho hàm xử lý sự kiện 
    $('#btn-hawaiian').click(function() {
        changePizzaTypeBtnColor(this)
        gThongTinGuiDon.pizzaType = "HAWAIIAN";
        console.log("Bạn đã gọi kiểu pizza: HAWAIIAN ")
    });
    //Hàm gán xử lý btn-bacon cho hàm xử lý sự kiện 
    $('#btn-bacon').click(function() {
        changePizzaTypeBtnColor(this)
        gThongTinGuiDon.pizzaType = "CHEESY CHICKEN BACON";
        console.log("Bạn đã gọi kiểu pizza: CHEESY CHICKEN BACON ")
    });
    //Hàm xử lý khi nhấn send
    $('#btn-send').click(function() {
        onSendBtnClick();
    });
    //Hàm thực hiện khi click tạo đơn
    $('#btn-tao-don').click(function() {
        createNewOrder(gThongTinGuiDon);
    });
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
//on Send Btn Click
function onSendBtnClick() {
    //Thu thập dữ liệu
    getUserData(gThongTinGuiDon);

    // //Valid dữ liệu
    var isValid = validData(gThongTinGuiDon);
    if (isValid == false) {
        return;
    }

    //Xử lý voucher nhập vào và hiển thị
    if (gThongTinGuiDon.voucher == "") {
        //Không có vourcher
        gThongTinGuiDon.giamGia = 0;
        gThongTinGuiDon.thanhTien = gThongTinGuiDon.giaVND;
        //Load data to modal
        loadDataToModal(gThongTinGuiDon);
        //hiện modal
        $('#modal-order-detail').modal()

    } else {
        checkMaGiamGia(gThongTinGuiDon);
    }
}

//Hàm thực thi sự kiện bắt đầu tải trang
function onPageLoading() {
    loadDrinkList();
};


/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
//function trả lại một đối tượng Combo được tham số  
// Hàm lấy thông tin từ trường input
function getUserData(paramObject) {
    paramObject.fullName = $("#inp-ho-ten").val().trim();
    paramObject.email = $("#inp-email").val().trim();
    paramObject.phone = $("#inp-so-dien-thoai").val().trim();
    paramObject.address = $("#inp-dia-chi").val().trim();
    paramObject.voucher = $("#inp-ma-giam-gia").val().trim();
    paramObject.loiNhan = $("#inp-loi-nhan").val().trim();
    paramObject.drink = $("#select-drink").find(":selected").val();
};

//Check mã giảm giá và tính discount
function checkMaGiamGia(paramThongTinGuiDon) {
    "use strict";
    var vMaGiamGia = paramThongTinGuiDon.voucher;
    // lấy data từ server   
    $.ajax({
        url: gBASE_URL + "/voucher_detail/" + vMaGiamGia,
        type: "GET",
        dataType: 'json',
        success: function(responseObject) {
            console.log(responseObject);
            //Lấy phần trăm giảm giá
            paramThongTinGuiDon.giamGia = parseInt(responseObject.phanTramGiamGia);
            //Tính tiền phải thanh toán
            paramThongTinGuiDon.thanhTien = tienPhaiThanhToan(paramThongTinGuiDon);
            //Load data to modal
            loadDataToModal(paramThongTinGuiDon);
            //hiện modal
            $('#modal-order-detail').modal()

        },
        error: function() {
            alert("Không tìm thấy mã giảm giá")
            paramThongTinGuiDon.giamGia = 0;
            paramThongTinGuiDon.thanhTien = paramThongTinGuiDon.giaVND;
            //Load data to modal
            loadDataToModal(paramThongTinGuiDon);
            //hiện modal
            $('#modal-order-detail').modal()
        }
    });
};
//Hàm tính tiền phải trả
function tienPhaiThanhToan(paramThongTinGuiDon) {
    return paramThongTinGuiDon.giaVND * (100 - paramThongTinGuiDon.giamGia) / 100
};
//valid Email
function isPhoneNumber(inputtxt) {
    var vValidNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return inputtxt.match(vValidNumber)
}
//valid Email
function isEmail(paramEmail) {
    "use strict";
    return paramEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
//Valid Data
function validData(paramThongTinGuiDon) {
    'use strict'
    if (paramThongTinGuiDon.pizzaSize == null) {
        alert("Bạn chưa chọn Combo");
        return false
    }
    if (paramThongTinGuiDon.pizzaType == null) {
        alert("Bạn chưa chọn Kiểu Pizza");
        return false
    }
    if (paramThongTinGuiDon.drink == "0") {
        alert("Bạn chưa chọn Loại Nước Ngọt");
        return false
    }
    if (paramThongTinGuiDon.fullName == "") {
        alert("Bạn chưa nhập họ tên");
        return false
    }
    if (!(isEmail(paramThongTinGuiDon.email))) {
        alert("Email chưa đúng định dạng");
        return false
    }
    if (!isPhoneNumber(paramThongTinGuiDon.phone)) {
        alert("Số điện thoại không hợp lệ");
        return false
    }
    if (paramThongTinGuiDon.address == "") {
        alert("Bạn chưa nhập địa chỉ");
        return false
    }
    if (paramThongTinGuiDon.loiNhan == "") {
        alert("Bạn chưa nhập lời nhắn");
        return false
    }
    return true
}

//Load data to modal
function loadDataToModal(paramOrderObject) {
    "use strict"
    $("#input-modal-ho-ten").val(paramOrderObject.fullName);
    $("#input-modal-so-dien-thoai").val(paramOrderObject.phone);
    $("#input-modal-dia-chi").val(paramOrderObject.address);
    $("#input-modal-loi-nhan").val(paramOrderObject.loiNhan);
    $("#input-modal-ma-giam-gia").val(paramOrderObject.voucher);

    var vAreaTextVal =
        "Xác nhận: " + paramOrderObject.fullName + '\r\n' +
        "Email: " + paramOrderObject.email + '\r\n' +
        "Địa chỉ: " + paramOrderObject.address + '\r\n' +
        "Lời nhắn: " + paramOrderObject.loiNhan + '\r\n' +
        "số điện thoại: " + paramOrderObject.phone + '\r\n' +
        "=========================================" + '\r\n' +
        "Kích cỡ: " + paramOrderObject.pizzaSize + '\r\n' +
        "Đường kính: " + paramOrderObject.duongKinh + '\r\n' +
        "salad: " + paramOrderObject.salad + '\r\n' +
        "Nước ngọt: " + paramOrderObject.soLuongNuoc + '\r\n' +
        "Sườn nướng: " + paramOrderObject.suon + '\r\n' +
        "Loại nước ngọt: " + paramOrderObject.drink + '\r\n' +
        "=========================================" + '\r\n' +
        "Loại pizza: " + paramOrderObject.pizzaType + '\r\n' +
        "Mã voucher: " + paramOrderObject.voucher + '\r\n' +
        "Giá vnd: " + paramOrderObject.giaVND + '\r\n' +
        "Discount %:  " + paramOrderObject.giamGia + " %" + '\r\n' +
        "Phải thanh toán vnd: " + paramOrderObject.thanhTien;

    $("#textarea-thong-tin-chi-tiet").val(vAreaTextVal)
}

//Call API create New Order 
function createNewOrder(paramOrderInfo) {
    "use strict"
    $('#modal-order-detail').modal('hide')
        // Update dữ liệu lên server
    $.ajax({
        url: gBASE_URL + "/orders",
        type: 'POST',
        data: JSON.stringify(paramOrderInfo),
        dataType: 'json', // added data type
        contentType: "application/json;charset=UTF-8",
        success: function(data) {
            //confirm hoặc cancel 01 order (update);
            $("#inp-order-code").val(data.orderCode)
                //sdsdfsd
            $('#modal-ma-don-hang').modal()
        }
    });
}
//Change Combo Btn color
function changeComboBtnColor(paramClick) {
    //đổi màu nút 
    $('.btn-size')
        .removeClass('btn-success')
        .addClass('btn-warning')
        .data("data-is-selected-pizza", "N");
    //Đổi màu nút được chọn
    $(paramClick)
        .removeClass('btn-warning')
        .addClass('btn-success')
        .data("data-is-selected-pizza", "Y");
};

//Change PizzaType color
function changePizzaTypeBtnColor(paramClick) {
    //đổi màu nút 
    $('.btn-pizza-type')
        .removeClass('btn-success')
        .addClass('btn-warning')
        .data("data-is-selected-pizza-type", "N");
    //Đổi màu nút được chọn
    $(paramClick)
        .removeClass('btn-warning')
        .addClass('btn-success')
        .data("data-is-selected-pizza-type", "Y");
};

//Hàm lấy thông tin ComBo 
function getCombo(paramContainerObj, paramCombo, paramDuongKinh, paramSuonNuong, paramSalad, paramNuocNgot, paramPrice) {

    paramContainerObj.pizzaSize = paramCombo;
    paramContainerObj.duongKinh = paramDuongKinh;
    paramContainerObj.suon = paramSuonNuong;
    paramContainerObj.salad = paramSalad;
    paramContainerObj.soLuongNuoc = paramNuocNgot;
    paramContainerObj.giaVND = paramPrice;
    console.log(paramContainerObj);
};

// Hàm lấy danh sách các loại nước uống load vào DrinkList
function loadDrinkList() {
    "use strict";
    // lấy data từ server   
    $.ajax({
        url: gBASE_URL + "/drinks",
        type: "GET",
        dataType: 'json',
        success: function(responseObject) {
            console.log(responseObject);
            //Load data to modal
            loadDataToDrinkSelect(responseObject);
            //Hiện modal lên
            console.log("Finished load drink")
        },
        error: function(error) {
            console.assert(error.responseText);
        }
    });

};

//Load Data To Drink Selectbox
function loadDataToDrinkSelect(paramDataObj) {
    "use strict";
    $('#select-drink').append($('<option>', {
        value: 0,
        text: '== Chọn loại nước uống =='
    }));
    for (var bI = 0; bI < paramDataObj.length; bI++) {
        $('#select-drink').append($('<option>', {
            value: paramDataObj[bI].maNuocUong,
            text: paramDataObj[bI].tenNuocUong
        }));
    }
}