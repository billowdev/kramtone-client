import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { GroupDataPayload, GroupDataArrayPayload, GroupDataArrayResponse } from "@/models/group-data.model";
import axios from 'axios'
import * as  groupDataService from '@/services/group-data.service';
import { GroupDataResponse } from './../../models/group-data.model';

interface GroupDataState {
	groupData: GroupDataPayload
	groupDataArray: GroupDataArrayPayload
}
const initialState: GroupDataState = {
	// message: "",
	groupData: {
		groupName: "",
		groupType: "",
		agency: "",
		logo: "",
		banner: "",
		phone: "",
		email: "",
		hno: "",
		village: "",
		lane: "",
		road: "",
		subdistrict: "",
		district: "",
		province: "",
		zipCode: "",
		lat: "",
		lng: "",
	},
	groupDataArray: [],
};



export const getAllGroupDataAction = createAsyncThunk("GROUP_DATA/GET_ALL", async (): Promise<any> => {
	const response = await groupDataService.getAllGroupData()
	return response;
});

export const getOneGroupDataAction = createAsyncThunk("GROUP_DATA/GET_ONE", async (id:string):Promise<any> => {
	const response = await groupDataService.getOneGroupData(id)
	return response;
});

export const updateGroupDataAction = createAsyncThunk(
	"GROUP_DATA/UPDATE",
	async (data:any) => {
		await groupDataService.updateGroupData(data.id, data.body, data.accessToken);
	}
);

export const deleteGroupLogo = createAsyncThunk(
	"GROUP_DATA/DELETE_LOGO",
	async (data:any) => {
		await groupDataService.deleteGroupLogo(data.id, data.accessToken);
	}
);
export const deleteGroupBanner = createAsyncThunk(
	"GROUP_DATA/DELETE_BANNER",
	async (data:any) => {
		await groupDataService.deleteGroupBanner(data.id, data.accessToken);
	}
);

export const groupDataSlice = createSlice({
	name: "groupData",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getAllGroupDataAction.fulfilled, (state, action) => {
			state.groupDataArray = action.payload
		});

		builder.addCase(getAllGroupDataAction.rejected, (state, action) => {
			state.groupDataArray = [];

		})

		builder.addCase(getOneGroupDataAction.fulfilled, (state, action) => {
			state.groupData = action.payload
		});

		builder.addCase(getOneGroupDataAction.rejected, (state, action) => {
			state.groupData={
				groupName: "",
				groupType: "",
				agency: "",
				logo: "",
				banner: "",
				phone: "",
				email: "",
				hno: "",
				village: "",
				lane: "",
				road: "",
				subdistrict: "",
				district: "",
				province: "",
				zipCode: "",
				lat: "",
				lng: "",
			}

		})


	}
})

export const groupDataSelector = (store: RootState) => store.groupData;

export default groupDataSlice.reducer;