
const userAuth=(req,res,next)=>{
 const accessToken=cookies.accessToken
 res.josn(accessToken)
}

export default userAuth