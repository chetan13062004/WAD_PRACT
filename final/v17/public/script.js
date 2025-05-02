
fetch("/api/emp")
    .then(response=>response.json())
    .then(emp=>{

        const det=document.getElementById("details");


        emp.forEach(e=>{
            const div=document.createElement("div");

            div.innerHTML=`
                <img src="${e.image}">
                <h2>${e.name}</h2>
                <h2>${e.designation}</h2>
                <h2>${e.department}</h2>
                <h2>${e.salary}</h2>
            `
            det.appendChild(div);
        })
    })

    .catch(err=>{console.log(err)})