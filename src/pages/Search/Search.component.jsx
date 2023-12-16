import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./Search.styles.css";
import JobCards from '../../components/JobCards/JobCards.component';
import SideBar from '../../components/SideBar/SideBar.component';
import SearchBox from '../../components/SearchBox/SearchBox.component';
import JobCardSkeleton from '../../skeleton/JobCardSkeleton/JobCardSkeleton.component';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import { useSelector,useDispatch } from 'react-redux';
import { fetchJobs } from './../../redux/APISlice.js';
import NoResult from '../../components/NoResult/NoResult.component.jsx';

function Search() {
  const {allJobs,isLoading}=useSelector((state) => state.jobsReducer);
  const dispatch= useDispatch();
  const searchRef = useRef(null);
  const {state} = useLocation();
  let [jobs,setJobs]= useState([]);
  let [searchJobs,setSearchJobs]= useState([]);
  let [query,setQuery]= useState('');
  let [searchSave,setSearchSave]=useState([]);
  let [isSubmit,setIsSubmit]=useState(false);
  let sIndex=-1;

  // Fetch search results from the API
  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`https://skills-api-zeta.vercel.app/jobs/search?query=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return 'error';
    }
  };

  const handleSearch =_.debounce(async (searchQuery) => {
    setQuery(searchQuery)
    if(searchQuery.length === 0) {
      setJobs(allJobs)
    }else if (searchQuery.length >= 3) {
      sIndex=-1;
      const highLightItem =document.getElementsByClassName('hl');
      if(highLightItem.length ===1 ) {
        highLightItem[0].classList.remove('hl');
      }
      const results = await fetchSearchResults(searchQuery);
      setSearchJobs([...results.data.jobs]);
    }
  },100);

  function handleAutoComplete(e) {
    setQuery(e.target.innerHTML);
    setSearchJobs([])
    document.getElementById("search-bar").focus();
  }

  const handleOutsideClick = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchJobs([])
    }
  };

  function handleLocalStorage(query) {
    if(searchSave===null){
      localStorage.setItem("queries", JSON.stringify([query]))
    }else{
      const savedQueries=[...JSON.parse(localStorage.getItem("queries"))];
      const newQueries =savedQueries.concat([query])
      localStorage.setItem("queries",JSON.stringify(newQueries));
      setSearchSave(newQueries)
    }
  }

  function handleSearchHistory(e) {
    setQuery(e.target.innerHTML)
    document.getElementById("search-bar").focus();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    sIndex=-1
    const highLightItem =document.getElementsByClassName('hl');
    if(highLightItem.length ===1 ) {
      setQuery(highLightItem[0].innerHTML.toLowerCase());
      handleLocalStorage(highLightItem[0].innerHTML.toLowerCase())
      highLightItem[0].classList.remove('hl');
      const {data} = await fetchSearchResults(query);
      setJobs([...data.jobs]);
      setSearchJobs([])
      setIsSubmit(true) 
    }else if(query.length>=3) {
      const {data} = await fetchSearchResults(query);
      setJobs([...data.jobs]);
      setSearchJobs([])
      handleLocalStorage(query);
      setIsSubmit(true)
    }else{
      setJobs([])
      setIsSubmit(true)
    } 
  }
  
  function moveByArrow(e) {
    let highLightItems=document.getElementsByClassName('hl');
    if(query.length>=3){
      let items=document.getElementsByClassName('autocomplete-item'); 
        if (e.keyCode === 40) {
          if(highLightItems.length===1){
            highLightItems[0].classList.remove('hl')
          }
          if (sIndex === -1) {
            items[++sIndex].classList.add("hl");
          }
          else if (sIndex === items.length-1) {
            sIndex=-1
          }
          else {
            items[++sIndex].classList.add("hl");
          }
        }
  
      else if (e.keyCode === 38) {
        if(highLightItems.length===1){
          highLightItems[0].classList.remove('hl')
        }
        if (sIndex === 0) {
          sIndex=-1
        }else{
          items[--sIndex].classList.add("hl");
        }  
      }
    } 
  }
  document.addEventListener('keydown',moveByArrow,true);

  useEffect(()=>{
    if (query==='') {
      dispatch(fetchJobs())
    }
  },[query])

  useEffect(()=>{
    setSearchSave(localStorage.getItem('queries'))
    if(state !== null){
      const { searchQuery } = state;
      setQuery(searchQuery)
      document.getElementById("search-bar").focus();
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  },[])



  return (
    <div>
      <SearchBox
        searchRef={searchRef} 
        handleAutoComplete={handleAutoComplete} 
        handleSearch={handleSearch} 
        searchJobs={searchJobs} 
        query={query}
        handleSubmit={handleSubmit}
        />
         
      <div className='search-container'>
        {
          isLoading?  
          <>
            <JobCardSkeleton />
          </>
          :
          jobs.length===0 && isSubmit?
          <NoResult/>
          :
          <>
            <h3 className='page-title search-title'>All Jobs: {jobs.length===0?allJobs.length:jobs.length}</h3>
            <JobCards jobs={jobs.length===0?allJobs:jobs} style={'search-cards'}/>
          </>
        }
        <SideBar title={'Search history:'} type={'search'} handleSearchHistory={handleSearchHistory}/>
      </div>
    </div>
  )
}
export default Search;