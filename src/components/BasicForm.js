import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'


export default function BasicForm() {

  const form = useForm({
    defaultValues:{
      username:"",
      email:"",
      password:"",
      bod:new Date(),
      age:0,
      social:{
        instagram:"",
        facebook:""
      },
      phoneNumber:["",""]
    }
  })
  const { register, control, handleSubmit,watch,getValues,setValue ,formState,reset} = form;

  const {errors,touchedFields,dirtyFields,validatingFields,isDirty,isValid,isSubmitting,isSubmitted,isSubmitSuccessful}=formState;

  console.log(touchedFields,dirtyFields,validatingFields)

  const onSubmit = (data) => { console.log("Form Submitted", data) }

//  const watchForm = watch();

  useEffect(()=>{
    const subscription = watch((value)=>{
      console.log(value);
    });
    return ()=> subscription.unsubscribe();
  },[watch]);

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset();
    } 
  },[isSubmitSuccessful])

  const handleGetValues=()=>{
    console.log("Get Values : ",getValues(["username"]));
  }
  const handleSetValues=()=>{
    setValue("username","",{
      shouldValidate:true,
      shouldDirty:true,
      shouldTouch:true
    })
  }

  const onError=(errors)=>{
    console.log("Submission Error",errors);
  }

  console.log(isSubmitting,isSubmitted,isSubmitSuccessful)

  return (
    <div className='row m-0'>
      <div className='col-12 col-md-8 col-lg-4 mx-auto mt-5'>
        {/* <p>Watch Values : {JSON.stringify(watchForm)}</p> */}
        <form onSubmit={handleSubmit(onSubmit,onError)}>
          <h3>SignIn Form</h3>
          <div>
            <label htmlFor='username'>Username : </label><br />
            <input type='text' id='username' {...register("username", {
              required: {
                value: true,
                message: "Please enter username"
              }
            })} /><br />
          </div>
          <div><p className="text-danger">{errors.username?.message}</p></div>
          <div>
            <label htmlFor='email'>Email : </label><br />
            <input type='email' id='email' {...register("email", {
              required:{
                value:true,
                message:"Please enter email",
              },
              validate:{
                notAdmin:(fieldValue)=>{
                return (fieldValue !== "Admin@123" || "Enter different email");
              },
              notBlackListed:(fieldValue)=>{
                return (fieldValue !== "Blocked@123" || "This email is blocked enter another email");
              },
            }
            })} /><br />
          </div>
          <div><p className="text-danger">{errors.email?.message}</p></div>
          <div>
            <label htmlFor='password'>Password : </label><br />
            <input type='password' id='password' {...register("password",{
              required:{
                value:true,
                message:"Enter Password"
              },
              minLength:{
                value:6,
                message:"Invalid minimum length 6"
              },
              maxLength:{
                value:10,
                message:"Invalid maximum length 10"
              }
            })} /><br />
          </div>
          <div><p className="text-danger">{errors.password?.message}</p></div>

          <div>
            <label htmlFor='age'>Age : </label><br />
            <input type='text' id='age' {...register("age", {
              valueAsNumber:true,
              required: {
                value: true,
                message: "Please enter instagram name"
              }
            })} /><br />
          </div>
          <div><p className="text-danger">{errors.age?.message}</p></div>
          <div>
            <label htmlFor='bod'>BOD : </label><br />
            <input type='date' id='bod' {...register("bod", {
              valueAsDate:true,
            })} /><br />
          </div>

          <div>
            <label htmlFor='instagram'>Instagram : </label><br />
            <input type='text' id='instagram' {...register("social.instagram", {
              required: {
                value: true,
                message: "Please enter instagram name"
              }
            })} /><br />
          </div>
          <div><p className="text-danger">{errors.instagram?.message}</p></div>

          <div>
            <label htmlFor='facebook'>Facebook : </label><br />
            <input type='text' id='facebook' {...register("social.facebook", {
              disabled:watch("social.instagram")==="",
              // required: {
              //   value: true,
              //   message: "Please enter facebook name"
              // }
            })} /><br />
          </div>
          <div><p className="text-danger">{errors.facebook?.message}</p></div>

          <div>
            <label htmlFor='phoneNumber'>Phone No. 1 : </label><br />
            <input type='text' id='phoneNumber1' {...register("phoneNumber[0]")} /><br />
          </div>
          <div><p className="text-danger">{errors.phoneNumber?.message}</p></div>
          <div>
            <label htmlFor='phoneNumber'>Phone No. 2 </label><br />
            <input type='text' id='phoneNumber2' {...register("phoneNumber[1]")} /><br />
          </div>
          <div><p className="text-danger">{errors.instagram?.message}</p></div>
          <button className='btn btn-danger px-5 py-2 mt-3' disabled={!isDirty || !isValid} >Submit</button>
          <button className='btn btn-danger px-5 py-2 mt-3' type='button' onClick={handleGetValues}>Get Values</button>
          <button className='btn btn-danger px-5 py-2 mt-3' type='button' onClick={handleSetValues}>Set Values</button>
          {/* <button className='btn btn-danger px-5 py-2 mt-3' type='button' onClick={()=>reset()} >Reset</button> */}
        </form>
      </div>
      <DevTool control={control} />
    </div>
  )
}
