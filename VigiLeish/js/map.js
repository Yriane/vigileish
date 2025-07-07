const map = L.map('map').setView([-15.78, -47.93], 5);
const markers = L.markerClusterGroup();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function formatarData(data) {
  if (!data) return "-";
  const d = new Date(data.seconds ? data.seconds * 1000 : data);
  return d.toLocaleDateString("pt-BR");
}

async function carregarDadosFirebase() {
  const snapshot = await db.collection("casos_leish").get();

  snapshot.forEach((doc) => {
    const dados = doc.data();

    if (!dados.latitude || !dados.longitude) return;

    const popupHTML = `
      <b>Endereço:</b> ${dados.endereco || '-'}<br/>
      <b>Notificação:</b> ${dados.notificacao || '-'}<br/>
      <b>Animal:</b> ${dados.animal || '-'}<br/>
      <b>Data:</b> ${formatarData(dados.data)}<br/>
      <b>Sintomas:</b> ${(dados.sintomas || []).join(', ')}<br/>
      <b>Outros:</b> ${dados.outros || '-'}
    `;

    const marker = L.marker([dados.latitude, dados.longitude]).bindPopup(popupHTML);
    markers.addLayer(marker);
  });

  map.addLayer(markers);
}

carregarDadosFirebase();
