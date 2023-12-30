function showPassword(password){
    const x = document.getElementById(password);
    if (x.type === "password"){
        x.type = "text";
    }else {
        x.type = "password"
    }
}

function registerUser() {
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var email = document.getElementById('email').value;
    var firstPassword = document.getElementById('firstPassword').value;
    var secondPassword = document.getElementById('secondPassword').value;


    var userData = {
        name: name,
        surname: surname,
        email: email,
        firstPassword: firstPassword,
        secondPassword: secondPassword
    };

    // Ma'lumotlarni backend tarafga yuborish uchun API chaqirish
    fetch('http://localhost:8080/api/v1/auth/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if(response.status == 500){
           return response.text();
        }else{
           return response.json();
        }
    })
    .then(data => {
        console.log(data);
        // if (!response.ok){
        //     console.log(response.json());
        // }
        // if (data.status){
        //     console.log(data.dto);
        // }else{
        //     console.log(data.message)
        // }
        // alert('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
        // window.location.href='../html/index.html';
        // Boshqa amallar o'tkazishingiz mumkin
    })
    .catch((error) => {
        // let emailWarning = document.getElementById("email-warning")
        // // alert(error.message);
        // emailWarning.textContent = error.x;
        console.log(error.message)
    });
}

const formReg = document.querySelector("form");
formReg.addEventListener("submit", (e) => {
    e.preventDefault()
    registerUser();
})



