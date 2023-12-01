
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('registroForm');
    var totalCampos = form.querySelectorAll('input[required]').length;
    var progresoActual = 0;

    function actualizarBarraProgreso() {
      var porcentaje = (progresoActual / totalCampos) * 100;
      document.querySelector('.barra-progreso').style.width = porcentaje + '%';
      document.querySelector('.texto-progreso').textContent = progresoActual + '/' + totalCampos;
    }

    form.addEventListener('input', function (event) {
      if (event.target.tagName === 'INPUT' && event.target.required) {
        if (event.target.value.trim() !== '') {
          progresoActual++;
          actualizarBarraProgreso();
        }
      }
    });
  });
