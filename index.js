document.addEventListener("DOMContentLoaded", function() {
    function updateHeartRate() {
        document.getElementById('staticBPM').textContent = `${Math.floor(Math.random() * 15 + 60)} BPM`; 
        document.getElementById('activeBPM').textContent = `${Math.floor(Math.random() * 20 + 100)} BPM`; 
        document.getElementById('AfterExerciseBPM').textContent = `${Math.floor(Math.random() * 10 + 80)} BPM`; 
        document.getElementById('StressBPM').textContent = `${Math.floor(Math.random() * 10 + 80)} BPM`;
    }

    setInterval(updateHeartRate, 1000); 
});