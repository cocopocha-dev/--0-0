document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    let timerInterval;
    let minutes = 0;
    let seconds = 0;

    function updateTimer() {
        if (seconds === 59) {
            seconds = -1;
            if (minutes < 99) {
                minutes++;
            }
        }
        seconds++;
        
        const minStr = minutes.toString().padStart(2, '0');
        const secStr = seconds.toString().padStart(2, '0');
        timerDisplay.textContent = `${minStr}:${secStr}`;
    }

    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
        }
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetTimer() {
        minutes = 0;
        seconds = 0;
        timerDisplay.textContent = '00:00';
        if (timerInterval) {
            stopTimer();
        }
    }

    document.addEventListener('click', event => {
        const clickedElement = event.target;

        // Start Button (if the element has a class of "start-btn")
        if (clickedElement.classList.contains('start-btn')) {
            startTimer();
        }

        // Stop Button (if the element has a class of "stop-btn")
        else if (clickedElement.classList.contains('stop-btn')) {
            stopTimer();
        }
    });

    document.getElementById('time-chooser').addEventListener('submit', event => {
        event.preventDefault();
        const minutesInput = parseInt(event.target.minutes.value);
        
        if (!Number.isInteger(minutesInput) || minutesInput < 0) {
            alert('Please type in a positive integer.');
            return;
        }

        stopTimer();
        resetTimer();

        while (minutes < minutesInput) {
            updateTimer();
        }
    });
});
