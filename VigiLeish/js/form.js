async function geocodificarEndereco(endereco) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&limit=1&addressdetails=1`;
  const response = await fetch(url, {
    headers: {
      'Accept-Language': 'pt-BR',
      'User-Agent': 'vigialeish-app/1.0 (contato@vigialeish.org)'
    }
  });
  const data = await response.json();
  if (data.length > 0) {
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon)
    };
  }
  return null;
}

document.getElementById("formLeishmaniose").addEventListener("submit", async function (e) {
  e.preventDefault();

  const rua = document.getElementById("rua").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim().toUpperCase();
  const notificacao = document.querySelector("input[name='notificacao']:checked")?.value;
  const animal = document.querySelector("input[name='animal']:checked")?.value;
  const data = document.getElementById("data").value;
  const sintomasMarcados = Array.from(document.querySelectorAll("input[name='sintomas']:checked")).map(el => el.value);
  const outrosSintomas = document.getElementById("sintoma-outros").value || null;

  const enderecoCompleto = `${rua}, ${cidade} - ${estado}`;
  const local = await geocodificarEndereco(enderecoCompleto);

  if (!local) {
    document.getElementById("mensagem").innerText = "❌ Endereço inválido ou não encontrado. Verifique os dados.";
    return;
  }

  try {
    const doc = {
      endereco: enderecoCompleto,
      notificacao: notificacao || "",
      animal: animal || "",
      data: data ? new Date(data) : null,
      sintomas: sintomasMarcados,
      outros: outrosSintomas || "",
      dataRegistro: new Date(),
      latitude: local.latitude,
      longitude: local.longitude
    };

    await db.collection("casos_leish").add(doc);

    document.getElementById("mensagem").innerText = "✅ Registro enviado com sucesso!";
    document.getElementById("formLeishmaniose").reset();
    document.getElementById("sintoma-outros").disabled = true;
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    document.getElementById("mensagem").innerText = "❌ Erro ao enviar registro. Tente novamente.";
  }
});
