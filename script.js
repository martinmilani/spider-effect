let banner = document.querySelector(".banner");
let canvas = document.getElementById("dotsCanvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let ctx = canvas.getContext("2d");

// ctx.filter = "blur(1px)";

let dots = [];
let arrColors = ["#eee", "#545454", "#596d91", "#bb5a68", "#696541"];
for (let i = 0; i < 50; i++) {
  dots.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    size: Math.random() * 3 + 5,
    color: arrColors[Math.floor(Math.random() * 5)],
  });
}

const drawDots = () => {
  dots.forEach((dot) => {
    ctx.fillStyle = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
    ctx.fill();
  });
};

drawDots();
banner.addEventListener("mousemove", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
  let mouse = {
    x: e.pageX - banner.getBoundingClientRect().left,
    y: e.pageY - banner.getBoundingClientRect().top,
  };

  dots.forEach((dot) => {
    let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
    if (distance < 300) {
      ctx.strokeStyle = dot.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  });
});

banner.addEventListener("mouseleave", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
});
