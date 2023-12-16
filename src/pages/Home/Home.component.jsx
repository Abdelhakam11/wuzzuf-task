import React,{useEffect} from 'react';
import "./Home.styles.css";
import JobCards from '../../components/JobCards/JobCards.component';
import SearchBox from '../../components/SearchBox/SearchBox.component';
import JobCardSkeleton from '../../skeleton/JobCardSkeleton/JobCardSkeleton.component';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { fetchJobs } from './../../redux/APISlice.js';
import NoResult from '../../components/NoResult/NoResult.component.jsx';




function Home() {

  const navigate = useNavigate();
  const dispatch= useDispatch();

  
  const {allJobs,nextJobs,jobsCount,isLoading}=useSelector((state) => state.jobsReducer);



  function handleScroll(ev) {
    const isAtBottom=(window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight
    if (isAtBottom && nextJobs!==undefined) {
      const limit =  jobsCount-nextJobs;
      dispatch(fetchJobs(nextJobs,limit))
    }
  }

  window.onscroll = handleScroll;

  const handleSearch =async (searchQuery) => {
    navigate("/jobs/search",{state: {searchQuery}});
  };

  useEffect(()=>{
    dispatch(fetchJobs())
  },[])
  
  
  return (
    <>
      <SearchBox 
        handleSearch={handleSearch}/>
      <div className='home-container'>
        <div className='title-box'>
          <h3 className='page-title'>All Jobs: {allJobs.length}</h3>
        </div>
        {
          
          isLoading?
          <>
           <JobCardSkeleton />
           <JobCardSkeleton />
          </>
          :
          allJobs.length===0?
            <NoResult />
          :
          <JobCards jobs={allJobs} style='home-cards'/>
          
        }
      </div>
    </>
  )
}
export default Home;