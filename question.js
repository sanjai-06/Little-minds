let currentStep = 0; // Start at the first question
const responses = { depression: [], anxiety: [], stress: [], emotion: [], sleep: [] };

showStep(currentStep); // Display the first step

// Function to display the current question step
function showStep(n) {
    const steps = document.getElementsByClassName('question-step');
    // Hide all question steps
    for (let i = 0; i < steps.length; i++) {
        steps[i].style.display = 'none';
    }
    // Show the current step
    steps[n].style.display = 'block';

    // Show/Hide the previous button
    if (n === 0) {
        document.getElementById('prevBtn').style.display = 'none';
    } else {
        document.getElementById('prevBtn').style.display = 'inline';
    }

    // Change the text of the next button on the last step
    if (n === steps.length - 1) {
        document.getElementById('nextBtn').innerHTML = 'Submit';
    } else {
        document.getElementById('nextBtn').innerHTML = 'Next';
    }

    // Update the progress bar
    updateProgressBar(n);
}

// Function to handle "Next" and "Previous" button clicks
function nextPrev(n) {
    const steps = document.getElementsByClassName('question-step');

    // Save the response of the current step
    saveResponse(currentStep);

    // Hide the current step
    steps[currentStep].style.display = 'none';

    // Increment or decrement the step based on the button clicked
    currentStep += n;

    // If the user has reached the end of the form
    if (currentStep >= steps.length) {
        calculateResults(); // Call function to show results chart
        return false;
    }

    // Show the next step
    showStep(currentStep);
}

// Function to update the progress bar
function updateProgressBar(n) {
    const progress = document.getElementById('progress');
    const totalSteps = document.getElementsByClassName('question-step').length;
    const progressPercentage = ((n + 1) / totalSteps) * 100;
    progress.style.width = progressPercentage + '%';
}

// Function to save the current response
function saveResponse(step) {
    const stepCategory = getCategory(step);
    const stepQuestionIndex = step % 10; // Every 10 steps corresponds to a category

    const radios = document.querySelectorAll(`input[name="${stepCategory}${stepQuestionIndex + 1}"]`);
    for (const radio of radios) {
        if (radio.checked) {
            responses[stepCategory].push(parseInt(radio.value));
            break;
        }
    }
}

// Function to map step number to category (Depression, Anxiety, etc.)
function getCategory(step) {
    if (step < 10) return 'depression';
    if (step < 20) return 'anxiety';
    if (step < 30) return 'stress';
    if (step < 40) return 'emotion';
    return 'sleep';
}

// Function to calculate results and display chart
function calculateResults() {
    // Prepare data for chart
    const ctx = document.getElementById('resultsChart').getContext('2d');
    document.getElementById('resultsChart').style.display = 'block'; // Show the chart

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
            datasets: [
                {
                    label: 'Depression',
                    data: responses.depression,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                    tension: 0.4,
                },
                {
                    label: 'Anxiety',
                    data: responses.anxiety,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false,
                    tension: 0.4,
                },
                {
                    label: 'Stress',
                    data: responses.stress,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    fill: false,
                    tension: 0.4,
                },
                {
                    label: 'Emotion',
                    data: responses.emotion,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                    tension: 0.4,
                },
                {
                    label: 'Sleep',
                    data: responses.sleep,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: false,
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Questions',
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Score',
                    },
                },
            },
        },
    });
}

// Helper function to get selected radio button value
function getSelectedValue(name) {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return parseInt(radios[i].value);
        }
    }
    return 0; // Default to 0 if no option is selected
}
