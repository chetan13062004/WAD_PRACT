const products = [
    { name: "Mobile Phone", price: "$299", image: "./images/mob.jpg" },
    { name: "Laptop", price: "$899", image: "./images/laptop.jpg" },
    { name: "Smartwatch", price: "$199", image: "./images/wat.jpg" },
    { name: "Headphones", price: "$99", image: "./images/head.jpg" },
    { name: "Tablet", price: "$399", image: "./images/tab.jpg" },
    { name: "Camera", price: "$549", image: "./images/cam.jpg" },
    { name: "Headphones", price: "$99", image: "./images/head.jpg" },
    { name: "Tablet", price: "$399", image: "./images/tab.jpg" },
    { name: "Camera", price: "$549", image: "./images/cam.jpg" },
    { name: "Headphones", price: "$99", image: "./images/head.jpg" },
    { name: "Tablet", price: "$399", image: "./images/tab.jpg" },
    { name: "Camera", price: "$549", image: "./images/cam.jpg" }
  ];
  
const tableBody=document.querySelector("#productTable tbody");
const pagi=document.getElementById("pagi");

const itemsPerPage=4;
let currentpage=1;

function show(page){
    tableBody.innerHTML="";
    const start=(page-1)*itemsPerPage;
    const end=start+itemsPerPage;
    const prod=products.slice(start,end);

    prod.forEach(p=>{
        
        const row=`<tr>
            <td><img src="${p.image}" alt="${p.name}"></td>
           <td>${p.name}</td>
        <td>${p.price}</td>
        </tr>`;

        tableBody.innerHTML+=row;
    })
}

function setpage(){
    pagi.innerHTML="";
    const pagecnt=Math.ceil(products.length/itemsPerPage);

    for(let i=1;i<=pagecnt;i++){
        const btn=document.createElement("button");
        btn.innerText=i;
        btn.onclick=()=>{
            currentpage=i;
            show(currentpage);
        }

        pagi.appendChild(btn);
    }


}

show(currentpage);
setpage();
