const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");
const app = express();
const Admin = require("./models/Admin")
app.use(express.json());

const PORT = 3000;

// подключение к БД MongoDB

mongoose.connect("mongodb://localhost:27017/students").then(()=> {
  console.log("MongoDB подключен!");
  
}).catch((err)=>{
  console.error("Ошибка подключения к БД:  " , err.message)
  process.exit(1);
})

const students = [
  {
    id: 1,
    name: "Иван Иванов",
    age: 19,
    course: 1,
    gpa: 4.5,
    email: "ivan.ivanov@university.edu",
  },
  {
    id: 2,
    name: "Мария Петрова",
    age: 20,
    course: 2,
    gpa: 4.8,
    email: "maria.petrova@university.edu",
  },
  {
    id: 3,
    name: "Алексей Сидоров",
    age: 21,
    course: 3,
    gpa: 3.9,
    email: "alexey.sidorov@university.edu",
  },
  {
    id: 4,
    name: "Екатерина Смирнова",
    age: 22,
    course: 4,
    gpa: 4.2,
    email: "ekaterina.smirnova@university.edu",
  },
  {
    id: 5,
    name: "Дмитрий Волков",
    age: 20,
    course: 2,
    gpa: 3.5,
    email: "dmitry.volkov@university.edu",
  },
];


app.post("/registration" , async (req , res)=>{
  try{
    const {name , age} = req.body
    if(name == "" || age == 0){
      res.end("Не все данные заполнены!")
    }
    const student = new Student({name , age})
    await student.save()
    res.end("Студент успешно добавлен")
  }catch(err){
      console.log("Ошибка регистрации админа!:" + err.message);
      
  }
})


app.post("/adminreg" , async (req , res)=>{
  try{
    const {name , lastname, age, city, phone} = req.body
    if(name == "" || age == 0 || lastname =="" || city == "" || phone == 0){
      res.send("Не все данные заполнены!")
    }
    const admin = new Admin({name , lastname, age , city, phone})
    await admin.save()
    res.end("Админ успешно добавлен")
  }catch(err){
      console.log("Ошибка регистрации админ!:" + err.message);
      
  }
})

app.get("/", (req, res) => {
  res.send("Главная страница!");
});

app.get("/students", (req, res) => {
  res.send(students);
});

app.get("/students/:id", (req, res) => {
  let student = students.find((stud) => {
    return stud.id == req.params.id;
  });

  if (!student) {
    return res.status(404).json({ error: "Пользователь не найден!" });
  }
  res.json(student);
});

app.post("/student", (req, res) => {
  const { name, age } = req.body;

  const newStudent = {
    id: students.length+1,
    name: name,
    age: age,
  };

  students.push(newStudent);
  // res.status(200).json("Регистрация прошла успешно!", newStudent);
  res.send(students)
  
});

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен!${PORT}`);
});
