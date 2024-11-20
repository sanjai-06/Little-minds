// Show active tab and hide inactive ones
function showTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });

    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    const activeLink = document.querySelector(`.navbar a[href="#${tabId}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// Toggle visibility of recommendation details
function toggleRecommendationDetails(recId) {
    const recommendationDetails = document.getElementById(recId);
    recommendationDetails.classList.toggle('active');
}

// Handle feedback form submission
function submitFeedback(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const feedback = document.getElementById('feedback').value;

    const feedbackMessage = document.getElementById('feedback-message');
    feedbackMessage.style.display = 'block';

    document.getElementById('feedback-form').reset();
}
