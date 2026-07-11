const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");

// الجوائز والألوان الخاصة بها
const prizes = [
    { text: "جرب ترسم", color: "#1abc9c" },
    { text: "جرب تعزف", color: "#2ecc71" },
    { text: "جرب تمثل", color: "#3498db" },
    { text: "جرب تصمم ", color: "#9b59b6" },
    { text: "جرب تعمل اعمال يدويه", color: "#f1c40f" },
    { text: "جرب ترنم او تلقي شعر", color: "#e67e22" }
];

const numSegments = prizes.length;
const arcSize = (2 * Math.PI) / numSegments;
let currentRotation = 0;
let isSpinning = false;

// رسم العجلة والجوائز
function drawWheel() {
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    prizes.forEach((prize, i) => {
        const angle = i * arcSize;
        
        // رسم القطاع الدائري
        ctx.beginPath();
        ctx.fillStyle = prize.color;
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, angle, angle + arcSize);
        ctx.lineTo(radius, radius);
        ctx.fill();

        // إضافة النصوص داخل القطاعات
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + arcSize / 2);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "right";
        ctx.fillText(prize.text, radius - 20, 5);
        ctx.restore();
    });
}

// تشغيل الدوران عند الضغط على الزر
spinBtn.addEventListener("click", () => {
    if (isSpinning) return; // منع الضغط المتكرر أثناء الدوران
    
    isSpinning = true;
    
    // توليد درجة دوران عشوائية (على الأقل 5 لفات كاملة + زاوية عشوائية)
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalSpin = (5 * 360) + extraDegrees;
    currentRotation += totalSpin;

    // تحريك العجلة عبر CSS
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    // حساب الجائزة الفائزة بعد انتهاء الحركة (4 ثوانٍ مثل الـ CSS)
    setTimeout(() => {
        isSpinning = false;
        
        // حساب الزاوية الفعلية المتبقية بعد الفرز
        const actualAngle = (currentRotation % 360);
        
        // المؤشر موجود في الأعلى (زاوية 270 درجة)، فنقوم بالحساب بناءً عليه
        const winningIndex = Math.floor((360 - actualAngle + 270) % 360 / (360 / numSegments));
        
        // إظهار النتيجة للمستخدم
        alert(`يلا قوم : ${prizes[winningIndex].text}`);
    }, 4000);
});

// رسم العجلة لأول مرة عند تحميل الصفحة
drawWheel();
