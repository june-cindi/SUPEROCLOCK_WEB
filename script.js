document.querySelectorAll('.tag-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.tag-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('timer-content').style.display = 'none';
        document.getElementById('hashtag-content').style.display = 'none';
        document.getElementById(`${this.dataset.target}-content`).style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide-item');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;
    let startX;
    let scrollLeft;
    let isDown = false;
  
    const slideWidth = slides[0].offsetWidth + 20; // 20px for margin
  
    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  
    function moveSlider(direction) {
      if (direction === 'left' && currentIndex > 0) {
        currentIndex--;
      } else if (direction === 'right' && currentIndex < slides.length - 5) {
        currentIndex++;
      }
      updateSlider();
    }
  
    leftArrow.addEventListener('click', () => moveSlider('left'));
    rightArrow.addEventListener('click', () => moveSlider('right'));
  
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
  
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
  
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
  
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scrolling speed
      const newIndex = Math.round((scrollLeft - walk) / slideWidth);
      currentIndex = Math.max(0, Math.min(newIndex, slides.length - 5));
      updateSlider();
    });
  
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        currentIndex = Math.min(Math.max(index - 2, 0), slides.length - 5);
        updateSlider();
      });
    });
  });