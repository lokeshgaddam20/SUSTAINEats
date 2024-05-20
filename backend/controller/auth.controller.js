async function signupAction(req,res){
    res.status(200).send("Signup Action")

}

async function loginAction(req,res){
    res.status(200).send("Login Action")
}


async function logoutAction(req,res){
    res.status(200).send("logout Action")
}


module.exports={signupAction,loginAction,logoutAction}