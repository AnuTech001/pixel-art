document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("pixel-grid");
  const colorPalette = document.getElementById("cor-paleta");
  const clearBtn = document.getElementById("clear-btn");
  const randomBtn = document.getElementById("random-btn");
  const saveBtn = document.getElementById("save-btn");

  // Cores disponíveis com nomes amigáveis
  const colors = [
    { hex: "#FF0000", name: "Vermelho" },
    { hex: "#00FF00", name: "Verde" },
    { hex: "#0000FF", name: "Azul" },
    { hex: "#FFFF00", name: "Amarelo" },
    { hex: "#FF00FF", name: "Magenta" },
    { hex: "#00FFFF", name: "Ciano" },
    { hex: "#FFA500", name: "Laranja" },
    { hex: "#800080", name: "Roxo" },
    { hex: "#FFC0CB", name: "Rosa" },
    { hex: "#A52A2A", name: "Marrom" },
    { hex: "#000000", name: "Preto" },
    { hex: "#FFFFFF", name: "Branco" },
    { hex: "#808080", name: "Cinza" },
    { hex: "#FFD700", name: "Dourado" },
    { hex: "#008000", name: "Verde Escuro" },
    { hex: "#000080", name: "Azul Marinho" },
    { hex: "#800000", name: "Vermelho Escuro" },
    { hex: "#00FF7F", name: "Verde Primavera" },
    { hex: "#4B0082", name: "Índigo" },
    { hex: "#FF4500", name: "Vermelho Laranja" },
    { hex: "#ADD8E6", name: "Azul Claro" },
    { hex: "#D2691E", name: "Chocolate" },
    { hex: "#9ACD32", name: "Amarelo Esverdeado" },
    { hex: "#FF1493", name: "Rosa Profundo" },
    { hex: "#20B2AA", name: "Verde Azulado Claro" },
    { hex: "#FF6347", name: "Vermelho Tomate" },
    { hex: "#40E0D0", name: "Turquesa" },
    { hex: "#EE82EE", name: "Violeta" },
    { hex: "#F5DEB3", name: "Trigo" },
    { hex: "#7FFF00", name: "Verde Chartreuse" },
    { hex: "#DC143C", name: "Carmesim" },
  ];

  let selectedColor = colors[0].hex;

  colors.forEach((colorObj) => {
    const colorOption = document.createElement("div");
    colorOption.className = "cor-opcao";
    colorOption.style.backgroundColor = colorObj.hex;
    colorOption.dataset.color = colorObj.hex;
    colorOption.dataset.colorName = colorObj.name; // Adiciona o nome da cor

    const nomeCor = document.createElement("span");
    nomeCor.textContent = colorObj.name;
    nomeCor.className = "nome-cor"; // Pode ser ocultado visualmente com CSS, mas ainda lido pelo VLibras
    colorOption.appendChild(nomeCor);

    // Atributos de acessibilidade
    colorOption.setAttribute("role", "button");
    colorOption.setAttribute("aria-label", `Cor ${colorObj.name}`);
    colorOption.setAttribute("tabindex", "0"); // Torna focável com teclado
    colorOption.setAttribute("aria-pressed", "false");
    colorOption.setAttribute("position", "absolute");

    if (colorObj.hex === selectedColor) {
      colorOption.classList.add("ativada");
      colorOption.setAttribute("aria-pressed", "true");
    }

    colorOption.addEventListener("click", function () {
      selectedColor = this.dataset.color;
      document.querySelectorAll(".cor-opcao").forEach((opt) => {
        opt.classList.remove("ativada");
        opt.setAttribute("aria-pressed", "false");
      });
      this.classList.add("ativada");
      this.setAttribute("aria-pressed", "true");

      // Feedback para leitor de tela
      this.focus();
    });

    // Suporte a teclado
    colorOption.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

    colorPalette.appendChild(colorOption);
  });

  // Coordenadas Y (lado esquerdo)
  const coordenadasY = document.querySelector(".coordenadas-y");
  for (let i = 20; i >= 1; i--) {
    const linha = document.createElement("div");
    linha.textContent = i;
    coordenadasY.appendChild(linha);
  }

  // Coordenadas X (embaixo)
  const coordenadasX = document.querySelector(".coordenadas-x");
  for (let i = 1; i <= 20; i++) {
    const coluna = document.createElement("div");
    coluna.textContent = String.fromCharCode(64 + i);
    coordenadasX.appendChild(coluna);
  }

  // Criar grade de pixels (20x20)
  for (let i = 0; i < 20 * 20; i++) {
    const pixel = document.createElement("div");
    pixel.className = "pixel";

    pixel.addEventListener("click", function () {
      this.style.backgroundColor = selectedColor;
    });

    pixel.addEventListener("mouseover", function (e) {
      // Colorir enquanto arrasta o mouse com o botão pressionado
      if (e.buttons === 1) {
        this.style.backgroundColor = selectedColor;
      }
    });

    grid.appendChild(pixel);
  }

  // Limpar a grade
  clearBtn.addEventListener("click", function () {
    document.querySelectorAll(".pixel").forEach((pixel) => {
      pixel.style.backgroundColor = "white";
    });
  });

  // Modo cores aleatórias
  randomBtn.addEventListener("click", function () {
    document.querySelectorAll(".pixel").forEach((pixel) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)].hex;
      pixel.style.backgroundColor = randomColor;
    });
  });

  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      // Verifica se html2canvas está disponível
      if (typeof html2canvas === "undefined") {
        alert(
          'Biblioteca html2canvas não encontrada! Adicione no HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>'
        );
        return;
      }

      html2canvas(grid)
        .then((canvas) => {
          const link = document.createElement("a");
          link.download = "pixel-art.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        })
        .catch((error) => {
          console.error("Erro ao salvar imagem:", error);
          alert("Erro ao salvar imagem. Verifique o console para detalhes.");
        });
    });
  }
});
