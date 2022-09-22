import './App.css';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';

function App() {

  const { register, handleSubmit } = useForm();

  const useMatchMedia = (mediaQuery, initialValue) => {
    const [isMatching, setIsMatching] = useState(initialValue)
    useEffect(() => {
      const watcher = window.matchMedia(mediaQuery)
      setIsMatching(watcher.matches)
      const listener = (matches) => {
        setIsMatching(matches.matches)
      }
      if (watcher.addEventListener) {
        watcher.addEventListener('change', listener)
      } else {
        watcher.addListener(listener)
      }
      return () => {
        if (watcher.removeEventListener) {
          return watcher.removeEventListener('change', listener)
        } else {
          return watcher.removeListener(listener)
        }
      }
    }, [mediaQuery])
  
    return isMatching
  }

  const onSubmit = data => {
    fetch('https://idmtest.proxy.beeceptor.com', {
      method: 'POST',
      data: JSON.stringify(data)
    }).then(response => {
      if(response.status !== 200) {
        alert.dialog("Hubo un error");
      }
      console.log(response)
    }).catch(error => {
      alert.dialog(error);
    })
  }

  const isDesktopResolution = useMatchMedia('(min-width:992px)', true)

  return (
    <div className="App">


      <div className="header">
        <div className='title'>
          <h1>INDUSTRIAL</h1>
          <p>Integrated Solutions, Proven Results</p>
        </div>
        <div className='contact'>
          <h1>QUESTIONS? CALL </h1>
          <a href="localhost:3000">1-800-256-9802</a>
        </div>
      </div>


      <div className="mainSection">
        <div className="mainSectionText">
          <h2>A complete line of </h2>
          <h1>INDUSTRIAL </h1>
          <h2>SAFETY PRODUCTS </h2>
        </div>
        <div className="formDiv">
          { isDesktopResolution && (
            <div className='form'>
            <h1>CONTACT US TODAY</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='formSeparator'> 
                <input 
                  type='text' 
                  placeholder="FIRST NAME" 
                  {...register("firstName", { required: true })}
                />
                <input 
                  type='text' 
                  placeholder="LAST NAME" 
                  {...register("lastName", { required: true })
                }/>

              </div>
              <input 
                type='text' 
                placeholder="COMPANY" 
                {...register("company", { required: true })} 
              />
              <div className='formSeparator'>
                <input 
                  type='text' 
                  placeholder="EMAIL" 
                  {...register("email", { 
                      required: true, 
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                    })
                  }
                />
                <input 
                  type='text' 
                  placeholder="PHONE" 
                  {...register("phone", { required: true })}
                />
              </div>
              <textarea 
                rows={5}
                placeholder='MESSAGE' 
                {...register("message", { required: true })}
              >
              </textarea>
              <input className="submitButton" type="submit" value="SUBMIT" />
            </form>
          </div>
          ) }
          
        </div>
       
      </div>


      <div className='information'>

      </div>


    </div>
  );
}

export default App;
