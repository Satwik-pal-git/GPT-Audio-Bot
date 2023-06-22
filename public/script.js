var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

recognition.continuous = true

var textBox = $('#textBox')
var startbtn = $('#start-btn')
var instruction = $(`#instruction`);
var content = '';

recognition.onstart = () => {
    startbtn.text("Stop");
    startbtn.click(() => {
        recognition.onspeechend();
    })
    instruction.text("Voice recognition has started");
}
recognition.onspeechend = () => {
    startbtn.text("Start");
    instruction.text("No Actvity");
}
recognition.onerror = () => {
    startbtn.text("Start over");
    instruction.text("Try Again");
}
recognition.onresult = (event) => {
    console.log("event", event);
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    content += transcript;
    textBox.val(content);
}

$('#start-btn').click(() => {
    if (content.length) {
        content += '';
    }
    recognition.start();
})