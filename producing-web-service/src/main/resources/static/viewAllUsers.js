
function viewAllUsers() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("get_user_info").innerHTML = "";
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
                let allUsers = "<table>\n" +
                    "  <tr>\n" +
                    "    <th>Username</th>\n" +
                    "    <th>Name and Surname</th>\n" +
                    "    <th>Availability</th>\n" +
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
                    if(localStorage.getItem("role")==="admin"){
                        allUsers += "<td><button onclick='delete_user("+id+")'>delete</button></td>"+
                                    "<td><button onclick='get_user_info("+id+")'>get info</button></td>";
                    }
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

function get_user_info(id) {
    document.getElementById("content").innerHTML = "";
    var xmlhttp = new XMLHttpRequest();
    try {
        xmlhttp.open("POST", "http://localhost:8080/ws", true);
    }catch (error){
        alert(error);
    }
    let str ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service"> '+
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
        '<gs:getUserInfoRequest> '+
        '<gs:id>'+id+'</gs:id> '+
        '</gs:getUserInfoRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope> ';
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                xmlDoc = xmlhttp.responseXML;
                console.log("here", xmlDoc);
                let user_info = "<table>\n" +
                    "  <tr>\n" +
                    "    <th>Username</th>\n" +
                    "    <th>name and surname</th>\n" +
                    "    <th>role</th>\n" +
                    "    <th>gender</th>\n" +
                    "  </tr>\n";
                let usernameObject = xmlDoc.getElementsByTagName('ns2:username')[0];
                let username = usernameObject.childNodes[0].nodeValue;
                let nameAndSurnameObject = xmlDoc.getElementsByTagName('ns2:NameandSurname')[0];
                let nameAndSurname = nameAndSurnameObject.childNodes[0].nodeValue;
                let roleObject = xmlDoc.getElementsByTagName('ns2:role')[0];
                let role = roleObject.childNodes[0].nodeValue;
                let genderObject = xmlDoc.getElementsByTagName('ns2:gender')[0];
                let gender = genderObject.childNodes[0].nodeValue;
                user_info += "  <tr>\n" +
                    "    <td>"+username+"</td>\n" +
                    "    <td>"+nameAndSurname+"</td>\n" +
                    "    <td>"+role+"</td>\n" +
                    "    <td>"+gender+"</td>\n" +
                    "  </tr>\n";

                user_info += "</table>";
                user_info += "<button onclick='viewAllUsers()'>go back</button>";
                console.log(user_info);
                document.getElementById("get_user_info").innerHTML += user_info;
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
    chosenId = id;
}


/////DELETE USER

function delete_user(id) {
    let bdate = document.getElementById("year") + "-" + document.getElementById("month") + "-" +document.getElementById("day");
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
        '<wsse:Username>'+localStorage.getItem("username")+'</wsse:Username> '+
        '<wsse:Password>'+localStorage.getItem("password")+'</wsse:Password> '+
        '</wsse:UsernameToken> '+
        '</wsse:Security> '+
        '</soapenv:Header> '+
        '<soapenv:Body> '+
        '<gs:deleteUserRequest> '+
        '<gs:id>'+id+'</gs:id> '+
        '</gs:deleteUserRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope>';
    console.log(str);
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                xmlDoc = xmlhttp.responseXML;
                let statusObject = xmlDoc.getElementsByTagName("ns2:status")[0];
                let status = statusObject.childNodes[0].nodeValue;
                alert(status);
                viewAllUsers();
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

viewAllUsers()