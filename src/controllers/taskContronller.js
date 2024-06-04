// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
import Firebase  from "../services/firebase";
const jwt = require("jsonwebtoken");
const {insertOne, findOne,updatetOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;

var refreshTokens = [];
module.exports = {
  async login(req, res) {
    /* 
        #swagger.tags = ['task']
         #swagger.description = "return information of task if it exist in DB"
        */
    try {
      const { email } = req.body;
      let task = await findOne("task",{email}) 
          const accessToken = jwt.sign(
            { task_id: task.email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1000d",
            }
          );
          return Response(res,200,"success",{data: task, accessToken })
        } 
      catch (error) {
      return Response(res,400,"fail","")
    }
  },

  async store(req,res){
    /* 
        #swagger.tags = ['task']
        */
    const {title,description} = req.body
    let rs = await insertOne("task",{title,description,status:"incomplete"})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },

  async findAll(req,res){
    /* 
        #swagger.tags = ['task']
        #swagger.description = "filter task by status value [completed,incomplete] or don't pass anything to get all task"
        */
    const {status}= req.query
    let rs = await findAll("task",req.query)
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async find(req,res){
    /* 
        #swagger.tags = ['task']
        */
    const id = req.params
    let rs = await findOne("task",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async update(req,res){
    /* 
        #swagger.tags = ['task']
        #swagger.description = "only pass variables that you want to update their value
        example: status:'completed'"
        */
    const id= req.params
    console.log(req.body);
    const {title,description,status} = req.body
    
    let rs = await updatetOne("task",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async delete(req,res){
    /* 
        #swagger.tags = ['task']
        */
    const id = req.params
    let rs = await deleteFunction("task",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  }
};