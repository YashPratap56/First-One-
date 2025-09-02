import jwt from 'jsonwebtoken'
// middleware functio  to decode jwt tokeren to get the clerk id

export const authUser=async (req,res,next)=>{

    try {
        const {token}=req.headers
        if (!token) {
            return res.json({sucess:false,message:'not authorized to login'})
            
        }
        const token_decode=jwt.decode(token);
        req.clerkId=token_decode.clerkId;
        next()
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }

}