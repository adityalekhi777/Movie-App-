


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();


function reco_callback(e){
    // const msg = e.results[0][0].transcript;
    console.log(e);
}

// Start regog
recognition.start();

//at recognition end callback fires

recognition.addEventListener('result',reco_callback);