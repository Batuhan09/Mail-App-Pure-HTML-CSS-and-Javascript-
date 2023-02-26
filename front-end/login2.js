function validate() {
    window.open("file:///home/batuhan/Desktop/srdc-hw2/front-end/signup.html")
    var username = document.getElementById("username").nodeValue;
    var password = document.getElementById("password").nodeValue;
    console.log(username, password);
    var str = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:gs=\"http://spring.io/guides/gs-producing-web-service\">" +
   "<soapenv:Header>" +
   		"<wsse:Security" +
			"xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"" +
			"mustUnderstand=\"1\">" +
			"<wsse:UsernameToken>" +
				"<wsse:Username>a</wsse:Username>"+
				"<wsse:Password>a</wsse:Password>" +
			"</wsse:UsernameToken>"+
		"</wsse:Security>"+
	"</soapenv:Header>"+
    "<soapenv:Body>"+
      "<gs:getUserRequest>"+
         "<gs:user>"+
            "<gs:uid>?</gs:uid>" +
            "<gs:username>?</gs:username>"+
            "<gs:NameandSurname>?</gs:NameandSurname>"+
            "<gs:password>?</gs:password>"+
            "<gs:role>?</gs:role>"+
            "<gs:birthdate>?</gs:birthdate>"+
            "<gs:gender>?</gs:gender>"+
            "<gs:available>?</gs:available>"+
         "</gs:user>"+
      "</gs:getUserRequest>"+
   "</soapenv:Body>"+
"</soapenv:Envelope>";            
    // var xhr = createCORSRequest("POST", "http://localhost:8080/ws");
    // if(!xhr){
    // console.log("XHR issue");
    // return;
    // }                 
    // xhr.onload = function (){
    //  var results = xhr.responseText;
    //  console.log(results);
    // }
    //xhr.setHeader("Access-Control-Allow-Origin:", "http://localhost:8080/ws");
    //xhr.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT");
    //xhr.setRequestHeader('Content-Type', 'text/xml');
    //xhr.send(str);
               
}
// function createCORSRequest(method, url) {
//     var xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {
//         xhr.open(method, url, false);
//     } else if (typeof XDomainRequest != "undefined") {
//         alert
//         xhr = new XDomainRequest();
//         xhr.open(method, url);
//     } else {
//         console.log("CORS not supported");
//         alert("CORS not supported");
//         xhr = null;
//     }
//     return xhr;
// }
