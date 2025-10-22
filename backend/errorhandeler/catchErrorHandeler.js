const catchErrorhandel=(errorhandler)=>{
return (req,res,next)=>{Promise.resolve(errorhandler(req,res,next)).catch(next)}
}

export default catchErrorhandel