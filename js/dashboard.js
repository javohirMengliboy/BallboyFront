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
        const tRow = tbody.getElementsByTagName("tr");

        let index = 1;
        data.map((i) => {
            let rowElement = document.createElement('tr')

            let orderNumber = document.createElement("td")
            orderNumber.classList.add("user-order-number")
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
            role.textContent = i.role;

            let deleteButton = document.createElement("button")

            let deleteTD = createDeleteButton(i, deleteButton);
            deleteButton.onclick = function() {
                deleteUser(i.id)
            };

            // let deleteTD = document.createElement("td")
            // let deleteButton = document.createElement("button")
            // deleteButton.classList.add("delete")
            // deleteButton.value = i.id
            // let deleteButtonSpan = document.createElement("i")
            // deleteButtonSpan.classList.add("fa-solid")
            // deleteButtonSpan.classList.add("fa-trash")
            // deleteButton.appendChild(deleteButtonSpan)
            // deleteTD.appendChild(deleteButton)
            //
            // deleteButton.onclick = function() {
            //     deleteUser(i.id)
            // };

            let updateTD = document.createElement("td")
            let updateButton = document.createElement("button")
            updateButton.classList.add("update")
            let updateButtonSpan = document.createElement("i")
            updateButtonSpan.classList.add("fa-solid")
            updateButtonSpan.classList.add("fa-pen")
            updateButton.appendChild(updateButtonSpan)
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
let btn = document.getElementById('update')

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

let articleTableBody = document.getElementById("article-header")
articleTableBody.addEventListener('click', (e) =>{
    e.preventDefault()
    getLast10Article()
})
function getLast10Article(){
    fetch("http://localhost:8080/api/v1/article/open/getLast5Article?type=Yevropa", {method: "GET"})
        .then(response => {
            if (!response.ok){
                alert("user not found")
            }else{
                return response.json()
            }
        })
        .then (data => {
            const tRow = articleTableBody.getElementsByTagName("tr");

            let index = 1;
            data.map((i) => {
                const rowElement = document.createElement('tr')

                let orderNumber = document.createElement("td")
                orderNumber.classList.add("user-order-number")
                orderNumber.textContent = (index++).toString();

                let title = document.createElement("td")
                title.classList.add("article-title-for-list");
                title.textContent = i.title

                let status = document.createElement("td")
                title.classList.add("article-status");
                title.textContent = i.status

                let publishedDate = document.createElement("td")
                title.classList.add("article-published-date");
                title.textContent = i.publishedDate

                let publisher = document.createElement("td")
                title.classList.add("publisher");
                let publisherName = document.createElement("span")
                publisherName.classList.add(("publisher_name"))
                publisherName.textContent = i.profile.name;

                let publisherSurname = document.createElement("span")
                publisherSurname.classList.add(("publisher_surname"))
                publisherSurname.textContent = i.profile.surname;

                let publisherRole = document.createElement("span")
                publisherRole.classList.add(("publisher_role"))
                publisherRole.textContent = i.profile.role;

                publisher.append(publisherName,publisherSurname,publisherRole);

                let deleteTD = createDeleteButton(i);
                let deleteButton = deleteTD.getElementsByTagName('button')
                deleteButton.onclick = function () {
                    deleteArticleById(i.id);
                }
                let updateTD = document.createElement("td")
                let updateButton = document.createElement("button")
                updateButton.classList.add("update")
                let updateButtonSpan = document.createElement("i")
                updateButtonSpan.classList.add("fa-solid")
                updateButtonSpan.classList.add("fa-pen")
                updateButton.appendChild(updateButtonSpan)
                updateTD.appendChild(updateButton)

                rowElement.appendChild(orderNumber)
                rowElement.appendChild(title)
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

function createDeleteButton (i, deleteButton){
    let deleteTD = document.createElement("td")
    deleteButton.classList.add("delete")
    deleteButton.value = i.id
    let deleteButtonSpan = document.createElement("i")
    deleteButtonSpan.classList.add("fa-solid")
    deleteButtonSpan.classList.add("fa-trash")
    deleteButton.appendChild(deleteButtonSpan)
    deleteTD.appendChild(deleteButton)
    return deleteTD;
}