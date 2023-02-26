
function viewAllUsers() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("send_message_form").innerHTML = "";
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    var xmlhttp = new XMLHttpRequest();
    var chosenId = -1;
    try {
        xmlhttp.open("POST", "http://localhost:8080/ws", true);
    }catch (error){
        alert(error);
    }
    let str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service"> ' +
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
        '<gs:allUsersRequest> '+
        '</gs:allUsersRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope> ';
    console.log(str);
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                xmlDoc = xmlhttp.responseXML;
                console.log("here", xmlDoc);
                let allUsers =
                    "<p>To send a message, click on the user</p>\n"+
                    "<table>\n" +
                    "  <tr>\n" +
                    "    <th>Username</th>\n" +
                    "    <th>Name and Surname</th>\n" +
                    "    <th>Availability</th>\n" ;
                    allUsers +=
                    "  </tr>\n";
                for (let i = 0; i < xmlDoc.getElementsByTagName('ns2:username').length; i++) {
                    let nameObject = xmlDoc.getElementsByTagName('ns2:username')[i];
                    let name = nameObject.childNodes[0].nodeValue;
                    let nameAndSurnameObject = xmlDoc.getElementsByTagName('ns2:NameandSurname')[i];
                    let nameAndSurname = nameAndSurnameObject.childNodes[0].nodeValue;
                    let availableObject = xmlDoc.getElementsByTagName('ns2:available')[i];
                    let available = availableObject.childNodes[0].nodeValue;
                    let idObject = xmlDoc.getElementsByTagName('ns2:uid')[i];
                    let id = idObject.childNodes[0].nodeValue;
                    allUsers += "  <tr onclick='assign_id("+id+")'>\n" +
                        "    <td>"+name+"</td>\n" +
                        "    <td>"+nameAndSurname+"</td>\n" +
                        "    <td>"+available+"</td>\n";
                    allUsers+="  </tr>\n";
                }
                allUsers += "</table>";
                document.getElementById("content").innerHTML = allUsers;
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


function addHtmlForSendMessage() {
    viewAllUsers();
}
function send_message() {
    var xmlhttp = new XMLHttpRequest();
    var title = document.getElementById("title").value;
    var message = document.getElementById("message").value;
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
        '<wsse:Username>'+localStorage.getItem("username")+'</wsse:Username> '+
        '<wsse:Password>'+localStorage.getItem("password")+'</wsse:Password> '+
        '</wsse:UsernameToken> '+
        '</wsse:Security> '+
        '</soapenv:Header> '+
        '<soapenv:Body> '+
        '<gs:sendMessageRequest> '+
        '<gs:message> '+
        '<gs:m_id>0</gs:m_id> '+
        '<gs:fromU>'+localStorage.getItem("uid")+'</gs:fromU> '+
        '<gs:toU>'+chosenId+'</gs:toU> '+
        '<gs:title>'+title+'</gs:title> '+
        '<gs:content>'+message+'</gs:content> '+
        '</gs:message> '+
        '</gs:sendMessageRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope>';
    console.log("str",str);
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                xmlDoc = xmlhttp.responseXML;
                let statusObject = xmlDoc.getElementsByTagName('ns2:status')[0];
                let status = statusObject.childNodes[0].nodeValue;
                alert(status)
                addHtmlForSendMessage();
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


function assign_id(id) {
    document.getElementById("content").innerHTML = "";
    document.getElementById("send_message_form").innerHTML+= "<p>To : "+id+"</p>";
    document.getElementById("send_message_form").innerHTML +=
        "<br>\n" +
        "    <label for=\"title\">Title:</label><br>\n" +
        "    <input type=\"text\" id=\"title\" name=\"title\"><br>\n" +
        "    <label for=\"message\">Message:</label><br>\n" +
        "    <textarea type=\"text\" id=\"message\" name=\"message\"></textarea><br><br>\n" +
        "<div class=\"container\" style=\"background-color:#f1f1f1\">\n" +
        "    <button type=\"submit\" value=\"SEND MESSAGE\" onclick=\"send_message()\">Send Message</button>\n" +
        "<button  type=\"submit\" value=\"CANCEL\" onclick='addHtmlForSendMessage()'>Cancel</button>"+
        "</div>";

    chosenId = id;
}

addHtmlForSendMessage()