if(localStorage.length != 0){
    alert("already logged in")
    window.location.assign("http://localhost:8080/dashboard.html")
}
async function validate(){
    var xmlhttp = new XMLHttpRequest();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    window.localStorage.setItem("username",username);
    window.localStorage.setItem("password",password);
    try {
        xmlhttp.open("POST", "http://localhost:8080/ws", true);
    }catch (error){
        alert(error);
    }
    var str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service"> ' +
        '<soapenv:Header> '+
            '<wsse:Security '+
                'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" '+
                'mustUnderstand="1"> '+
                '<wsse:UsernameToken> '+
                    '<wsse:Username>'+username+'</wsse:Username> '+
                    '<wsse:Password>'+password+'</wsse:Password> '+
                '</wsse:UsernameToken> '+
            '</wsse:Security> '+
        '</soapenv:Header> '+
        '<soapenv:Body> '+
            '<gs:getUserRequest> '+
                '<gs:user> '+
                    '<gs:uid>0</gs:uid> '+
                    '<gs:username>'+username+'</gs:username> '+
                    '<gs:NameandSurname>a a</gs:NameandSurname> '+
                    '<gs:password>'+password+'</gs:password> '+
                    '<gs:role>admin</gs:role> '+
                    '<gs:gender>M</gs:gender> '+
                    '<gs:available>offline</gs:available> '+
                '</gs:user> '+
            '</gs:getUserRequest> '+
        '</soapenv:Body> '+
    '</soapenv:Envelope> ';
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                xmlDoc = xmlhttp.responseXML;
                var roleObject = xmlDoc.getElementsByTagName('ns2:role')[0];
                var role = roleObject.childNodes[0].nodeValue;
                window.localStorage.setItem("role", role);
                var nameAndSurnameObject = xmlDoc.getElementsByTagName('ns2:NameandSurname')[0];
                var nameAndSurname = nameAndSurnameObject.childNodes[0].nodeValue;
                window.localStorage.setItem("nameAndSurname", nameAndSurname);
                var genderObject = xmlDoc.getElementsByTagName('ns2:gender')[0];
                var gender = genderObject.childNodes[0].nodeValue;
                window.localStorage.setItem("gender", gender);
                var uidObject = xmlDoc.getElementsByTagName('ns2:uid')[0];
                var uid = uidObject.childNodes[0].nodeValue;
                window.localStorage.setItem("uid", uid);
                window.location.assign('http://localhost:8080/dashboard.html')
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
