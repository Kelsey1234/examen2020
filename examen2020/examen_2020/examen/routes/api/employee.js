var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);



  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  
////////////////////////////////////*

// http://localhost:3000/api/employee/all
router.get('/all', (req, res)=>{
  empModel.getEmployees((err, dat)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"no se pudo obtener srry"});
    }
    return res.status(200).json(dat);
  });
} );

// http://localhost:3000/api/employee/byid/:id
 router.get('/byid/:id',(req, res)=>{
  var id =  req.params.id ;
  empModel.getEmployeesById(id, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(doc);
  });
});


// http://localhost:3000/api/employee/bycompany/:company
router.get('/bycompany/:company',(req, res)=>{
var company =  req.params.company ;
empModel.getEmployeesByCompany(company, (err, doc)=>{
  if(err){
    console.log(err);
    return res.status(500).json({"error":"error"});
  }
  return res.status(200).json(doc);
});
});

// http://localhost:3000/api/employee/bytag/:tag
router.get('/bytag/:tag',(req, res)=>{
var tag =  req.params.tag ;
empModel.getEmployeesByTag(tag, (err, doc)=>{
  if(err){
    console.log(err);
    return res.status(500).json({"error":"error"});
  }
  return res.status(200).json(doc);
});
});


// http://localhost:3000/api/employee/addtag/:id
router.post('/addtag/:id', (req, res, next)=>{
var id = req.params.id;
var tag = req.body.tag;

empModel.addEmployeeATag(tag,id, (err, result)=>{
  if(err){
    console.log(err);
    return res.status(500).json({"error":"error"});
  }
  return res.status(200).json(result);
});
});



//http://localhost:3000/api/employee/delete/:id
router.delete('/delete/:id', (req, res)=>{
var id = req.params.id;
empModel.removeEmployee(id, (err, deletedDoc)=>{
  if(err){
    console.log(err);
    return res.status(500).json({"error":"error"});
  }
  return res.status(200).json(deletedDoc);
});
});


//http://localhost:3000/api/employee/makeolder
router.put('/makeolder', (req, res, next)=>{
var data = req.body;
empModel.increaseAgeToAll(data, (err, result)=>{
  if(err){
    console.log(err);
    return res.status(500).json({"error":"error"});
  }
  return res.status(200).json(result);
});
});




//http://localhost:3000/api/employee/makeolder/:id
router.put('/makeolder/:id', (req, res)=>{
var id = req.params.id;
var data = {
  "_id": id,
  ...req.body
};
empModel.increaseageporid(data, (err, updatedDoc)=>{
  if(err){
    console.log(err);
    return res.status(500).json({"error":"error"});
  }
  return res.status(200).json(updatedDoc);
});// update
});


//http://localhost:3000/api/employee/byagerange/:min/:max
router.get('/byagerange/:min/:max', (req, res , next)=>{
var min = parseInt(req.params.min);
var max = parseInt(req.params.max);
empModel.getEmployeesByAgeRange(min,max, (err, employees)=>{
  if(err){
    console.log(err);
    return res.status(500).json({"error":"error"});
  }
  return res.status(200).json(employees);
});
});





return router;
}