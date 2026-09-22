const tabs = document.querySelectorAll('[role="tab"]');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => item.setAttribute('aria-selected', 'false'));
  document.querySelectorAll('.tab-content').forEach(panel => panel.classList.remove('active'));
  tab.setAttribute('aria-selected', 'true');
  document.getElementById(tab.dataset.tab).classList.add('active');
}));

const modal = document.getElementById('medical-modal');
document.querySelector('[data-open-modal]').addEventListener('click', () => modal.showModal());
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
document.querySelector('.modal-ok').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

const checks = document.querySelectorAll('#symptom-form input');
const result = document.querySelector('.check-result');
checks.forEach(check => check.addEventListener('change', () => {
  const count = [...checks].filter(item => item.checked).length;
  result.classList.toggle('urgent', count > 0);
  result.innerHTML = count > 0
    ? '<strong>Buscá atención médica urgente</strong><p>Marcaste una o más señales de alarma. No esperes a la consulta programada.</p>'
    : '<strong>Sin alertas marcadas</strong><p>Coordiná igualmente una consulta pronta con traumatología.</p>';
}));

document.getElementById('download-plan').addEventListener('click', () => {
  const guide = `GUÍA PARA TU CONSULTA — RODILLA DERECHA\n\nHallazgos informados:\n• Signos de rotura completa del LCA\n• Rotura del cuerno posterior del menisco interno\n• Protrusión posterior del menisco externo\n• Lesión contusiva del platillo tibial externo\n\nLlevá:\n□ Imágenes originales de la resonancia\n□ Informe escrito\n□ Lista de medicamentos y antecedentes\n□ Registro de dolor, hinchazón, bloqueos e inestabilidad\n\nPreguntas:\n1. ¿La rodilla es estable en el examen físico?\n2. ¿Qué carga y movimientos son seguros ahora?\n3. ¿Necesito muletas o rodillera?\n4. ¿Qué fisioterapia corresponde?\n5. ¿Qué factores definen tratamiento conservador o cirugía?\n\nEsta guía es educativa y no reemplaza una evaluación médica.`;
  const blob = new Blob([guide], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob); link.download = 'guia-consulta-rodilla.txt'; link.click();
  URL.revokeObjectURL(link.href);
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
