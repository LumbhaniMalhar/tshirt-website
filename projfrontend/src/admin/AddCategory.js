import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const AddCategory = () => {
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [getredirect, setgetredirect] = useState(false)

    const {user, token} = isAuthenticated()

    const handleChange = event => {
        setError("")
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        createCategory(user._id, token, {name})
            .then(data => {
                if (data.error){
                    setError(true)
                } else {
                    setError("")
                    setSuccess(true)
                    setName("")
                    setTimeout(() => {
                        setgetredirect(true)
                      }, 2000)
                }
            })
    }

    const performRedirect = () => {
        if(getredirect === true) {
          return <Redirect to="/admin/dashboard" />
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link className='btn btn-sm btn-success mb-3' to="/admin/dashboard">Admin Home</Link>
        </div>
    )
    
    const successMessage = () => {
        if (success) {
            return <h4 className='text-success'>Category created successfully</h4>
        }
    }

    const errorMessage = () => {
        if (error) {
            return <h4 className='text-success'>Failed to create category</h4>
        }
    }

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text" value={name} onChange={handleChange} className= "form-control my-3" autoFocus required placeholder='For ex. summer' />
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>
    );
    

    return (
        <Base title='Create a Category here' description='Add a new category for new tshirts' className='container bg-info p-4'>
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {myCategoryForm()}
                    {goBack()}
                    {performRedirect()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;