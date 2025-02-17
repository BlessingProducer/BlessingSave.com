import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from "../../network/axiosClient";
import stateStatus from "../../utils/stateStatus";

const endpoint = 'instagram';

interface Data {
    thumbnail: string;
    music: string;
    hd: string;
    full_hd: string;
}

interface RejectValue {
    code: number,
    status: string,
    message: string;
}

interface InstagramState {
    data: Data | null;
    postUrlStatus: string;
    postUrlError: string | null;
    downloadStatus: string;
    downloadError: string | null;
}

const initialState: InstagramState = {
    data: null,
    postUrlStatus: stateStatus.idleState,
    postUrlError: null,
    downloadStatus: stateStatus.idleState,
    downloadError: null,
}

export const postUrl = createAsyncThunk<Data, {
    url: string;
    lang: string;
}, {
    rejectValue: RejectValue
}>(
    'instagram/postUrl',
    async ({url, lang}, {rejectWithValue}) => {
        try {
            const response = await axiosClient.post(endpoint, {
                url: url,
            }, {
                params: {
                    lang: lang
                }
            });

            if (response.status === 200) {
                if (response.data.code === 200) {
                    return response.data.data;
                } else {
                    return rejectWithValue({
                        code: response.data.code,
                        status: response.data.status,
                        message: response.data.message,
                    });
                }
            }
        } catch (e) {
            return rejectWithValue({
                code: 500,
                status: '',
                message: 'Server error',
            });
        }
    }
);

const instagramSlice = createSlice({
    name: "instagram",
    initialState,
    reducers: {
        resetPostUrlState: (state) => {
            state.postUrlStatus = stateStatus.idleState;
            state.postUrlError = null;
            state.data = null;
        },
        resetDownloadStatus: (state) => {
            state.downloadStatus = stateStatus.idleState;
            state.downloadError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postUrl.pending, (state) => {
                state.postUrlStatus = stateStatus.loadingState;
                state.postUrlError = null;
            })
            .addCase(postUrl.fulfilled, (state, action) => {
                state.postUrlStatus = stateStatus.succeededState;
                state.postUrlError = null;
                state.data = action.payload;
            })
            .addCase(postUrl.rejected, (state, action) => {
                state.postUrlStatus = stateStatus.failedState;
                state.postUrlError = action.payload?.message || '';
            })
    }
});

export const {
    resetPostUrlState,
    resetDownloadStatus
} = instagramSlice.actions;

export default instagramSlice.reducer;
