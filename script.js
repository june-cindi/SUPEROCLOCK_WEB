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

  //FAQ페이지


  const faqData = [
    { category: "usage", question: "Q. 타이머 색상을 바꾸고 싶어요.", answer: "타이머 색상 변경에 대한 답변..." },
    { category: "usage", question: "Q. 스마트폰에서 다른 앱을 사용할 때도 타이머가 작동했으면 좋겠어요.", answer: "백그라운드 실행에 대한 답변..." },
    { category: "payment", question: "Q. 결제 방법은 어떤 것들이 있나요?", answer: "다양한 결제 방법에 대한 설명..." },
    { category: "account", question: "Q. 계정 삭제는 어떻게 하나요?", answer: "계정 삭제 절차에 대한 설명..." },
    { category: "usage", question: "Q. 알림음을 변경할 수 있나요?", answer: "알림음 변경 방법에 대한 설명..." },
    { category: "usage", question: "Q. 여러 개의 타이머를 동시에 설정할 수 있나요?", answer: "다중 타이머 설정 방법 설명..." },
    { category: "payment", question: "Q. 구독을 취소하고 환불받을 수 있나요?", answer: "구독 취소 및 환불 정책 설명..." },
    { category: "account", question: "Q. 비밀번호를 잊어버렸어요. 어떻게 해야 하나요?", answer: "비밀번호 재설정 절차 안내..." },
    { category: "usage", question: "Q. 앱 사용 통계를 볼 수 있나요?", answer: "사용 통계 확인 방법 안내..." },
    { category: "payment", question: "Q. 프리미엄 기능은 어떤 것들이 있나요?", answer: "프리미엄 기능 목록 및 설명..." }
];

let currentCategory = "usage";
let currentPage = 1;
const itemsPerPage = 6;

function renderFAQItems(category, page) {
    const faqList = document.querySelector('.faq-list');
    faqList.innerHTML = '';
    
    const filteredItems = faqData.filter(item => item.category === category);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredItems.slice(startIndex, endIndex);

    pageItems.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question">
                <span>${item.question}</span>
                <span>▼</span>
            </div>
            <div class="faq-answer">${item.answer}</div>
        `;
        faqList.appendChild(faqItem);
    });

    setupFAQListeners();
    updatePagination(filteredItems.length);
}

function updatePagination(totalItems) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderFAQItems(currentCategory, currentPage);
        });
        pagination.appendChild(pageBtn);
    }
}

function setupFAQListeners() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('span:last-child');
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.textContent = '▼';
            } else {
                answer.style.display = 'block';
                icon.textContent = '▲';
            }
        });
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        currentPage = 1;
        renderFAQItems(currentCategory, currentPage);
    });
});

// 초기 렌더링
renderFAQItems(currentCategory, currentPage);