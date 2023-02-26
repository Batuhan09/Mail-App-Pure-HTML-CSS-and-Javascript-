function logout() {
    var xmlhttp = new XMLHttpRequest();
    try {
        xmlhttp.open("POST", "http://localhost:8080/ws", true);
    }catch (error){
        alert(error);
    }
    let str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service"> '+
        '<soapenv:Header> '+
        '<wsse:Security '+
        'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" '+
        'mustUnderstand="1"> '+
        '<wsse:UsernameToken> '+
        '<wsse:Username>admin123</wsse:Username> '+
        '<wsse:Password>admin123</wsse:Password> '+
        '</wsse:UsernameToken> '+
        '</wsse:Security> '+
        '</soapenv:Header> '+
        '<soapenv:Body> '+
        '<gs:logoutRequest> '+
        '<gs:id>'+localStorage.getItem("uid")+'</gs:id> '+
        '</gs:logoutRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope>';
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                localStorage.clear();
                console.log(localStorage);
                xmlDoc = xmlhttp.responseXML;
                let statusObject = xmlDoc.getElementsByTagName("ns2:status")[0];
                let status = statusObject.childNodes[0].nodeValue;
                alert(status);
                alert("logging out");
                window.location.assign('http://localhost:8080/index.html')

            }catch (error){
                console.log(error);
            }
        }
    }
    try {
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    }catch (error){
        alert(error);
    }
    try{
        xmlhttp.send(str);
    }catch(error){
        alert(error)
    }
}