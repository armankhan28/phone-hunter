
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
   
     
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.data))
}

const searchResult = data => {
    // console.log(data);
    const displaySearch = document.getElementById('search-result');
    displaySearch.textContent = '';
     // error handaling
     let error  = document.getElementById('error')
     if(data.length == 0){
       error.innerText = 'No Phone Found'
       error.style.color = 'red'
       error.style.textAlign = 'center'
     }else{
       error.textContent = '';
     }
    data.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
                <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="text-center">${phone.phone_name}</h4>
                        <h5 class="text-center">${phone.brand}</h5>
                        <button onclick="moreInfo('${phone.slug}')" class="d-block m-auto btn btn-info text-white">Details</button>
                    </div>
                </div>
         </div>      
        `;
        displaySearch.appendChild(div);
    })
}

// more info
 const moreInfo = id => {
     const url = `https://openapi.programming-hero.com/api/phone/${id}`
     fetch(url)
     .then(res => res.json())
     .then(data => showInfo(data.data))
 }



