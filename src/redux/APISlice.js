import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJobs= createAsyncThunk('jobs/getJobs',async function(start,limit) {
    const {data} = await axios.get(`https://skills-api-zeta.vercel.app/jobs?cursor=${start}&limit=${limit}`);
    return data.data
})

const jobsSlice= createSlice({
    name:"jobs",
    initialState:{
        allJobs:[],
        nextJobs:0,
        jobsCount:0,
        isLoading:true
    },
    extraReducers:function(builder) {
        builder.addCase(fetchJobs.fulfilled , function(state,action) {
            const apiJobs = [...action.payload.jobs];
            const currentJobs= [...state.allJobs];
            const totalJobs=currentJobs.concat(apiJobs)

            const filterTotalJobs = totalJobs.filter( (ele, index) => index === totalJobs.findIndex( elem => elem.id === ele.id))
            state.allJobs=filterTotalJobs;
            state.isLoading=false;

            if(action.payload.meta.next!== undefined){
                state.nextJobs=action.payload.meta.next;
            }else{
                state.nextJobs=undefined;
            }
            state.jobsCount=action.payload.meta.count;
        })
        builder.addCase(fetchJobs.rejected,function(state,action) {
            state.isLoading=false;
            state.allJobs=[];
        })
    }
})

export default jobsSlice.reducer;