let alarmTime = null;
let alarmTimeoutId = null;
let isAlarmRinging = false;

// 時計
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    $("#clock").text(`${h}:${m}:${s}`);
}

setInterval(updateClock, 1000);
updateClock();

// アラームセット
$("#set-alarm").on("click", function () {
    const timeValue = $("#alarm-time").val();
    if (!timeValue) {
        $("#alarm-status").text("アラーム時刻を入力してください");
        return;
    }

    alarmTime = timeValue;
    $("#alarm-status").text(`アラームを ${alarmTime} にセットしました`);

    if (alarmTimeoutId) {
        clearTimeout(alarmTimeoutId);
    }

    const now = new Date();
    const [setH, setM] = alarmTime.split(":").map(Number);
    const alarmDate = new Date();

    alarmDate.setHours(setH);
    alarmDate.setMinutes(setM);
    alarmDate.setSeconds(0);
    alarmDate.setMilliseconds(0);

    if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const diff = alarmDate.getTime() - now.getTime();

    alarmTimeoutId = setTimeout(() => {
        $("#alarm-sound")[0].play();
        $("#alarm-status").text("アラームが鳴っています！ じゃんけんで止めて！");
        isAlarmRinging = true;
    }, diff);

});

// アラーム解除
$("#clear-alarm").on("click", function () {
    alarmTime = null;
    if (alarmTimeoutId) {
        clearTimeout(alarmTimeoutId);
        alarmTimeoutId = null;
    }
    $("#alarm-sound")[0].pause();
    $("#alarm-sound")[0].currentTime = 0;
    $("#alarm-status").text("アラームは未設定です");
    isAlarmRinging = false;
});



$("#gu").on("click", function () {
    if (!isAlarmRinging) {
        // アラームが鳴っていないときは何もしない or メッセージ表示
        $("#judgment").text("鳴っていません");
        return;
    }

    const r = Math.ceil(Math.random() * 3);
    let img = "";
    let result = "";

    if (r === 1) {
        img = "img/janken_gu.png";
        result = "Draw";
    } else if (r === 2) {
        img = "img/janken_cho.png";
        result = "Win";
    } else if (r === 3) {
        img = "img/janken_pa.png";
        result = "Lose";
    }

    $("#pc_image").attr("src", img);
    $("#judgment").html(result);

    if (result === "Win") {
        // アラーム停止
        $("#alarm-sound")[0].pause();
        $("#alarm-sound")[0].currentTime = 0;
        $("#alarm-status").text("勝ちました！アラーム停止です。");
        isAlarmRinging = false;

        // 紙吹雪
        startConfetti();
    }
});

$("#cho").on("click", function () {
    if (!isAlarmRinging) {
        // アラームが鳴っていないときは何もしない or メッセージ表示
        $("#judgment").text("鳴っていません");
        return;
    }

    const r = Math.ceil(Math.random() * 3);
    let img = "";
    let result = "";

    if (r === 1) {
        img = "img/janken_gu.png";
        result = "Lose";
    } else if (r === 2) {
        img = "img/janken_cho.png";
        result = "Draw";
    } else if (r === 3) {
        img = "img/janken_pa.png";
        result = "Win";
    }

    $("#pc_image").attr("src", img);
    $("#judgment").html(result);

    if (result === "Win") {
        // アラーム停止
        $("#alarm-sound")[0].pause();
        $("#alarm-sound")[0].currentTime = 0;
        $("#alarm-status").text("勝ちました！アラーム停止です。");
        isAlarmRinging = false;

        // 紙吹雪
        startConfetti();
    }
});

$("#par").on("click", function () {
    if (!isAlarmRinging) {
        // アラームが鳴っていないときは何もしない or メッセージ表示
        $("#judgment").text("鳴っていません");
        return;
    }

    const r = Math.ceil(Math.random() * 3);
    let img = "";
    let result = "";

    if (r === 1) {
        img = "img/janken_gu.png";
        result = "Win";
    } else if (r === 2) {
        img = "img/janken_cho.png";
        result = "Lose";
    } else if (r === 3) {
        img = "img/janken_pa.png";
        result = "Draw";
    }

    $("#pc_image").attr("src", img);
    $("#judgment").html(result);

    if (result === "Win") {
        // アラーム停止
        $("#alarm-sound")[0].pause();
        $("#alarm-sound")[0].currentTime = 0;
        $("#alarm-status").text("勝ちました！アラーム停止です。");
        isAlarmRinging = false;

        // 紙吹雪
        startConfetti();
    }
});

function startConfetti() {
    const container = document.getElementById("confetti-container");

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "%";

        const colors = ["#ff4d4d", "#4da6ff", "#4dff4d", "#ffff4d", "#ff99ff"];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        const size = Math.random() * 8 + 5;
        confetti.style.width = size + "px";
        confetti.style.height = size + "px";

        confetti.style.animationDuration = (2 + Math.random() * 1.5) + "s";
        confetti.style.animationDelay = (Math.random() * 0.5) + "s";

        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 2500);

    }
}

