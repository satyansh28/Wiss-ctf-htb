const { exec } = require('child_process');
const connection = require("../db/connector");
function valid(script){
    if(!script)
        return false;
    for(var i of script)
    {
        let code=i.charCodeAt(0);
        if (!(code >= 46 && code < 58) && // numeric (.,/,0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123) && // lower alpha (a-z)
        !code)
            return false;
    }
    return true
}
exports.getIndex =(async (req, res, next) => {
      res.render("home");
});

exports.getComplaints = (async (req, res, next) => {
    res.render("complaintsForm");
    
});

exports.getMaintenance =(async (req, res, next) => {
    connection.execute(`select * from login_details where name='${req.session.user}';`,(err,results,fields)=>
    {    
        if (!err && results && results[0])
            res.render("scripts");
        else
            res.render("maintenance",{err:false});
            
    });
   
});

exports.postComplaints =(async (req, res, next) => {
    console.log(req.file,req.body);
    res.send("<script type='text/javascript'>alert('Image uploaded to ./images');document.location.href='/';</script>");
});

exports.MaintenanceAuth =(async(req,res,next)=>{
    
    const uname=req.body.username;
    const psswd=req.body.psswd;
    const query=`SELECT * FROM login_details WHERE NAME='${uname}' AND PASSWORD='${psswd}';`
    console.log(query);
    connection.execute(query,(err,results,fields)=>{
        
        if(!err && results && results[0])
        {
            console.log(results[0].name);
            req.session.user=results[0].name;
            res.render("scripts");    
        }
        else
            res.render("maintenance",{err:true});
    })
    
});

exports.runScript=(async(req,res,next)=>{
    
    if(!req.session.user )
        res.status(401).send();
    connection.execute(`select * from login_details where name='${req.session.user}';`,(err,results,fields)=>
    {
        
        if(!err && results && results[0])
        {
            try {
                if(valid(req.body.script_to_run))
                    res.status(400).send({error:"Invalid characters in script name."});
                else
                    exec(`./scripts/${req.body.script_to_run}.sh`,(err,stdout,stderr)=>{
                        console.log(err);
                        console.log(stderr);
                        
                        if(err || stderr)
                            res.status(400).send(err);
                        else
                            res.send();
                    });
            }
            catch(e){
                console.log(e);
                res.status(400).send(e);
            }
        }
        else{
            res.status(401).send();
        }
    })
});