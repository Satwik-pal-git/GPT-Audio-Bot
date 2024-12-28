var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

recognition.continuous = true

var startbtn = $('#start-btn')

var abortBtn = $(`#abortBtn`);

recognition.onstart = () => {
    $('#rings').addClass('pulse-ring');
}

// recognition.onspeechend = () => {
//     console.log('end....');
//     $('#rings').removeClass('pulse-ring');
// }

recognition.onerror = (event) => {
    console.error("Speech Recognition Error: ", event.error);
    const newInfor = `<div class="instr"><i class="fa-sharp fa-solid fa-circle-exclamation"></i>Error Occured, Speech recognition is not supported! Try again using Google Chrome or any other web browser & Allow the microphone permission</div>`;
    $('.bottom').append(newInfor);
    $('#rings').removeClass('pulse-ring');
}
const synth = window.speechSynthesis

recognition.onresult = (event) => {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    const formData = {
        'data': transcript
    }

    const baseURL = window.location.hostname === 'localhost'
        ? 'http://localhost:3000/'
        : 'https://gpt-audio-bot-wunf.vercel.app/';

    axios({
        method: 'post',
        url: `${baseURL}`,
        data: formData,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': key,
            withCredentials: true,
            mode: 'no-cors',
        }
    }).then((res) => {
        let textToUtter = res.data.textToUtter;
        textToUtter = textToUtter.replace(/\*/g, '');
        const utterThis = new SpeechSynthesisUtterance(textToUtter);
        var newChat = `<div class="msgbody">
                        <div class="text"><span class="direction">You: </span> <span class="response" id="input">${transcript}</span> </div>
                        <div class="text"><span class="direction">Bot:</span> <span class="response" id="output">${res.data.textGenerated}</span></div>
                    </div>`
        const msgs = document.getElementById('msg');
        document.getElementById('msg').innerHTML += (newChat);
        synth.speak(utterThis)
    }).catch(error => console.log(error));
}
var ringsDiv = $('#rings');

$('#start-btn').click(() => {
    var cls = ringsDiv.attr('class');
    if (cls === undefined || cls === '') {
        recognition.start();
        // console.log(' recognition started: ');
        ringsDiv.addClass('pulse-ring');
    } else {
        ringsDiv.removeClass();
        recognition.stop();
    }
    if ($('.bottom').has('.instr').length > 0) {
        $('.bottom .instr').remove();
    }
})

abortBtn.click(() => {
    if (synth.speaking) {
        // SpeechSyn is currently speaking, cancel the current utterance(s)
        synth.cancel();
        // console.log("Speech recognition aborted.");
    }
}); 