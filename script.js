// script.js

let reports = [];

document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let issueType = document.getElementById('issueType').value;
    let description = document.getElementById('description').value;
    let photoFile = document.getElementById('photo').files[0];
    let location = document.getElementById('location').value || "Location not available";

    if (!issueType || !description || !photoFile) {
        alert("Please fill all fields.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function() {
        let report = {
            id: Date.now(),
            type: issueType,
            description: description,
            photo: reader.result,
            location: location,
            status: "Submitted"
        };
        reports.push(report);
        displayReports(reports);
        document.getElementById('notification').textContent = "Report submitted successfully!";
        document.getElementById('reportForm').reset();
    };
    reader.readAsDataURL(photoFile);
});

// Get user location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById('location').value = `Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`;
    });
}

function displayReports(reportArray) {
    let list = document.getElementById('reportList');
    list.innerHTML = "";
    reportArray.forEach(report => {
        let div = document.createElement('div');
        div.className = "report-item";
        div.innerHTML = `
            <h3>${report.type}</h3>
            <p>${report.description}</p>
            <img src="${report.photo}" width="100%" alt="Report Image"/>
            <p><strong>Location:</strong> ${report.location}</p>
            <p><strong>Status:</strong> ${report.status}</p>
        `;
        list.appendChild(div);
    });
}

function filterReports(type) {
    if (type === "All") {
        displayReports(reports);
    } else {
        let filtered = reports.filter(report => report.type === type);
        displayReports(filtered);
    }
}
