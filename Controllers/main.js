var validate = new Validation();

// Lấy dữ liệu từ server
const loadDataNhanVien = function () {
    axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: "GET",
    }).then(function (result) {
        // console.log(result.data);
        rederTableNhanVien(result.data);
    }).catch(function (err) {
        console.log(err.data);
    });
}

const rederTableNhanVien = function (arrNV) {
    var noiDungTable = '';
    for (var i = 0; i < arrNV.length; i++) {
        // Gán các giá trị nhân viên vào mảng
        var nv = new NhanVien();
        nv.maNhanVien = arrNV[i].maNhanVien;
        nv.tenNhanVien = arrNV[i].tenNhanVien;
        nv.chucVu = arrNV[i].chucVu;
        nv.luongCoBan = arrNV[i].luongCoBan;
        nv.soGioLamTrongThang = arrNV[i].soGioLamTrongThang;
        nv.heSoChucVu = arrNV[i].heSoChucVu;

        // console.log(nv);

        noiDungTable += `
        
            <tr>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tinhTongLuongNhanVien()}</td>
                <td>${nv.soGioLamTrongThang}</td>
                <td>${nv.xepLoai()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button>
                    <button class="btn btn-primary" onclick="chinhSua('${nv.maNhanVien}')">Chỉnh sửa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('#table-NhanVien').innerHTML = noiDungTable;
}

loadDataNhanVien();

document.querySelector('#btn-Them').onclick = function () {
    // Tạo mới đối tượng nhân viên 
    var nv = new NhanVien();
    // Dom lấy giá trị của các thẻ thuộc tính
    nv.maNhanVien = document.querySelector('#maNV').value;
    nv.tenNhanVien = document.querySelector('#tenNV').value;
    nv.chucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCB').value;
    nv.soGioLamTrongThang = document.querySelector('#gioLam').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;

    // Lấy giá trị
    var mangChucVu = document.querySelector('#chucVu').options;
    var viTriCV = document.querySelector('#chucVu').selectedIndex;
    nv.chucVu = mangChucVu[viTriCV].innerHTML;
    // console.log(nv);
    var doDaiChuoi = nv.maNhanVien.length;
    // console.log(doDaiChuoi);

    // Kiểm tra lỗi
    var valid = true;
    valid &= validate.kiemTraRong(nv.maNhanVien, 'Mã nhân viên', '#ktRong-maNV')
        & validate.kiemTraRong(nv.tenNhanVien, 'Tên nhân viên', '#ktRong-tenNV')
        & validate.kiemTraRong(nv.luongCoBan, 'Lương cơ bản', '#ktRong-luongCB')
        & validate.kiemTraRong(nv.soGioLamTrongThang, 'Số giờ làm', '#ktRong-gioLam');
    valid &= validate.kiemTraDoDai(doDaiChuoi, 'Mã nhân viên', '#ktDoDai-maNV');
    valid &= validate.kiemTraSo(nv.maNhanVien, 'Mã nhân viên', '#ktSo-maNV');
    valid &= validate.kiemTraChu(nv.tenNhanVien, 'Tên nhân viên', '#ktChu-tenNV');
    valid &= validate.kiemtraLuong(nv.luongCoBan, 'Lương cơ bản', '#ktLuong-luongCB');
    valid &= validate.kiemtraGioLam(nv.soGioLamTrongThang, 'Giờ làm', '#ktGioLam-gioLam');

    if (!valid) {
        return;
    }

    axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nv,
    }).then(function (result) {
        console.log("Kết quả: ", result.data);
        loadDataNhanVien();
    }).catch(function (err) {
        console.log(err.data);
    });
    // Clear input
    document.querySelector('#maNV').value = '';
    document.querySelector('#tenNV').value = '';
    document.querySelector('#chucVu').value = '';
    document.querySelector('#luongCB').value = '';
    document.querySelector('#gioLam').value = '';
}

var xoaNhanVien = function (maNhanVien) {
    axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNhanVien,
        method: 'DELETE',
    }).then(function (result) {
        console.log(result.data);
        loadDataNhanVien();
    }).catch(function (err) {
        console.log(err.data);
    });
}

var chinhSua = function (maNhanVien) {
    axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNhanVien,
        method: 'GET',
    }).then(function (result) {
        document.querySelector('#maNV').disabled = true;
        document.querySelector('#btn-Luu').style = 'opacity:1';
        document.querySelector('#btn-Them').style = 'opacity:0';
        // console.log(result.data);
        var nv = result.data; //hứng data của nhân viên
        document.querySelector('#maNV').value = nv.maNhanVien;
        document.querySelector('#tenNV').value = nv.tenNhanVien;
        document.querySelector('#chucVu').value = nv.heSoChucVu;
        document.querySelector('#luongCB').value = nv.luongCoBan;
        document.querySelector('#gioLam').value = nv.soGioLamTrongThang;
    }).catch(function (err) {
        console.log(err.data);
    });
}

document.querySelector("#btn-Luu").onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNV').value;
    nv.tenNhanVien = document.querySelector('#tenNV').value;
    nv.chucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCB').value;
    nv.soGioLamTrongThang = document.querySelector('#gioLam').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;

    var mangChucVu = document.querySelector('#chucVu').options;
    var viTriCV = document.querySelector('#chucVu').selectedIndex;
    nv.chucVu = mangChucVu[viTriCV].innerHTML;

    axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=' + nv.maNhanVien,
        method: 'PUT',
        data: nv,
    }).then(function (result) {
        console.log(result.data);

        var doDaiChuoi = nv.maNhanVien.length;
        var valid = true;
        valid &= validate.kiemTraRong(nv.tenNhanVien, 'Tên nhân viên', '#ktRong-tenNV')
            & validate.kiemTraRong(nv.luongCoBan, 'Lương cơ bản', '#ktRong-luongCB')
            & validate.kiemTraRong(nv.soGioLamTrongThang, 'Số giờ làm', '#ktRong-gioLam');
        valid &= validate.kiemTraChu(nv.tenNhanVien, 'Tên nhân viên', '#ktChu-tenNV');
        valid &= validate.kiemtraLuong(nv.luongCoBan, 'Lương cơ bản', '#ktLuong-luongCB');
        valid &= validate.kiemtraGioLam(nv.soGioLamTrongThang, 'Giờ làm', '#ktGioLam-gioLam');

        if (!valid) {
            return;
        }

        document.querySelector('#maNV').disabled = false;
        document.querySelector('#btn-Luu').style = 'opacity:0';
        document.querySelector('#btn-Them').style = 'opacity:1';

        loadDataNhanVien();
    }).catch(function (err) {
        console.log(err.data);
    });
    document.querySelector('#maNV').value = '';
    document.querySelector('#tenNV').value = '';
    document.querySelector('#chucVu').value = '';
    document.querySelector('#luongCB').value = '';
    document.querySelector('#gioLam').value = '';
}