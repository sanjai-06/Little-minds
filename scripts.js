// Common smooth scrolling for all pages
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// If it's the Q/A page, handle question form submission
if (document.getElementById('questionForm')) {
    document.getElementById('questionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const questionInput = document.getElementById('questionInput').value;
        
        if (questionInput.trim()) {
            const questionsList = document.getElementById('questions');
            const newQuestion = document.createElement('li');
            newQuestion.textContent = questionInput;
            questionsList.appendChild(newQuestion);
            document.getElementById('questionInput').value = '';
        }
    });
}
