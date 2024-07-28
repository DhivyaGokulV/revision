import {Route, createRoutesFromElements, RouterProvider, createBrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobPage, {jobLoader} from './pages/JobPage';
import MainLayout from './Layouts/MainLayout';
import NotFound from './pages/NotFound';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

function App() {
  const addJob = async (newJob) => {
  const res = await fetch('http://localhost:8000/jobs',
  {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newJob)
  });
  return;
  }

  const deleteJob = async (id) =>
  {
    const res = await fetch(`http://localhost:8000/jobs/${id}`,
    {
      method:'DELETE'
    });
    return;
  }

  const updateJob = async (job) =>
  {
    const res = await fetch(`http://localhost:8000/jobs/${job.id}`,
    {
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(job)
    });
    return;
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<MainLayout />}> 
        <Route index element = {<HomePage />} /> 
        <Route path='/jobs' element = {<JobsPage />} />
        <Route path='/jobs/:id' element = {<JobPage deleteJob = {deleteJob}/>} loader={jobLoader}/>
        <Route path='/add-job' element={<AddJobPage addJobSubmit = {addJob}/>}  />
        <Route path='/edit-job/:id' element = {<EditJobPage updateJobSubmit = {updateJob}/>} loader={jobLoader}/>
        <Route path = '*' element = {<NotFound />} />
      </Route>
    )
  );
  
  return <RouterProvider router = {router}/>
}

export default App;
