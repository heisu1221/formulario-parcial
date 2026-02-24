document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const usuario = document.getElementById("usuario").value.trim();
            const clave = document.getElementById("clave").value.trim();

            if (usuario === "admin" && clave === "1234expo") {
                window.location.href = "formulario.html";
            } else {
                alert("Credenciales incorrectas");
            }
        });
    }

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let quejas = JSON.parse(localStorage.getItem("quejas")) || [];

    const clienteForm = document.getElementById("clienteForm");

    if (clienteForm) {
        clienteForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const dni = document.getElementById("dni");
            const nombre = document.getElementById("nombre");
            const edad = document.getElementById("edad");
            const telefono = document.getElementById("telefono");
            const correo = document.getElementById("correo");

            limpiar();

            let valido = true;

            if (!/^\d{8}$/.test(dni.value.trim())) {
                error(dni); valido = false;
            }

            if (clientes.some(c => c.dni === dni.value.trim())) {
                error(dni); valido = false;
            }

            if (nombre.value.trim().length < 3) {
                error(nombre); valido = false;
            }

            if (parseInt(edad.value) < 18 || edad.value === "") {
                error(edad); valido = false;
            }

            if (telefono.value && !/^\d{9}$/.test(telefono.value.trim())) {
                error(telefono); valido = false;
            }

            if (correo.value && !/^\S+@\S+\.\S+$/.test(correo.value.trim())) {
                error(correo); valido = false;
            }

            if (!valido) return;

            clientes.push({
                dni: dni.value.trim(),
                nombre: nombre.value.trim(),
                edad: edad.value,
                telefono: telefono.value.trim(),
                correo: correo.value.trim()
            });

            localStorage.setItem("clientes", JSON.stringify(clientes));
            clienteForm.reset();
            listarClientes();
        });
        listarClientes();
    }

    function listarClientes() {
        const lista = document.getElementById("listaClientes");
        if (!lista) return;
        lista.innerHTML = "";
        clientes.forEach((c, i) => {
            lista.innerHTML += `
<div class="client-item">
<div>
<strong>${c.nombre}</strong>
<p>DNI: ${c.dni} • ${c.correo}</p>
</div>
<div>
<button class="btn-danger" onclick="eliminarCliente(${i})">Eliminar</button>
</div>
</div>
`;
        });
    }

    window.eliminarCliente = function (i) {
        clientes.splice(i, 1);
        localStorage.setItem("clientes", JSON.stringify(clientes));
        listarClientes();
    }

    const quejaForm = document.getElementById("quejaForm");

    if (quejaForm) {
        quejaForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const cliente = document.getElementById("clienteQueja");
            const motivo = document.getElementById("motivo");
            const descripcion = document.getElementById("descripcion");

            limpiar();

            let valido = true;

            if (cliente.value.trim() === "") {
                error(cliente); valido = false;
            }

            if (motivo.value.trim() === "") {
                error(motivo); valido = false;
            }

            if (!valido) return;

            quejas.push({
                cliente: cliente.value.trim(),
                motivo: motivo.value.trim(),
                descripcion: descripcion.value.trim()
            });

            localStorage.setItem("quejas", JSON.stringify(quejas));
            quejaForm.reset();
            listarQuejas();
        });
        listarQuejas();
    }

    function listarQuejas() {
        const lista = document.getElementById("listaQuejas");
        if (!lista) return;
        lista.innerHTML = "";
        quejas.forEach(q => {
            lista.innerHTML += `
<div class="client-item">
<div>
<strong>${q.cliente}</strong>
<p>${q.motivo}</p>
</div>
</div>
`;
        });
    }

    function error(input) {
        input.style.border = "2px solid red";
    }

    function limpiar() {
        document.querySelectorAll("input, textarea").forEach(i => {
            i.style.border = "";
        });
    }

});