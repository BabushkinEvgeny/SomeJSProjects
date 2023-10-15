 const canvas = document.getElementById("canvas");
 const ctx = canvas.getContext("2d");
 const increaseBtn = document.getElementById('increase');
 const decreaseBtn = document.getElementById('decrease');

 let size = 10;
 const span = document.getElementById('size');
 const body = document.body || document.documentElement;
 const saveButton = document.getElementById('save');

 let color = 'black';
 const colorInput = document.getElementById('color');

 let isMousePressed = false;
 x = undefined; y = undefined;

 const clearBtn = document.getElementById('clear');
 const erase = document.getElementById('erase');
 const cursor = document.querySelector('cursor');

 erase.addEventListener('click', () => {
    color = "#fff";
 });

 canvas.addEventListener('mouseenter', () => {
    console.log('Курсор вошел на холст');
    body.style.cursor = 'crosshair';
  });
  
  // Обработчик события для выхода курсора с холста
 canvas.addEventListener('mouseleave', () => {
    console.log('Курсор вышел с холста');
    body.style.cursor = 'auto';
  });


 colorInput.addEventListener('change', (change) => {
    color = change.target.value;
 });


 function changeSize(s) {
    span.innerText = s;
 }

 increaseBtn.addEventListener('click', () => {
    if (size >= 80) {
        size = 80;
        changeSize(size);
    } else {
        size += 5;
        changeSize(size);
    }
 });


 decreaseBtn.addEventListener('click', () => {
    if (size <= 5) {
        size = 5;
        changeSize(size);
    } else {
        size -= 5;
        changeSize(size);
    }
 });

 function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

 canvas.addEventListener('mousedown', (coordinates) => {
    isMousePressed = true;
    x = coordinates.offsetX;
    y = coordinates.offsetY;

    // console.log(x,y);
 });

 canvas.addEventListener('mouseup', () => {
    isMousePressed = false;
    x = undefined;
    y = undefined;
 });

 canvas.addEventListener('mousemove', (coordinates) => {

    if (isMousePressed){
        const x2 = coordinates.offsetX;
        const y2 = coordinates.offsetY;
        
        drawCircle(x2,y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
 });

 clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
 });

 saveButton.addEventListener('click', () => {

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
  

    const dataURL = tempCanvas.toDataURL('image/png');
  

    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'myCanvas.png'; 
  

    document.body.appendChild(downloadLink);
    downloadLink.click();
  

    document.body.removeChild(downloadLink);
 });
  
  
  
  
  
  
  

