import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'


export default function BasicForm() {

  const form = useForm({
    defaultValues:{
      username:"",
      email:"",
      password:"",
      social:{
        instagram:"",
        facebook:""
      },
      phoneNumber:["",""]
    }
  })
  const { register, control, handleSubmit ,formState} = form;

  const {errors}=formState;

  const onSubmit = (data) => { console.log("Form Submitted", data) }


  return (
    <div className='row m-0'>
      <div className='col-12 col-md-8 col-lg-4 mx-auto mt-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              required: {
                value: true,
                message: "Please enter facebook name"
              }
            })} /><br />
          </div>
          <div><p className="text-danger">{errors.instagram?.message}</p></div>

          <div>
            <label htmlFor='phoneNumber'>Phone No. 1 : </label><br />
            <input type='text' id='phoneNumber1' {...register("phoneNumber[0]", {
              required: {
                value: true,
                message: "Please enter facebook name"
              }
            })} /><br />
          </div>
          <div><p className="text-danger">{errors.phoneNumber?.message}</p></div>
          <div>
            <label htmlFor='phoneNumber'>Phone No. 2 </label><br />
            <input type='text' id='phoneNumber2' {...register("phoneNumber[1]", {
              required: {
                value: true,
                message: "Please enter facebook name"
              }
            })} /><br />
          </div>
          <div><p className="text-danger">{errors.instagram?.message}</p></div>
          <button className='btn btn-danger px-5 py-2 mt-3'>Submit</button>
        </form>
      </div>
      <DevTool control={control} />
    </div>
  )
}
