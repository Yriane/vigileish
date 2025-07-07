const tabela = document.getElementById("tabela");
const tbody = document.getElementById("tabela-body");
const carregando = document.getElementById("carregando");
const buscaInput = document.getElementById("busca");
const selectColuna = document.getElementById("coluna");
const resultadoContador = document.getElementById("resultado-contador");

function formatarData(data) {
  if (!data) return "-";
  const d = new Date(data.seconds ? data.seconds * 1000 : data);
  return d.toLocaleDateString("pt-BR");
}

async function carregarDados() {
  try {
    const snapshot = await db.collection("casos_leish").orderBy("dataRegistro", "desc").get();

    if (snapshot.empty) {
      carregando.textContent = "Nenhum registro encontrado.";
      return;
    }

    snapshot.forEach(doc => {
      const dados = doc.data();
      const tr = document.createElement("tr");

      const endereco = dados.endereco?.rua
        ? `${dados.endereco.rua}, ${dados.endereco.cidade} - ${dados.endereco.estado}`
        : dados.endereco || "Não informado";

      tr.innerHTML = `
        <td>${endereco}</td>
        <td>${dados.notificacao}</td>
        <td>${dados.animal}</td>
        <td>${formatarData(dados.data || dados.dataObservacao)}</td>
        <td>${(dados.sintomas || []).join(", ")}</td>
        <td>${dados.outros || dados.sintomasOutros || "-"}</td>
        <td>${formatarData(dados.dataRegistro)}</td>
      `;
      tbody.appendChild(tr);
    });

    carregando.style.display = "none";
    tabela.style.display = "table";
    atualizarContador();

  } catch (error) {
    carregando.textContent = "❌ Erro ao carregar dados.";
    console.error("Erro:", error);
  }
}

function atualizarContador() {
  const linhas = tbody.getElementsByTagName("tr");
  let totalVisiveis = 0;
  for (let i = 0; i < linhas.length; i++) {
    if (linhas[i].style.display !== "none") {
      totalVisiveis++;
    }
  }
  resultadoContador.style.display = "block";
  resultadoContador.textContent = `🔍 ${totalVisiveis} resultado${totalVisiveis !== 1 ? "s" : ""} encontrado${totalVisiveis !== 1 ? "s" : ""}.`;
}

buscaInput.addEventListener("input", () => {
  const termo = buscaInput.value.toLowerCase();
  const colunaIndex = parseInt(selectColuna.value);
  const linhas = tbody.getElementsByTagName("tr");

  for (let i = 0; i < linhas.length; i++) {
    const celulas = linhas[i].getElementsByTagName("td");
    const textoCelula = celulas[colunaIndex]?.textContent.toLowerCase() || "";
    linhas[i].style.display = textoCelula.includes(termo) ? "" : "none";
  }

  atualizarContador();
});

carregarDados();
