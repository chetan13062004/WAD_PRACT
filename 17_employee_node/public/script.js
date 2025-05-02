// Fetch employee data and display
fetch('/api/employees')
    .then(response => response.json())
    .then(employees => {
        const employeeList = document.getElementById('employeeList');
        employees.forEach(emp => {
            const div = document.createElement('div');
            div.className = 'employee-card';
            div.innerHTML = `
                <img src="${emp.image}" alt="${emp.name}" class="employee-image">
                <h3>${emp.name}</h3>
                <p><strong>Designation:</strong> ${emp.designation}</p>
                <p><strong>Department:</strong> ${emp.department}</p>
                <p><strong>Salary:</strong> $${emp.salary}</p>
            `;
            employeeList.appendChild(div);
        });
    })
    .catch(err => console.error('Error fetching employee data:', err));
