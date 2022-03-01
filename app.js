    // search area 
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.data.slice(0, 20)))
}
    // search result
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
                        <h5 class="text-center"><span class="fw-bold">Brand</span> : ${phone.brand}</h5>
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
//  info details
 const showInfo = info => {
    console.log(info);
    const infoDetails = document.getElementById('info-details')
    infoDetails.innerHTML = '';
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
    <div class="card p-3 shadow-lg">
    <img src="${info.image}" class="card-img-top img-fluid w-50 mx-auto" alt="...">
    <div class="card-body">
    <p class="card-title"> <span class="fw-bold">Brand</span> : ${info.brand}</p>
    <p class="card-text"> <span class="fw-bold">Model</span> : ${info.name}</p>
    <p class="card-text"> <span class="fw-bold">Chepset</span> : ${info.mainFeatures.chipSet}</p>
    <p class="card-text"> <span class="fw-bold">Display</span> : ${info.mainFeatures.displaySize}</p>
    <p class="card-text"> <span class="fw-bold">Memory</span> : ${info.mainFeatures.memory}</p>
    <p class="card-text"> <span class="fw-bold">Sensor</span> : ${info.mainFeatures.sensors}</p>
    <p class="card-text"> <span class="fw-bold">Release Date</span> : ${info.releaseDate}</p>
    <p class="text-center text-info fw-bold">Others Informetion <br>    </p>
    <p class="card-text"> <span class="fw-bold">Bluetooth</span> : ${info.others.Bluetooth}</p>
    <p class="card-text"> <span class="fw-bold">GPS</span> : ${info.others.GPS}</p>
    <p class="card-text"> <span class="fw-bold">NFC</span> : ${info.others.NFC}</p>
    <p class="card-text"> <span class="fw-bold">Radio</span> : ${info.others.Radio}</p>
    <p class="card-text"> <span class="fw-bold">USB</span> : ${info.others.USB}</p>
    <p class="card-text"> <span class="fw-bold">WLAN</span> : ${info.others.WLAN}</p>
    </div>  
    </div>
    `
    infoDetails.appendChild(div)
 }

