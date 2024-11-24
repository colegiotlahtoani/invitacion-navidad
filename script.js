document.addEventListener("DOMContentLoaded", () => {
    // 1. Animación de escritura dinámica en el título
    const title = document.querySelector("header.hero h1");
    const text = title.textContent;
    title.textContent = "";
    let i = 0;
    const typeEffect = setInterval(() => {
        title.textContent += text.charAt(i);
        i++;
        if (i === text.length) clearInterval(typeEffect);
    }, 80);

    // 2. Efectos en los títulos con colores y subrayado animado
    const titles = [
        { selector: "#gallery h2", color: "#b30000" }, // Rojo
        { selector: "#details h2", color: "#ffcc00" }, // Amarillo
        { selector: "#access h2", color: "#008000" }, // Verde
        { selector: "#countdown h2", color: "#ff0000" }, // Rojo vibrante para el contador
    ];

    titles.forEach(({ selector, color }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.color = color;
            element.style.position = "relative";
            element.style.overflow = "hidden";
            const underline = document.createElement("div");
            underline.style.position = "absolute";
            underline.style.bottom = "0";
            underline.style.left = "-100%";
            underline.style.width = "100%";
            underline.style.height = "4px";
            underline.style.backgroundColor = color;
            underline.style.transition = "all 0.5s ease-out";
            element.appendChild(underline);
            setTimeout(() => {
                underline.style.left = "0";
            }, 300);
        }
    });

    // 3. Animaciones al desplazarse (fade-in y slide-up) excluyendo no-animation
    const elementsToAnimate = document.querySelectorAll(
        ".fade-in:not(.no-animation), .slide-up:not(.no-animation)"
    );

    const handleScrollAnimation = () => {
        const windowHeight = window.innerHeight;
        elementsToAnimate.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                element.classList.add("show");
            }
        });
    };

    // Llama la función al cargar la página y al hacer scroll
    handleScrollAnimation();
    window.addEventListener("scroll", handleScrollAnimation);

    // 4. Contador Navideño
    const eventDate = new Date("2024-12-13T15:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const remaining = eventDate - now;

        if (remaining > 0) {
            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            document.getElementById("days").textContent = days;
            document.getElementById("hours").textContent = hours;
            document.getElementById("minutes").textContent = minutes;
            document.getElementById("seconds").textContent = seconds;
        } else {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "<strong>¡Es hoy! 🎉</strong>";
        }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
});
