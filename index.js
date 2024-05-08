document.addEventListener("DOMContentLoaded", function() {
    function updateHeartRate() {
        document.getElementById('staticBPM').textContent = `${Math.floor(Math.random() * 15 + 60)} BPM`; // 随机心率值, 基础值 60-75
        document.getElementById('activeBPM').textContent = `${Math.floor(Math.random() * 20 + 100)} BPM`; // 随机心率值, 运动时 100-120
        document.getElementById('AfterExerciseBPM').textContent = `${Math.floor(Math.random() * 10 + 80)} BPM`; // 随机心率值, 运动后 80-90
        document.getElementById('StressBPM').textContent = `${Math.floor(Math.random() * 10 + 80)} BPM`;
    }

    setInterval(updateHeartRate, 1000); // 每秒更新一次
});