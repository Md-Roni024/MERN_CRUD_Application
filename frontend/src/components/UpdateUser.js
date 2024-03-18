import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios';


function UpdateUser() {
  const {id} = useParams()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
  const[users,setUsers] = useState([])

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:3001/updateUser/"+id, { name, email, age });
      // console.log(response.data); // Log response data if needed
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
      axios.get('http://localhost:3001/getUser/'+id)
      .then(result=>{
        console.log(result)
        setName(result.data.name)
        setEmail(result.data.email)
        setAge(result.data.age)

      })
      .catch(err=>console.log(err))
  },[])

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className='mb-2'> 
             <label htmlFor=''>Name</label>
             <input type='text' placeholder='Enter Name'value={name} className='form-control'
             onChange={(e) => setName(e.target.value)}
             />
          </div>
          <div className='mb-2'> 
             <label htmlFor=''>Email</label>
             <input type='email' placeholder='Enter Email'value={email} className='form-control'
             onChange={(e) => setEmail(e.target.value)}
             />
          </div>
          <div className='mb-2'> 
             <label htmlFor=''>Age</label>
             <input type='number' placeholder='Enter Age' value={age} className='form-control'
             onChange={(e) => setAge(e.target.value)}
             />
          </div>
          <button className='btn btn-success'>Update</button>
        </form>
    </div>
</div>
  )
}

export default UpdateUser