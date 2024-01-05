function getLast10User(){
    let tbody = document.getElementById("user_list_table_body")

    fetch("http://localhost:8080/api/v1/profile/getLast10", {method: "GET"})
    .then(response => {
        if (!response.ok){
            alert("user not found")
        }else{
            return response.json()
        }
    })
    .then (data => {

        let index = 1;
        data.map((i) => {
            let rowElement = document.createElement('tr')

            let orderNumber = document.createElement("td")
            orderNumber.className = "user-order-number"
            orderNumber.textContent = (index++).toString();

            let name = document.createElement("td")
            name.classList.add("name");
            name.textContent = i.name

            let surname = document.createElement("td");
            surname.classList.add("surname")
            surname.textContent = i.surname;


            let status = document.createElement("td");
            status.classList.add("status")
            status.textContent = i.status;

            let role = document.createElement("td");
            role.classList.add("role")
            role.textContent = i.role.substring(5);


            let deleteTD = document.createElement("td");
            let deleteButton = createDeleteButton(i)
            deleteButton.onclick = function() {
                deleteUser(i.id)
            };
            deleteTD.appendChild(deleteButton)


            let updateTD = document.createElement("td")
            let updateButton = createUpdateButton(i)
            updateButton.onclick = function (){
                userInfo(i.id);
            }
            updateTD.appendChild(updateButton)

            rowElement.appendChild(orderNumber)
            rowElement.appendChild(name)
            rowElement.append(surname)
            rowElement.append(status)
            rowElement.append(role)
            rowElement.append(deleteTD)
            rowElement.append(updateTD)

            tbody.appendChild(rowElement)

            console.log(i.name)
        })
    })
    .catch((error => {
        console.log(error)
    }) )
}

let btn = document.getElementById('add_user')
btn.addEventListener('click', (e) => {
    e.preventDefault()
    getLast10User();
})

function deleteUser(id){
    fetch('http://localhost:8080/api/v1/profile/delete/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include other headers like authorization if required
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
}

/*--------------------------- Article List */

let articleHeader = document.getElementById("article-header")
articleHeader.addEventListener('click', (e) =>{
    e.preventDefault()
    getLast10Article()
})
function getLast10Article(){
    fetch("http://localhost:8080/api/v1/article/open/getLast10Article", {method: "GET"})
        .then(response => {
            if (!response.ok){
                alert("user not found")
            }else{
                return response.json()
            }
        })
        .then (data => {
            console.log(data.object)
            if (data.status === false){
                throw new Error(data.message);
            }
            const articleTableBody = document.getElementById("article_list_table_body");
            let index = 1;
            let object = data.object;
            object.map((i) => {
                const rowElement = document.createElement('tr')

                let orderNumber = document.createElement("td")
                orderNumber.classList.add("user-order-number")
                orderNumber.textContent = (index++).toString();

                let title = document.createElement("td")
                title.classList.add("article-title-for-list");
                console.log(i.title)
                title.textContent = i.title;

                let status = document.createElement("td")
                status.classList.add("article-status");
                console.log("status -> "+i.status)
                status.textContent = i.status;

                let publishedDate = document.createElement("td")
                publishedDate.classList.add("article-published-date");
                publishedDate.textContent = i.publishedDate;

                let publisher = document.createElement("td")
                publisher.classList.add("publisher");
                    let publisherName = document.createElement('span')
                    // publisherName.classList.add(("publisher_name"))
                    publisherName.textContent = i.publisherName;

                    let publisherSurname = document.createElement('span')
                    // publisherSurname.classList.add(("publisher_surname"))
                    publisherSurname.textContent = i.publisherSurname;

                    let publisherRole = document.createElement('span')
                    // publisherRole.classList.add(("publisher_role"))
                    publisherRole.textContent = i.publisherRole.substring(5);

                publisher.append(publisherName);
                publisher.append(publisherSurname);
                publisher.append(publisherRole);

                let deleteTD = document.createElement("td")
                let deleteButton = createDeleteButton(i);
                deleteButton.onclick = function () {
                    deleteArticleById(i.id);
                }
                deleteTD.appendChild(deleteButton)


                let updateTD = document.createElement("td")
                let updateButton = createUpdateButton(i)

                updateTD.appendChild(updateButton)


                rowElement.append(orderNumber)
                rowElement.append(title)
                rowElement.append(status)
                rowElement.append(publishedDate)
                rowElement.append(publisher)
                rowElement.append(deleteTD)
                rowElement.append(updateTD)

                articleTableBody.appendChild(rowElement)
            })
        })
        .catch(error => {
            console.log(error)
        })
}

function deleteArticleById (id){
    fetch('http://localhost:8080/api/v1/article/delete/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // You may need to include other headers like authorization if required
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
}

function createDeleteButton (i){
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("delete")
    deleteButton.value = i.id
    let deleteButtonIcon = document.createElement("i")
    deleteButtonIcon.classList.add("fa-solid")
    deleteButtonIcon.classList.add("fa-trash")
    deleteButton.appendChild(deleteButtonIcon)
    return deleteButton;
}

function createUpdateButton (i){
    let updateButton = document.createElement("button")
    updateButton.classList.add("update")
    updateButton.value = i.id
    let updateButtonIcon = document.createElement("i")
    updateButtonIcon.classList.add("fa-solid")
    updateButtonIcon.classList.add("fa-pen")
    updateButton.appendChild(updateButtonIcon)
    return updateButton;
}

function userInfo(id) {
    window.location.href = '../html/userInfo.html?id='+id;
}