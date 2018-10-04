function getProducts() {

    document.getElementById('addProductForm').style.display = "none";

    fetch('http://localhost:3001/api/products')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h2 class="mb-4">Listar produkter från API-GET</h2>';
        let output2 ='';

        if(data.length === 0) {
            output +=
            `
                    <p>Inga produkter hittades i databasen. Var vänlig och lägg till produkter först.</p>
            `;
        } else {
            let counter = 0;
            data.forEach((product) => {               
                output2 += 
                `
                        <div class="card card-body mb-3 col-sm-6 col-md-3">
                            <h5>${product.name}</h5>
                            <p>${product.desc}</p>
                            <p style="font-size:7pt; color:#999999;">ID: ${product._id}</p>
                            <div class="d-flex">
                                <button id="edit" style="font-size:7pt; height:25px; width:70px; " class="btn btn-secondary mr-1" onclick={updateProduct(event,this)} value=${product._id}>Uppdatera</button>
                                <button id="delete" style="font-size:7pt; height:25px; width:70px; " class="btn btn-danger mr-1" onclick={removeProduct(event,this)} value=${product._id}>Ta bort</button>
                            </div>
                        </div>
                `;          
            });
        }

        document.getElementById('output').innerHTML = output;
        document.getElementById('output2').innerHTML = output2;
    })
    .catch((err) => console.log(err));
}

function initProductForm() {
    document.getElementById('output').innerHTML = "";
    document.getElementById('productName').value = "";
    document.getElementById('productDescription').value = "";
    document.getElementById('addProductForm').style.display = "inline";
}

function submitProduct(e) {
    e.preventDefault();
    let name = document.getElementById('productName').value;
    let desc = document.getElementById('productDescription').value;

    fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({ name: name, desc: desc})
    })
    .then((res) => res.json())
    .then((data) => {
        document.getElementById('productName').value = "";
        document.getElementById('productDescription').value = "";

        let output = "<p class='pt-1'>RESULTAT AV POST</p><p>" + JSON.stringify(data) + "</p>";
        document.getElementById('output').innerHTML = output;
        console.log(data)

    })
    .catch((err) => console.log(err))
}

async function removeProduct(e, {value}) {
    await fetch(`http://localhost:3001/api/products/${value}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain */*',
            'Content-Type': 'application/json'
        },
    })
    .then(result => console.log(result))
    .catch((err) => console.log(err));
    getProducts();
}

async function updateProduct(e, {value}){
    let newName = prompt('Nytt namn');
    let newDesc = prompt('Ny beskrivning');
    name = newName;
    desc = newDesc;
    console.log(name, desc);

     await fetch(`http://localhost:3001/api/products/${value}`, {
        method:"PATCH",
        headers: {
            'Accept': 'application/json, text/plain */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({"name": name, "desc": desc})
    })
    .then(result => console.log(result))
    .catch(error => console.log(error));  
    getProducts(); 
}

document.getElementById('getProducts').addEventListener('click', getProducts);
document.getElementById('addProduct').addEventListener('click', initProductForm);
document.getElementById('addProductForm').addEventListener('submit', submitProduct);
//document.getElementById('delete').addEventListener('click', removeProduct);