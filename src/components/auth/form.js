import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'

let AuthForm = props => {
  const { handleSubmit, login } = props

  return (
    <form onSubmit={handleSubmit} className=" mb-24 w-full flex justify-center flex-col items-center">

      <div className="w-10/12 flex justify-between items-center border-b">

        <Field className="flex-grow py-2" name="username" component="input" type="text" placeholder="Username" />
        <i className="fa fa-user mr-2 text-gray-600" aria-hidden="true"></i>
      </div>

      {!login ? <div className="w-10/12 flex justify-between items-center border-b mt-8">

        <Field className="flex-grow py-2" name="name" component="input" type="text" placeholder="Name" />
        <i className="fa fa-user mr-2 text-gray-600" aria-hidden="true"></i>
      </div> : ''}

      <div className="my-8 w-10/12 flex justify-between items-center border-b">

        <Field className="flex-grow py-2" name="password" component="input" type="password" placeholder="Password" />
        <i className="fa fa-lock mr-2 text-gray-600 " aria-hidden="true"></i>
      </div>
      <div className="w-10/12 flex justify-start mt-4">
        <button className="px-8 self-start bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded" type="submit">{props.buttonName}</button>
      </div>



    </form>
  )
}

AuthForm = reduxForm({
  // a unique name for the form
  form: 'auth-form'
})(AuthForm)
export default AuthForm