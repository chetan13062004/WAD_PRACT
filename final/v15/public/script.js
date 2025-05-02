
fetch("/api/products")
    .then(response=>response.json())
    .then(products=>{

        const prodlist=document.getElementById("ProductList");

        products.forEach(p => {
            const div=document.createElement("div");

            div.innerHTML=`
            
                <img src="${p.image}">
                <h3>${p.name}</h3>
                 <p>Price: $${p.price}</p>
            `

            prodlist.appendChild(div);
        });
    })

    .catch(err=>console.log(err))