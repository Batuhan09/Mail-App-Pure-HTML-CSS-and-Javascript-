package com.example.producingwebservice;
import io.spring.guides.gs_producing_web_service.Message;
import io.spring.guides.gs_producing_web_service.User;

import javax.xml.crypto.Data;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import java.sql.*;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
public class Database {
    Connection connection = connect_to_db("Users","postgres","Baaymuan09.");
    private static Database obj;

    static {
        try {
            obj = new Database();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
    public static Database getDatabase(){
        return obj;
    }

    public Database() throws ParseException {
    }

    public Connection connect_to_db(String dbname, String user, String pass) throws ParseException {
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/"+dbname,user,pass);
        }catch (Exception e){
            System.out.println(e);
        }
        return connection;
    }
      public User getCurrentUser(User user){/// usgetCurrentUserer yerine name ve password geçebilir!!!!!!!
          Statement statement;
          ResultSet rs=null;
          User currentUser = new User();
          try {
              String query=String.format("select * from Users where name= '%s' and password= '%s'",user.getUsername(),user.getPassword());
              statement=connection.createStatement();
              rs=statement.executeQuery(query);
              while (rs.next()) {
                  currentUser.setAvailable(rs.getString("available"));
                  currentUser.setGender(rs.getString("gender"));
                  currentUser.setRole(rs.getString("role"));
                  currentUser.setPassword(rs.getString("password"));
                  currentUser.setUsername(rs.getString("name"));
                  currentUser.setNameandSurname(rs.getString("NameandSurname"));
                  currentUser.setUid(rs.getInt("uid"));
              }
          }catch (Exception e){
              System.out.println(e);
          }
          return currentUser;
      }

      public User getUserbyId(int id){
          Statement statement;
          ResultSet rs=null;
          User user= new User();
          try {
              String query=String.format("select * from Users where uid = %d",id);
              statement=connection.createStatement();
              DatatypeFactory dat = DatatypeFactory.newInstance();
              XMLGregorianCalendar date = dat.newXMLGregorianCalendar();
              rs=statement.executeQuery(query);
              while (rs.next()) {
                  user.setUid(id);
                  user.setUsername(rs.getString("name"));
                  user.setPassword(rs.getString("password"));
                  user.setRole(rs.getString("role"));
                  user.setGender(rs.getString("gender"));
                  user.setNameandSurname(rs.getString("NameandSurname"));
                  user.setAvailable(rs.getString("available"));
              }
          }catch (Exception e){
              System.out.println(e);
          }
          return user;
      }
    public void addUser(User user){ // function overloading //// (User user) şeklinde geç
        Statement statement ;
        ResultSet rs=null;
        XMLGregorianCalendar xmlDate = user.getBirthdate();
        long time = xmlDate.toGregorianCalendar().getTime().getTime();
        java.sql.Date sqlDate = new java.sql.Date(time);
        try {
            String query=String.format("insert into " +
                            "Users(name,NameandSurname,password,role,birthdate,gender,available) " +
                            "values('%s','%s','%s','%s','%s','%s','%s');",
                    user.getUsername(),user.getNameandSurname(),
                    user.getPassword(),user.getRole(),
                    sqlDate,user.getGender(),
                    user.getAvailable());
            statement=connection.createStatement();
            statement.executeUpdate(query);
            System.out.println("Row Inserted");
        }catch (Exception e){
            System.out.println(e);
        }
    }
    public void delete_row_by_id(int id){////EKLENDİ
        Statement statement;
        try{
            String query=String.format("delete from Users where uid= %d",id);
            statement=connection.createStatement();
            statement.executeUpdate(query);
            System.out.println("Data Deleted");
        }catch (Exception e){
            System.out.println(e);
        }
    }
    public int getId(String name, String password){
        Statement statement;
        ResultSet rs=null;
        int result = -1;
        try {
            String query=String.format("select * from %s where name= '%s' and password= '%s'","Users",name,password);
            statement=connection.createStatement();
            rs=statement.executeQuery(query);

            while (rs.next()) {
                result = rs.getInt("uid");
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return result;
    }
    public List<User> getUsers(){
        Statement statement;
        ResultSet rs=null;
        List<User> userList = new ArrayList<>();
        try {
            String query=String.format("select * from %s;","Users");
            statement=connection.createStatement();
            rs=statement.executeQuery(query);
            while (rs.next()) {
                User user = new User();
                user.setUid(rs.getInt("uid"));
                user.setUsername(rs.getString("name"));
                user.setNameandSurname(rs.getString("NameandSurname"));
                user.setPassword(rs.getString("password"));
                user.setRole(rs.getString("role"));
                user.setGender(rs.getString("gender"));
                user.setAvailable(rs.getString("available"));
                userList.add(user);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return userList;
    }
    public void update_name(int id,String new_name){
        Statement statement;
        try {
            String query=String.format("update Users set name='%s' where uid=%d",new_name, id);
            statement=connection.createStatement();
            statement.executeUpdate(query);
            System.out.println("Data Updated");
        }catch (Exception e){
            System.out.println(e);
        }
    }
    public void update_user(User user){
        Statement statement;
        try {
            String query=String.format("update Users set name='%s', nameandsurname='%s', gender='%s' where uid=%d",user.getUsername(),user.getNameandSurname(),user.getGender(),user.getUid());
            statement=connection.createStatement();
            statement.executeUpdate(query);
            System.out.println("Data Updated");
        }catch (Exception e){
            System.out.println(e);
        }
    }

    public void update_NameandSurname(int id,String new_NameandSurname){
        Statement statement;
        try {
            String query=String.format("update Users set NameandSurname='%s' where uid=%d",new_NameandSurname, id);
            statement=connection.createStatement();
            statement.executeUpdate(query);
            System.out.println("Data Updated");
        }catch (Exception e){
            System.out.println(e);
        }
    }
    public void update_available(int id,String available){
        Statement statement;
        try {
            String query=String.format("update Users set available='%s' where uid=%d",available, id);
            statement=connection.createStatement();
            statement.executeUpdate(query);
        }catch (Exception e){
            System.out.println(e);
        }
    }
    public List<Message> get_last_ten_with_specified(int id, int id2){/// FROM TO SEKLINDE GEC
        Statement statement;
        ResultSet rs=null;
        List<Message> messageList = new ArrayList<>();
        try {
            String query=String.format("select * from Messages where (fromu= %d and tou = %d) or (tou = %d and fromu = %d) order by createdat desc limit 50",id,id2,id,id2);
            statement=connection.createStatement();
            rs=statement.executeQuery(query);
            while (rs.next()){
                Message message = new Message();
                message.setTitle(rs.getString("title"));
                message.setToU(rs.getInt("tou"));
                message.setFromU(rs.getInt("fromu"));
                message.setContent(rs.getString("content"));
                messageList.add(message);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return messageList;
    }

    public List<Message> getInbox(int id){
        Statement statement;
        ResultSet rs=null;
        List<Message> messageList = new ArrayList<>();
        try {
            String query=String.format("select * from Messages where tou = %d order by createdat desc limit 50",id);
            statement=connection.createStatement();
            rs=statement.executeQuery(query);
            while (rs.next()){
                Message message = new Message();
                message.setTitle(rs.getString("title"));
                message.setToU(rs.getInt("tou"));
                message.setFromU(rs.getInt("fromu"));
                message.setContent(rs.getString("content"));
                messageList.add(message);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return messageList;
    }
    public List<Message> getOutbox(int id){
        Statement statement;
        ResultSet rs=null;
        List<Message> messageList = new ArrayList<>();
        try {
            String query=String.format("select * from Messages where fromu = %d order by createdat desc limit 50",id);
            statement=connection.createStatement();
            rs=statement.executeQuery(query);
            while (rs.next()){
                Message message = new Message();
                message.setTitle(rs.getString("title"));
                message.setToU(rs.getInt("tou"));
                message.setFromU(rs.getInt("fromu"));
                message.setContent(rs.getString("content"));
                messageList.add(message);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return messageList;
    }
    public void addMessage(Message message){ // function overloading yap
        Statement statement;
        long now = System.currentTimeMillis();
        Timestamp sqlTimestamp = new Timestamp(now);
        try {
            String query=String.format("insert into " +
                            "Messages(fromu,tou,title,content,createdAt) " +
                            "values('%s','%s','%s','%s','%s');",message.getFromU(),
                    message.getToU(),message.getTitle(),message.getContent(), sqlTimestamp);
            statement=connection.createStatement();
            statement.executeUpdate(query);
            System.out.println("Row Inserted");
        }catch (Exception e){
            System.out.println(e);
        }
    }

}

