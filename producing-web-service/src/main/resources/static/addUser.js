
function addHTMLForAddUser() {
    document.getElementById("add_user").innerHTML = "";
    document.getElementById("add_user").innerHTML = "<div class='container'>\n"+
        "<label for=\"username\">Username:</label><br>\n" +
        "<input type=\"text\" id=\"username\" name=\"username\" required><br>\n" +
        "<label for=\"nAnds\">name and surname:</label><br>\n" +
        "<input type=\"text\" id=\"nAnds\" name=\"nameAndSurname\" required><br>\n" +
        '<label htmlFor="gender">gender(type M for male F for female):</label>\n' +
        '<select style="width:100%;height: 30px" name="gender" id="gender">\n'+
            '<option value="M">M</option>\n'+
            '<option value="F">F</option>\n'+
        '</select><br>\n'+
        "    <label for=\"year\">year/</label><label for=\"year\">month/</label><label for=\"day\"> day:</label><br>\n" +
        "    <select style=\"width: 33%;height: 30px\" name=\"year\" id=\"year\">          <option value=\"2020\">2020</option>\n" +
        "        <option value=\"2019\">2019</option>\n" +
        "        <option value=\"2018\">2018</option>\n" +
        "        <option value=\"2017\">2017</option>\n" +
        "        <option value=\"2016\">2016</option>\n" +
        "        <option value=\"2015\">2015</option>\n" +
        "        <option value=\"2014\">2014</option>\n" +
        "        <option value=\"2013\">2013</option>\n" +
        "        <option value=\"2012\">2012</option>\n" +
        "        <option value=\"2011\">2011</option>\n" +
        "        <option value=\"2010\">2010</option>\n" +
        "        <option value=\"2009\">2009</option>\n" +
        "        <option value=\"2008\">2008</option>\n" +
        "        <option value=\"2007\">2007</option>\n" +
        "        <option value=\"2006\">2006</option>\n" +
        "        <option value=\"2005\">2005</option>\n" +
        "        <option value=\"2004\">2004</option>\n" +
        "        <option value=\"2003\">2003</option>\n" +
        "        <option value=\"2002\">2002</option>\n" +
        "        <option value=\"2001\">2001</option>\n" +
        "        <option value=\"2000\">2000</option>\n" +
        "        <option value=\"1999\">1999</option>\n" +
        "        <option value=\"1998\">1998</option>\n" +
        "        <option value=\"1997\">1997</option>\n" +
        "        <option value=\"1996\">1996</option>\n" +
        "        <option value=\"1995\">1995</option>\n" +
        "        <option value=\"1994\">1994</option>\n" +
        "        <option value=\"1993\">1993</option>\n" +
        "        <option value=\"1992\">1992</option>\n" +
        "        <option value=\"1991\">1991</option>\n" +
        "        <option value=\"1990\">1990</option>\n" +
        "        <option value=\"1989\">1989</option>\n" +
        "        <option value=\"1988\">1988</option>\n" +
        "        <option value=\"1987\">1987</option>\n" +
        "        <option value=\"1986\">1986</option>\n" +
        "        <option value=\"1985\">1985</option>\n" +
        "        <option value=\"1984\">1984</option>\n" +
        "        <option value=\"1983\">1983</option>\n" +
        "        <option value=\"1982\">1982</option>\n" +
        "        <option value=\"1981\">1981</option>\n" +
        "        <option value=\"1980\">1980</option>\n" +
        "        <option value=\"1979\">1979</option>\n" +
        "        <option value=\"1978\">1978</option>\n" +
        "        <option value=\"1977\">1977</option>\n" +
        "        <option value=\"1976\">1976</option>\n" +
        "        <option value=\"1975\">1975</option>\n" +
        "        <option value=\"1974\">1974</option>\n" +
        "        <option value=\"1973\">1973</option>\n" +
        "        <option value=\"1972\">1972</option>\n" +
        "        <option value=\"1971\">1971</option>\n" +
        "        <option value=\"1970\">1970</option>\n" +
        "        <option value=\"1969\">1969</option>\n" +
        "        <option value=\"1968\">1968</option>\n" +
        "        <option value=\"1967\">1967</option>\n" +
        "        <option value=\"1966\">1966</option>\n" +
        "        <option value=\"1965\">1965</option>\n" +
        "        <option value=\"1964\">1964</option>\n" +
        "        <option value=\"1963\">1963</option>\n" +
        "        <option value=\"1962\">1962</option>\n" +
        "        <option value=\"1961\">1961</option>\n" +
        "        <option value=\"1960\">1960</option>\n" +
        "        <option value=\"1959\">1959</option>\n" +
        "        <option value=\"1958\">1958</option>\n" +
        "        <option value=\"1957\">1957</option>\n" +
        "        <option value=\"1956\">1956</option>\n" +
        "        <option value=\"1955\">1955</option>\n" +
        "        <option value=\"1954\">1954</option>\n" +
        "        <option value=\"1953\">1953</option>\n" +
        "        <option value=\"1952\">1952</option>\n" +
        "        <option value=\"1951\">1951</option>\n" +
        "        <option value=\"1950\">1950</option></select>\n" +
        "    <select style=\"width: 32%;height: 30px\" name=\"month\" id=\"month\"><option value=\"01\">January</option><option value=\"02\">February</option><option value=\"03\">March</option><option value=\"04\">April</option><option value=\"05\">May</option><option value=\"06\">June</option><option value=\"07\">July</option><option value=\"08\">August</option><option value=\"09\">September</option><option value=\"10\">October</option><option value=\"11\">November</option><option value=\"12\">December</option></select>\n" +
        "    <select style=\"width: 32%;height: 30px\" name=\"day\" id=\"day\"> <option value=\"01\">1</option><option value=\"02\">2</option><option value=\"03\">3</option><option value=\"04\">4</option><option value=\"05\">5</option><option value=\"06\">6</option><option value=\"07\">7</option><option value=\"08\">8</option><option value=\"09\">9</option><option value=\"10\">10</option><option value=\"11\">11</option><option value=\"12\">12</option><option value=\"13\">13</option><option value=\"14\">14</option><option value=\"15\">15</option><option value=\"16\">16</option><option value=\"17\">17</option><option value=\"18\">18</option><option value=\"19\">19</option><option value=\"20\">20</option><option value=\"21\">21</option><option value=\"22\">22</option><option value=\"23\">23</option><option value=\"24\">24</option><option value=\"25\">25</option><option value=\"26\">26</option><option value=\"27\">27</option><option value=\"28\">28</option><option value=\"29\">29</option><option value=\"30\">30</option><option value=\"31\">31</option></select>\n"+
        "<label for=\"password\">Password::</label><br>\n" +
        "<input type=\"password\" id=\"password\" name=\"password\" required><br>\n" +
        "</div>\n" +
        "<div class=\"container\" style=\"background-color:#f1f1f1\">\n" +
        "<button type=\"submit\" value=\"Add User\" onClick=\"addUser()\">Add User</button>\n"+
        "</div>";

}

function addUser() {
    let username = document.getElementById("username").value;
    let nameAndSurname = document.getElementById("nAnds").value;
    let genderSelect = document.getElementById('gender');
    let gender = String(genderSelect.options[genderSelect.selectedIndex].value);
    let password = document.getElementById("password").value;
    let yearSelect = document.getElementById('year');
    let year = yearSelect.options[yearSelect.selectedIndex].value;
    console.log(year)
    let monthSelect = document.getElementById('month');
    let month = monthSelect.options[monthSelect.selectedIndex].value;
    let daySelect = document.getElementById('day');
    let day = daySelect.options[daySelect.selectedIndex].value;
    let date = String(year) + "-" + String(month) + "-" +String(day);
    let available = "offline";
    let role = "regular";
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
        '<gs:addUserRequest> '+
        '<gs:user> '+
        '<gs:uid>0</gs:uid> '+
        '<gs:username>'+username+'</gs:username> '+
        '<gs:NameandSurname>'+nameAndSurname+'</gs:NameandSurname> '+
        '<gs:password>'+password+'</gs:password> '+
        '<gs:role>regular</gs:role> '+
        '<gs:birthdate>'+date+'</gs:birthdate> '+
        '<gs:gender>'+gender+'</gs:gender> '+
        '<gs:available>offline</gs:available> '+
        '</gs:user> '+
        '</gs:addUserRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope> ';
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                xmlDoc = xmlhttp.responseXML;
                let statusObject = xmlDoc.getElementsByTagName("ns2:status")[0];
                let status = statusObject.childNodes[0].nodeValue;
                alert(status);
                addHTMLForAddUser();
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


addHTMLForAddUser()