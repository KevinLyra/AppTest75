import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Profile from './component/Profile';
import axios from 'axios'

function App() {

  const [count, setCount] = useState(1)
  const [profile, setProfile] = useState({})
  const [dark, setDark] = useState(false)

  useEffect(() => {
    axios
    .get(`https://jsonplaceholder.typicode.com/users/${count}`)
    .then((response) =>{
      setProfile(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [count])

  const classBtnTheme = dark ? 'btn-light' : 'btn-dark'
  const textBtnTheme = dark ? 'Clair ' : 'Sombre'

  const memoizedValue = useMemo(() => {
    return count > 10
  }, [count])

  console.log(memoizedValue)
  
  const goDark = () => {
    setDark(!dark)

    if(!dark){
      document.body.classList.add("bg-secondary")
    }else{
      document.body.classList.remove("bg-secondary")
    }
  }
  return (
    <div className="container">
      <h1 className='text-center'>UseMemo()</h1>
      {memoizedValue && setCount(1)}
      <button className='btn btn-info mb-3'onClick={() => setCount(count + 1)}>Increment {count}</button>
      <button className={`btn ${classBtnTheme} mb-3 float-right`} onClick={goDark}>{textBtnTheme}</button>
      <Profile profile={profile}
               count={count}
      />
    </div>
  );
}

export default App;
