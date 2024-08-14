import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools';


export default function BasicForm() {

  const form = useForm()
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
                message:"Please enter email"
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
                message:"Invalid Email"
              },
              
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
          <button className='btn btn-danger px-5 py-2 mt-3'>Submit</button>
        </form>
      </div>
      <DevTool control={control} />
    </div>
  )
}
