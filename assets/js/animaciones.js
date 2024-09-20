
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in, .rotate-in, .slide-up-scale, .bounce-in, .flip-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    });

    elements.forEach(el => observer.observe(el));
});
