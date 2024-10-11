document.querySelectorAll('.tag-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.tag-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('timer-content').style.display = 'none';
        document.getElementById('hashtag-content').style.display = 'none';
        document.getElementById(`${this.dataset.target}-content`).style.display = 'block';
    });
});