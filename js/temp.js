function goToEditPage() {
    // Foydalanuvchi ma'lumotlari sahifasiga o'tish
    window.location.href = "../html/temp2.html";
}

function updateUserInfo() {
    // Ma'lumotlarni yangilash
    var newFirstName = document.getElementById("firstName").value;
    var newLastName = document.getElementById("lastName").value;
    var newEmail = document.getElementById("email").value;

    // Ma'lumotlarni chiqarish
    document.getElementById("firstName").textContent = newFirstName;
    document.getElementById("lastName").textContent = newLastName;
    document.getElementById("email").textContent = newEmail;

    // Ma'lumotlarni yangilangan deb foydalanuvchiga xabar o'tkazish
    alert("Ma'lumotlar muvaffaqiyatli yangilandi!");

    // Foydalanuvchi ma'lumotlar sahifasiga o'tish
    window.location.href = "index.html";
}
