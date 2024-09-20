// Toggle de navegación
document.querySelector('.navegacion__toggle').addEventListener('click', function () {
    document.querySelector('.navegacion__lista').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("-5HQ40t-xfVMnLzmH"); // ID de emailjs

    const form = document.querySelector('.contacto__formulario');
    const nombreInput = document.getElementById('nombre');
    const asuntoInput = document.getElementById('asunto');
    const correoInput = document.getElementById('correo');
    const mensajeInput = document.getElementById('mensaje');
    const nombreError = document.getElementById('nombre-error');
    const asuntoError = document.getElementById('asunto-error');
    const emailError = document.getElementById('email-error');
    const mensajeError = document.getElementById('mensaje-error');
    const submitButton = document.querySelector('.contacto__boton');

    // Función para validar el formulario
    function validateForm() {
        let valid = true;

        // Limpiar mensajes de error
        nombreError.textContent = '';
        asuntoError.textContent = '';
        emailError.textContent = '';
        mensajeError.textContent = '';

        // Validación del campo Nombre
        if (!nombreInput.value.trim()) {
            nombreError.textContent = 'Campo Nombre no debe estar en blanco o vacío.';
            valid = false;
        } else if (nombreInput.value.length > 50) {
            nombreError.textContent = 'Campo Nombre debe contener máximo 50 caracteres.';
            valid = false;
        }

        // Validación del campo Asunto
        if (!asuntoInput.value.trim()) {
            asuntoError.textContent = 'Campo Asunto no debe estar en blanco o vacío.';
            valid = false;
        } else if (asuntoInput.value.length > 50) {
            asuntoError.textContent = 'Campo Asunto debe contener máximo 50 caracteres.';
            valid = false;
        }

        // Validación del campo Correo
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!correoInput.value.trim()) {
            emailError.textContent = 'Campo Correo no debe estar en blanco o vacío.';
            valid = false;
        } else if (!emailPattern.test(correoInput.value.trim())) {
            emailError.textContent = 'Por favor, introduce un correo electrónico válido.';
            valid = false;
        }

        // Validación del campo Mensaje
        if (!mensajeInput.value.trim()) {
            mensajeError.textContent = 'Campo Mensaje no debe estar en blanco o vacío.';
            valid = false;
        } else if (mensajeInput.value.length > 300) {
            mensajeError.textContent = 'Campo Mensaje debe contener máximo 300 caracteres.';
            valid = false;
        }

        // Habilitar o deshabilitar el botón de envío
        submitButton.disabled = !valid;

        return valid;
    }

    // Agregar eventos para la validación
    form.addEventListener('input', validateForm); 
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        if (validateForm()) {
            // Enviar el correo
            emailjs.send("service_uqj4yij", "template_utkhpwk", {
                from_name: nombreInput.value,
                subject: asuntoInput.value,
                from_email: correoInput.value,
                message: mensajeInput.value
            })
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Mensaje enviado con éxito!');
                // Limpiar el formulario
                nombreInput.value = '';
                asuntoInput.value = '';
                correoInput.value = '';
                mensajeInput.value = '';
                submitButton.disabled = true; // Deshabilitar el botón nuevamente
            }, (error) => {
                console.log('Error...', error);
                alert('Error al enviar el mensaje. Inténtalo de nuevo.');
            });
        }
    });

    submitButton.disabled = true; 
});
