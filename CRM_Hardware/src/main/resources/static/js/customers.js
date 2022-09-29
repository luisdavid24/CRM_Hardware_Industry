window.addEventListener('DOMContentLoaded', event => {

// Toggle the side navigation
const sidebarToggle = document.body.querySelector('#sidebarToggle');
if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
});

function prueba() {
    var btn = document.getElementById("sidebarToggle")
    var bd = document.getElementById("body")

    btn.innerHTML = "<i class='bi bi-chevron-right' ></i>";

    if (bd.classList.contains("sb-sidenav-toggled")) {
    btn.innerHTML = "<i class='bi bi-chevron-left' ></i>"
    }
}