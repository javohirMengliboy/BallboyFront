document.addEventListener('DOMContentLoaded', function () {
    // Get user id from the query parameter
    let userAllInfo = document.getElementById("user_all_info");
    let id = getUrlParameter('id');
    console.log(id)
    fetch("http://localhost:8080/api/v1/profile/getById/" + id)
        .then(response => response.json())
        .then(data => {
            console.log(data.name)
            if (data.status === false) {
                throw new Error(data.message)
            }
            let divUserPhoto = document.createElement("div")
            divUserPhoto.classList.add('user_photo')
                let img = document.createElement("img");
                img.src = '../images/user_image.png';
                img.alt = 'user_photo';
            divUserPhoto.append(img);
            userAllInfo.append(divUserPhoto)

            let divUserInfo = document.createElement("div");
            divUserInfo.className = 'user_info';
            let ul = document.createElement("ul")
            let name = document.createElement("li")
            name.textContent = data.name;

            let surname = document.createElement("li")
            surname.textContent = data.surname;

            let nickname = document.createElement("li")
            nickname.textContent = data.nickname;

            let email = document.createElement("li")
            email.textContent = data.email;

            let phone = document.createElement("li")
            phone.textContent = data.phone;

            let gender = document.createElement("li")
            gender.textContent = 'Erkak';

            let status = document.createElement("li")
            status.textContent = data.status;

            let role = document.createElement("li")
            role.textContent = data.role;

            ul.append(name)
            ul.append(surname)
            ul.append(nickname)
            ul.append(email)
            ul.append(phone)
            ul.append(gender)
            ul.append(status)
            ul.append(role)

            divUserInfo.append(ul)
            userAllInfo.append(divUserInfo)

            // Function to get query parameters from the URL

        });

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
})