// Halaman comments
function selectAllComment(){
    const checkboxes = document.querySelectorAll('#formApprove input[type="checkbox"]');
    checkboxes.forEach(checkbox =>{
        checkbox.checked = true;
    });
}

function selectNoneComment(){
    const checkboxes = document.querySelectorAll('#formApprove input[type="checkbox"]');
    checkboxes.forEach(checkbox =>{
        checkbox.checked = false;
    });
}

function selectUnappComment() {
    const rows = document.querySelectorAll('#formApprove tr');
    rows.forEach(row => {
        const statusCell = row.querySelector('td:last-child');
        if (statusCell && statusCell.textContent.trim() === "Unapproved") {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = true;
            }
        } else if (statusCell && statusCell.textContent.trim() === "Approved") {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = false;
            }
        }
    });
}

function selectAppComment() {
    const rows = document.querySelectorAll('#formApprove tr');
    rows.forEach(row => {
        const statusCell = row.querySelector('td:last-child');
        if (statusCell && statusCell.textContent.trim() === "Approved") {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = true;
            }
        } else if (statusCell && statusCell.textContent.trim() === "Unapproved") {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = false;
            }
        }
    });
}

// Untuk sidebar
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.nav-link.custom-link');
    const currentPath = window.location.pathname.split('/').pop();

    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    const pageToMenuMapping = {
        "ValidateDramas.html": "submenu1",
        "InputDramas.html": "submenu1",
        "Profile.html": "submenu2",
        "Logout.html": "submenu2",
    };

    const pageToLinkMapping = {
        "ValidateDramas.html": "validateLink",
        "InputDramas.html": "inputLink",
        "Profile.html": "profileLink",
        "Logout.html": "logoutLink",
    };

    if (pageToMenuMapping[currentPath]) {
        const targetMenu = document.getElementById(pageToMenuMapping[currentPath]);
        const targetLink = document.getElementById(pageToLinkMapping[currentPath]);

        if (targetMenu) {
            targetMenu.classList.add("show");
        }
        if (targetLink) {
            targetLink.classList.add("active");
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('#formApprove tr');
    
    rows.forEach(row => {
      row.addEventListener('click', function() {
        // // Ambil data dari baris
        // const drama = this.querySelector('td:nth-child(2)').innerText;
        // const actors = this.querySelector('td:nth-child(3)').innerText;
        // const genres = this.querySelector('td:nth-child(4)').innerText;
        // const synopsis = this.querySelector('td:nth-child(5)').innerText;
        // const status = this.querySelector('td:nth-child(6)').innerText;

        // // Set konten modal
        // const modalContent = `
        //   <strong>Drama:</strong> ${drama}<br>
        //   <strong>Actors:</strong> ${actors}<br>
        //   <strong>Genres:</strong> ${genres}<br>
        //   <strong>Synopsis:</strong> ${synopsis}<br>
        //   <strong>Status:</strong> ${status}
        // `;
        // document.getElementById('modalContent').innerHTML = modalContent;

        // Tampilkan modal
        // const myModal = new bootstrap.Modal(document.getElementById('validateModal'));
        // myModal.show();
      });
    });
  });
