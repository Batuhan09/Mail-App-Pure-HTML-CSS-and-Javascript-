
function getOutbox() {
    document.getElementById("get_message_form").innerHTML = "";
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    var xmlhttp = new XMLHttpRequest();
    var chosenId = -1;
    try {
        xmlhttp.open("POST", "http://localhost:8080/ws", true);
    }catch (error){
        alert(error);
    }
    let str =  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service"> '+
        '<soapenv:Header> '+
        '<wsse:Security '+
        'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" '+
        'mustUnderstand="1"> '+
        '<wsse:UsernameToken> '+
        '<wsse:Username>'+localStorage.getItem("username")+'</wsse:Username> '+
        '<wsse:Password>'+localStorage.getItem("password")+'</wsse:Password> '+
        '</wsse:UsernameToken> '+
        '</wsse:Security> '+
        '</soapenv:Header> '+
        '<soapenv:Body> '+
        '<gs:getOutboxMessagesRequest> '+
        '<gs:id>'+localStorage.getItem("uid")+'</gs:id> '+
        '</gs:getOutboxMessagesRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope>';
    console.log(str);
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                xmlDoc = xmlhttp.responseXML;
                let messages = "<table>\n" +
                    "  <tr>\n" +
                    "    <th>From</th>\n" +
                    "    <th>To</th>\n" +
                    "    <th>title</th>\n" +
                    "    <th>content</th>\n" +
                    "  </tr>\n";
                for (let i = 0; i < xmlDoc.getElementsByTagName('ns2:fromU').length; i++) {
                    let fromObject = xmlDoc.getElementsByTagName('ns2:fromU')[i];
                    let from = fromObject.childNodes[0].nodeValue;
                    let toObject = xmlDoc.getElementsByTagName('ns2:toU')[i];
                    let to = toObject.childNodes[0].nodeValue;
                    let titleObject = xmlDoc.getElementsByTagName('ns2:title')[i];
                    let title = titleObject.childNodes[0].nodeValue;
                    let messageObject = xmlDoc.getElementsByTagName('ns2:content')[i];
                    let message = messageObject.childNodes[0].nodeValue;
                    messages += "  <tr>\n" +
                        "    <td>"+from+"</td>\n" +
                        "    <td>"+to+"</td>\n" +
                        "    <td>"+title+"</td>\n" +
                        "    <td>"+message+"</td>\n" +
                        "  </tr>\n";
                }
                messages += "</table>";
                document.getElementById("get_message_form").innerHTML += messages;
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

getOutbox();