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

recognition.onerror = () => {
    const newInfor = `<div class="instr"><i class="fa-sharp fa-solid fa-circle-exclamation"></i>Error Occured, Speech recognition is not supported in this browser! Try again using Chrome web browser </div>`;
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
    axios({
        method: 'post',
        url: 'https://gpt-audio-bot-wunf.vercel.app/',
        data: formData,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': key,
            withCredentials: true,
            mode: 'no-cors',
        }
    }).then((res) => {
        // console.log("done sending ", res);
        // console.log("the GPT ans= ", res.data);
        // const utteracnce= new SpeechSynthesisUtterance();
        const utterThis = new SpeechSynthesisUtterance(res.data);
        var newChat = `<div class="msgbody">
                        <div class="text"><span class="direction">You: </span> <span class="response" id="input">${transcript}</span> </div>
                        <div class="text"><span class="direction">Bot:</span> <span class="response" id="output">${res.data}</span></div>
                    </div>`
        const msgs = document.getElementById('msg');
        document.getElementById('msg').innerHTML += (newChat);
        synth.speak(utterThis)
    }).catch(error => console.log(error));
}
var ringsDiv = $('#rings');

$('#start-btn').click(() => {
    var cls = ringsDiv.attr('class');
    // console.log(cls);
    if (cls === undefined || cls === '') {
        recognition.start();
        console.log(' recognition started: ');
        ringsDiv.addClass('pulse-ring');
        // console.log('added');
    } else {
        ringsDiv.removeClass();
        recognition.stop();
        // console.log('removed');
    }
    if ($('.bottom').has('.instr').length > 0) {
        $('.bottom .instr').remove();
    }
})

abortBtn.click(() => {
    if (synth.speaking) {
        // SpeechSyn is currently speaking, cancel the current utterance(s)
        synth.cancel();
        console.log("Speech recognition aborted.");

    }
}); 