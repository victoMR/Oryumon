

  $(document).ready(function () {
    let currentPhase = 1;
    const phases = 4;

    function showPhase(phase) {
      for (let i = 1; i <= phases; i++) {
        if (i === phase) {
          $(`#phase${i}`).show();
        } else {
          $(`#phase${i}`).hide();
        }
      }
    }

    $("#nextButton").click(function () {
      if (currentPhase < phases) {
        if (validatePhase(currentPhase)) {
          currentPhase++;
          showPhase(currentPhase);
          if (currentPhase === phases) {
            $("#prevButton").show();
            $("#nextButton").hide();
            $("#showModalButton").show(); // Mostrar el botón y, por lo tanto, el modal en la última etapa
            $("#validationBanner").show();
          }
        }
        updateProgressBar();
      }
    });

    $("#prevButton").click(function () {
      if (currentPhase > 1) {
        currentPhase--;
        showPhase(currentPhase);
        updateProgressBar();
        if (currentPhase < phases) {
          $("#prevButton").show();
          $("#nextButton").show();
          $("button[type=submit]").hide();
          $("#validationBanner").hide();
        }
      }
    });
    $("#showModalButton").click(function () {
      // Abre el modal cuando se hace clic en el botón "Finalizar" en la etapa 4
      $("#myModal").modal("show");
    });

    // Función para validar si una fase está completa
    function validatePhase(phase) {
      let isValid = true;
      if (phase === 1) {
        if (
          $("#nombreCompleto").val() === "" ||
          $("#curp").val() === "" ||
          $("#rfc").val() === ""
        ) {
          isValid = false;
        }
      } else if (phase === 2) {
        if ($("#correo").val() === "" || $("#telefono").val() === "") {
          isValid = false;
        }
      } else if (phase === 3) {
        if ($("#usuario").val() === "" || $("#password").val() === "") {
          isValid = false;
        }
      }
      return isValid;
    }

    function updateProgressBar() {
      const progress = (currentPhase / phases) * 100;
      $(".progress-bar-original").css("width", `${progress}%`);
      $(".progress-bar-original").attr("aria-valuenow", progress);
    }

    showPhase(currentPhase);
    updateProgressBar();
  });


  document.addEventListener("DOMContentLoaded", function () {
    const passwordStrengthBar = document.querySelector(".progress-bar2");
    const passwordStrengthText = document.getElementById(
      "password-strength-text"
    );
    const passwordInput = document.getElementById("password"); // Selecciona el campo de contraseña

    passwordInput.addEventListener("input", function () {
      // Get the password strength
      const passwordStrength = zxcvbn(passwordInput.value).score;

      // Update the progress bar
      passwordStrengthBar.style.width = `${passwordStrength * 15}%`;

      // Update the password strength text
      const strengthText = [
        "Muy Débil",
        "Débil",
        "Razonable",
        "Fuerte",
        "Muy Fuerte",
      ];
      passwordStrengthText.textContent = strengthText[passwordStrength];
      const colors = ["#ff3333", "#ff9900", "#ffcc00", "#99cc00", "#009900"];

      // Actualiza el color de la barra de progreso y el texto
      passwordStrengthBar.style.width = `${passwordStrength * 15}%`;
      passwordStrengthBar.style.backgroundColor = colors[passwordStrength];
      passwordStrengthText.textContent = strengthText[passwordStrength];
    });
  });



  
// ------------------------------------------------
$("#showModalButton").click(function () {
    // Obtener datos del formulario
    const formData = {
      nombre: $("#nombreCompleto").val(),
      curp: $("#curp").val(),
      rfc: $("#rfc").val(),
      correo: $("#correo").val(),
      telefono: $("#telefono").val(),
      usuario: $("#usuario").val(),
      password: $("#password").val(),
      // Otros campos del formulario
    };
  
    // Crear una instancia de la clase Usuarios con los datos del formulario
    const nuevoUsuario = new Usuarios(null, formData);
  
    // Verificar si hubo algún error al setear las propiedades
    if (nuevoUsuario.bandera === 1) {
      console.error("Error al setear propiedades del usuario");
      return; // Puedes manejar el error de alguna manera aquí
    }
  
    // Obtener los datos en el formato esperado para enviar al servidor
    const datosAEnviar = nuevoUsuario.ObtenerDatos;
  
    // Realizar una solicitud AJAX al servidor
    $.ajax({
      type: "POST",
      url: "/agregarUsuario",
      data: datosAEnviar,
      success: function (data) {
        // Manejar la respuesta del servidor, si es necesario
        console.log("Datos enviados al servidor:", data);
      },
      error: function (error) {
        // Manejar errores de la solicitud AJAX
        console.error("Error al enviar datos al servidor:", error);
      },
    });
    res.redirect("/login/login");
  });
  