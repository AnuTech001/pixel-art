document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("pixel-grid");
  const colorPalette = document.getElementById("cor-paleta");
  const clearBtn = document.getElementById("clear-btn");
  const randomBtn = document.getElementById("random-btn");

  // Cores disponíveis
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
    "#A52A2A",
    "#000000",
    "#FFFFFF",
    "#808080",
    "#FFD700",
    "#008000",
    "#000080",
    "#800000",
    "#00FF7F",
    "#4B0082",
    "#FF4500",
    "#ADD8E6",
    "#D2691E",
    "#9ACD32",
    "#FF1493",
    "#20B2AA",
    "#FF6347",
    "#40E0D0",
    "#EE82EE",
    "#F5DEB3",
    "#7FFF00",
    "#DC143C",
  ];

  let selectedColor = colors[0];

  // Criar paleta de cores
  colors.forEach((color) => {
    const colorOption = document.createElement("div");
    colorOption.className = "cor-opcao";
    colorOption.style.backgroundColor = color;
    colorOption.dataset.color = color;

    if (color === selectedColor) {
      colorOption.classList.add("ativada");
    }

    colorOption.addEventListener("click", function () {
      selectedColor = this.dataset.color;
      document.querySelectorAll(".cor-opcao").forEach((opt) => {
        opt.classList.remove("ativada");
      });
      this.classList.add("ativada");
    });

    colorPalette.appendChild(colorOption);
  });

  const coordenadasY = document.querySelector(".coordenadas-y");
  for (let i = 1; i <= 20; i++) {
    const linha = document.createElement("div");
    linha.textContent = i;
    coordenadasY.appendChild(linha);
  }

  // ✅ Coordenadas X (embaixo)
  const coordenadasX = document.querySelector(".coordenadas-x");
  for (let i = 1; i <= 20; i++) {
    const coluna = document.createElement("div");
    coluna.textContent = i;
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
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      pixel.style.backgroundColor = randomColor;
    });
  });
});
