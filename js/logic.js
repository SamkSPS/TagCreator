const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const widthPreset = document.getElementById('widthPreset');
const customWidth = document.getElementById('customWidth');


const font = {
    'A': [0x7E,0x7F,0x11,0x11,0x7F,0x7E], 'B': [0x7F,0x7F,0x49,0x49,0x7F,0x36], 'C': [0x3E,0x7F,0x41,0x41,0x63,0x22],
    'D': [0x7F,0x7F,0x41,0x41,0x7F,0x3E], 'E': [0x7F,0x7F,0x49,0x49,0x49,0x41], 'F': [0x7F,0x7F,0x09,0x09,0x09,0x01],
    'G': [0x3E,0x7F,0x41,0x49,0x79,0x79], 'H': [0x7F,0x7F,0x08,0x08,0x7F,0x7F], 'I': [0x41,0x7F,0x7F,0x41],
    'J': [0x20,0x60,0x41,0x7F,0x3F,0x01], 'K': [0x7F,0x7F,0x08,0x14,0x63,0x41], 'L': [0x7F,0x7F,0x40,0x40,0x40],
    'M': [0x7F,0x7F,0x0C,0x18,0x0C,0x7F,0x7F], 'N': [0x7F,0x7F,0x06,0x0C,0x7F,0x7F], 'O': [0x3E,0x7F,0x41,0x41,0x7F,0x3E],
    'P': [0x7F,0x7F,0x09,0x09,0x0F,0x06], 'Q': [0x3E,0x7F,0x41,0x51,0x7E,0x7E], 'R': [0x7F,0x7F,0x09,0x19,0x7F,0x66],
    'S': [0x26,0x6F,0x49,0x49,0x7B,0x32], 'T': [0x01,0x01,0x7F,0x7F,0x01,0x01], 'U': [0x3F,0x7F,0x40,0x40,0x7F,0x3F],
    'V': [0x0F,0x3F,0x70,0x70,0x3F,0x0F], 'W': [0x7F,0x7F,0x30,0x18,0x30,0x7F,0x7F], 'X': [0x63,0x77,0x1C,0x1C,0x77,0x63],
    'Y': [0x07,0x0F,0x78,0x78,0x0F,0x07], 'Z': [0x61,0x71,0x59,0x4D,0x47,0x43], 'Ç': [0x3E,0x7F,0x41,0x41,0x63,0xA2],

    '0': [0x3E,0x7F,0x41,0x41,0x7F,0x3E], '1': [0x00,0x42,0x7F,0x7F,0x40], '2': [0x62,0x73,0x59,0x49,0x6F,0x66],
    '3': [0x22,0x63,0x49,0x49,0x7F,0x36], '4': [0x18,0x1C,0x16,0x53,0x7F,0x7F], '5': [0x27,0x67,0x45,0x45,0x7D,0x39],
    '6': [0x3E,0x7F,0x49,0x49,0x7B,0x32], '7': [0x03,0x03,0x71,0x79,0x0F,0x07], '8': [0x36,0x7F,0x49,0x49,0x7F,0x36],
    '9': [0x26,0x6F,0x49,0x49,0x7F,0x3E],

    '#': [0x14,0x7F,0x14,0x7F,0x14], '$': [0x24,0x2A,0x7F,0x2A,0x12], '%': [0x23,0x13,0x08,0x64,0x62],
    '¨': [0x01,0x01,0x00,0x01,0x01], '&': [0x36,0x49,0x55,0x22,0x50], ' ': [0x00,0x00,0x00],
    '!': [0x00,0x00,0x5F,0x5F,0x00,0x00], '@': [0x3E,0x7F,0x41,0x5D,0x5D,0x1F], '+': [0x08,0x08,0x3E,0x3E,0x08,0x08],
    '*': [0x2A,0x1C,0x3E,0x3E,0x1C,0x2A], '-': [0x08,0x08,0x08,0x08,0x08], '/': [0x60,0x70,0x1C,0x07,0x03],
    '_': [0x40,0x40,0x40,0x40,0x40,0x40], '(': [0x1C,0x3E,0x63,0x41], ')': [0x41,0x63,0x3E,0x1C],
    '[': [0x7F,0x7F,0x41,0x41], ']': [0x41,0x41,0x7F,0x7F], '~': [0x02,0x01,0x02,0x04,0x02],
    "'": [0x00,0x04,0x07,0x03,0x00], ';': [0x00,0x44,0x46,0x00], ':': [0x00,0x24,0x24,0x00],
    '?': [0x02,0x03,0x51,0x59,0x0F,0x06]
};

function addColor() {
    const div = document.createElement('div');
    div.className = 'color-row';
    div.innerHTML = `<input type="color" class="color-picker" value="#ffffff"><button class="btn-del" onclick="removeColor(this)">X</button>`;
    document.getElementById('colorContainer').appendChild(div);
    bindEvents();
    draw();
}

function removeColor(btn) {
    if(document.querySelectorAll('.color-row').length > 1) {
        btn.parentElement.remove();
        draw();
    }
}

function hexToRgb(hex) {
    let r = parseInt(hex.slice(1,3), 16), g = parseInt(hex.slice(3,5), 16), b = parseInt(hex.slice(5,7), 16);
    return {r, g, b};
}

function darkenColor(hex, percent) {
    let {r, g, b} = hexToRgb(hex);
    r = Math.floor(r * (1 - percent));
    g = Math.floor(g * (1 - percent));
    b = Math.floor(b * (1 - percent));
    return `rgb(${r},${g},${b})`;
}

function getComplexGradient(W, H, colors, isDark = false) {
    const dir = document.getElementById('gradDir').value;
    
    if (colors.length <= 1) {
        return isDark ? darkenColor(colors[0] || "#ffffff", 0.5) : (colors[0] || "#ffffff");
    }

    let g;
    if (dir === 'vertical') g = ctx.createLinearGradient(0, 0, 0, H);
    else if (dir === 'horizontal') g = ctx.createLinearGradient(0, 0, W, 0);
    else if (dir === 'diagonal') g = ctx.createLinearGradient(0, 0, W/2, H);
    else if (dir === 'diagonallf') g = ctx.createLinearGradient(0, 0, W, H);
    else g = ctx.createRadialGradient(W/2, H/2, 2, W/2, H/2, W/1.5);

    colors.forEach((color, i) => {
        let finalColor = isDark ? darkenColor(color, 0.5) : color;
        g.addColorStop(i / (colors.length - 1), finalColor);
    });
    return g;
}

widthPreset.addEventListener('change', function() {
    if (this.value === 'custom') {
        customWidth.disabled = false;
        customWidth.focus(); 
    } else {
        customWidth.disabled = true;
        customWidth.value = this.value;
    }
    draw(); 
});

function draw() {
    const text = document.getElementById('textInput').value.toUpperCase();
    const colors = Array.from(document.querySelectorAll('.color-picker')).map(input => input.value);
    const useExtraBorder = document.getElementById('extraBorder').checked;

    // Pega o valor do preset
    const p = widthPreset.value;
    // Se for custom, lê o input. Se não, usa o valor do próprio select.
    canvas.width = p === 'custom' ? parseInt(customWidth.value) || 80 : parseInt(p);
    canvas.height = 18;
    
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Fundo Principal (Sombra/Borda externa)
    ctx.fillStyle = getComplexGradient(W, H, colors, true);
    ctx.fillRect(2, 0, W-4, 18);
    ctx.fillRect(1, 1, W-2, 16);
    ctx.fillRect(0, 2, W, 14);

    if(useExtraBorder) {
        // Desenha uma área interna menor para criar o efeito de moldura
        ctx.fillStyle = getComplexGradient(W, H, colors);
        ctx.fillRect(3, 2, W-6, 14); 
        ctx.fillRect(2, 3, W-4, 12);
    } else {
        // Preenchimento total (sem borda extra)
        ctx.fillStyle = getComplexGradient(W, H, colors);
        ctx.fillRect(2, 1, W-4, 16); // Ajuste leve para não cobrir a borda externa
        ctx.fillRect(1, 2, W-2, 14);
    }

    // Renderiza o texto (o W aqui já é o valor atualizado)
    renderText(text, W, 5);
}

function renderText(text, canvasW, y) {
    const gap = 1;
    let totalTextWidth = 0;
    const upperText = text.toUpperCase();

    for (let i = 0; i < upperText.length; i++) {
        let char = upperText[i];
        let baseChar = char;

        if ("ÁÉÍÓÚÊÈÃÕÔ".includes(char)) {
            if ("ÁÃ".includes(char)) baseChar = "A";
            else if ("ÉÊÈ".includes(char)) baseChar = "E";
            else if (char === "Í") baseChar = "I";
            else if ("ÓÕÔ".includes(char)) baseChar = "O";
            else if (char === "Ú") baseChar = "U";
        } else if (char === "Ç") {
            baseChar = "C";
        }

        let glyph = font[baseChar] || font[' '];
        totalTextWidth += glyph.length + gap;
    }
    totalTextWidth -= gap;

    let x = Math.floor((canvasW - totalTextWidth) / 2);

    for (let i = 0; i < upperText.length; i++) {
        let char = upperText[i];
        let baseChar = char;

        if ("ÁÉÍÓÚÊÈÃÕÔ".includes(char)) {
            if ("ÁÃ".includes(char)) baseChar = "A";
            else if ("ÉÊÈ".includes(char)) baseChar = "E";
            else if (char === "Í") baseChar = "I";
            else if ("ÓÕÔ".includes(char)) baseChar = "O";
            else if (char === "Ú") baseChar = "U";
        } else if (char === "Ç") {
            baseChar = "C";
        }

        let glyph = font[baseChar] || font[' '];
        let currentGlyphWidth = glyph.length;

        for (let c = 0; c < currentGlyphWidth; c++) {
            for (let r = 0; r < 7; r++) {
                if ((glyph[c] >> r) & 1) {
                    ctx.fillStyle = '#000';
                    ctx.fillRect(x + c + 1, y + r + 1, 1, 1);
                    ctx.fillStyle = '#FFF';
                    ctx.fillRect(x + c, y + r, 1, 1);
                }
            }
        }

        const drawAccentPixel = (px, py) => {
            ctx.fillStyle = '#000'; ctx.fillRect(px + 1, py + 1, 1, 1); 
            ctx.fillStyle = '#FFF'; ctx.fillRect(px, py, 1, 1);         
        };

        if (char === "Á" || char === "É" || char === "Í" || char === "Ó" || char === "Ú") {
            // ACENTO AGUDO (Inclinado para a Direita)
            drawAccentPixel(x + 3, y - 3); 
            drawAccentPixel(x + 2, y - 2); 
        } else if (char === "È") {
            // CRASE / GRAVE (Inclinado para a Esquerda)
            drawAccentPixel(x + 1, y - 3); 
            drawAccentPixel(x + 2, y - 2); 
        } else if (char === "Ê" || char === "Ô") {
            // CIRCUNFLEXO
            drawAccentPixel(x + 2, y - 3); 
            drawAccentPixel(x + 1, y - 2); 
            drawAccentPixel(x + 3, y - 2); 
        } else if (char === "Ã" || char === "Õ") {
            // TIL
            drawAccentPixel(x + 1, y - 2); drawAccentPixel(x + 2, y - 2);
            drawAccentPixel(x + 3, y - 3); drawAccentPixel(x + 4, y - 3);
        } else if (char === "Ç") {
            // CEDILHA
            drawAccentPixel(x + 2, y + 7); 
            drawAccentPixel(x + 3, y + 8); 
        }

        x += currentGlyphWidth + gap;
    }
}

function bindEvents() {
    document.querySelectorAll('input, select').forEach(el => {
        el.oninput = draw;
    });
}

function download() {
    const text = document.getElementById('textInput').value;
    const link = document.createElement('a');
    link.download = text+`.png`;
    link.href = canvas.toDataURL();
    link.click();
}

bindEvents();
draw();
